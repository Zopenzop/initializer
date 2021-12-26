const fs = require('fs')
let count = 0;

module.exports = async (client, Discord) => {
  const command_files = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
  for(const file of command_files){
    count++;
    const command = require(`../../commands/${file}`);
    if(command.name && command.description){
      const data = {
			  name: command.name,
			  description: command.description,
		  };
      client.commands.set(command.name, command)
    } else {
      continue;
    }
  }
  console.log(`${count} commands loaded!`)

  client.on('messageCreate', async message => {
    if (message.author.bot) {
		  return;
	  }
    const prefixes = await findPrefixes(message.guildId);
		const prefix = prefixes.find((x) => message.content.startsWith(x.prefix));
  })
}