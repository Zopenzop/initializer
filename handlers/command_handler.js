const Discord = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");
const similar = require("string-similarity");
const marky = require("marky");
const path = require("path");
const { findPrefixes, cmdInfo } = require("../functions.js");
const devs = ["716895830673719357"];
const devserver = "810889846364307506";
const slashCommands = [];
let count = 0;

module.exports = async (client, Discord) => {
	const command_files = fs
		.readdirSync("./commands/")
		.filter((file) => file.endsWith(".js"));
	console.log(command_files);
	for (const file of command_files) {
		console.log(path.resolve(`./commands/${file}`));
		const command = require(`./commands/${file}`);
		if (command.name && command.description) {
			count++;
			if (command.slash == true) {
        let slash = {
					name: command.name,
					description: command.description,
					options: command.options,
				};
        if(command.type == '2' || command.type == '3') {
          slash = {
				  	name: command.name,
            type: command.type,
				  };
        }
				slashCommands.push(slash);
			}
			client.commands.set(command.name, command);
		} else {
			continue;
		}
	}

	console.log(`⇀ Commands: ${count}`);

	if (slashCommands.length > 0) {
		const rest = new REST({ version: "9" }).setToken(
			process.env["Discord_Token"]
		);
		(async () => {
			try {
        await rest.get(Routes.applicationGuildCommands(process.env["Discord_Client_ID"], devserver)).then(data => {
          const promises = [];
          for (const command of data) {
            slashCommands.concat(command);
            const deleteUrl = `${Routes.applicationGuildCommands(process.env["Discord_Client_ID"], devserver)}/${command.id}`;
            promises.push(rest.delete(deleteUrl));
          }
          return Promise.all(promises);
        }).then(() => {
          rest.put(Routes.applicationGuildCommands(process.env["Discord_Client_ID"], devserver), { body: slashCommands })
        })
				/*await rest.put(
					Routes.applicationGuildCommands(process.env["Discord_Client_ID"], devserver),
					{ body: slashCommands }
        );*/
				console.log(`⇀ Slash Commands: ${slashCommands.length}`);
        //console.log(slashCommands);
			} catch (error) {
				console.log(error);
			}
		})();
	}

	client.on("messageCreate", async (message) => {
		if (message.author.bot) {
			return;
		}
		const prefixes = await findPrefixes(message.guildId);
		const prefix = prefixes.find((x) => message.content.startsWith(x.prefix));
		if (prefixes.find((x) => message.content.startsWith(x.prefix))) {
			const args = message.content.slice(prefix.prefix.length).split(/ +/);
			const cmd = args.shift().toLowerCase();
			const command = client.commands.get(cmd);
			if (command) {
				message.channel.send({ embeds: [client.loading] }).then(async (msg) => {
					try {
						await processcmd(command, message, msg, args, client);
						/*let subcmd = null; //args.shift();
						if (subcmd != null) {
							subcmd = subcmd.toLowerCase();
							const subcommand = client.commands.find(
								(x) => x.name.startsWith(cmd) && x.name.endsWith(subcmd)
							);
							if (subcommand != null) {
								await processcmd(subcommand, message, msg, args, client);
							} else {
								await processcmd(command, message, msg, args, client);
							}
						} else {
							await processcmd(command, message, msg, args, client);
						}*/
					} catch (err) {
						client.functions.erry(err, message, client);
						message.channel.send({ embeds: [client.functions.error("Error")] });
						console.log(err);
					} finally {
						try
						{
							msg.delete();
						}
						catch(err){}
					}
				});
			} else {
				var match = similar
					.findBestMatch(
						cmd,
						client.commands.map((x) => x.name)
					)
					.bestMatch.target.toString();
				message.channel.send(
					`Did you mean ` + "`" + `${prefix.prefix}${match}?` + "`"
				);
			}
		}
	});

	client.on("interactionCreate", async (interaction) => {
		if (!interaction.isCommand() && !interaction.isContextMenu()) {      
			return;
		}
		const command = client.commands.get(interaction.commandName);
		if (command) {
			if (command.devOnly && !devs.includes(interaction.member.id)) {
				return;
			}
			const cmdinfo = await cmdInfo(
				interaction.guildId,
				interaction.commandName
			);
			if (cmdinfo != null) {
				if (cmdinfo.disabled == true) {
					return;
				}
				if (
					!cmdinfo.channels.length < 1 &&
					!cmdinfo.channels.includes(interaction.channelId)
				) {
					return;
				}
				if (
					!cmdinfo.roles.length < 1 &&
					!cmdinfo.roles.some((x) => interaction.member.roles.cache.get(x))
				) {
					return;
				}
			}
			await command.slashExecute(interaction, client, Discord);
		}
	});
};

async function processcmd(command, message, msg, args, client) {
	if (command.devOnly && !devs.includes(message.author.id)) {
		return;
	}
	const cmdinfo = await cmdInfo(message.guildId, message.content.split(" ")[0]);
	if (cmdinfo != null) {
		if (cmdinfo.disabled == true) {
			msg.delete();
			return;
		}
		if (
			!cmdinfo.channels.length < 1 &&
			!cmdinfo.channels.includes(message.channel.id)
		) {
			msg.delete();
			return;
		}
		if (
			!cmdinfo.roles.length < 1 &&
			!cmdinfo.roles.some((x) => message.member.roles.cache.get(x))
		) {
			msg.delete();
			return;
		}
	}
	client.functions.cmd(message, client);
	await command.execute(client, message, args, Discord);
}
