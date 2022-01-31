var downtime_channel='848581466110689398';
var id = "";

module.exports = async (module_name, token, mongo_path) => {
  const axios = require('axios');
  const express = require('express');
  const app = express();
  const port = 3000;

  app.get('/', (req, res) => {
    res.send(`Brianna ${module_name} Module - https://Brianna-Module-${module_name.charAt(0)}.abstrusethereal.repl.co/`)
  });
  app.listen(port, () => {
    console.log(`⇀ URL: Listening!`)
    //console.log(`⇀ URL: https://Brianna-Module-${module_name.charAt(0)}.abstrusethereal.repl.co/`)
    //console.log(` - http://localhost:${port}`)
  });

  /*axios.post('https://api.uptimerobot.com/v2/getMonitors', {
    "api_key" : process.env['UpTimeRobot_Key'],
    "search" : `https://Brianna-Module-${module_name.charAt(0)}.abstrusethereal.repl.co/`,
  }).then((response) => {
    if(response.data.monitors!=null && response.data.monitors.length == 0) {
      axios.post('https://api.uptimerobot.com/v2/newMonitor', {
        "api_key" : process.env['UpTimeRobot_Key'],
        "type" : '1',
        "url" : `https://Brianna-Module-${module_name.charAt(0)}.abstrusethereal.repl.co/`,
        "friendly_name" : `Brianna-Module ${module_name}`
      })
    }
    console.log('⇀ UpTimeRobot: Running')
    //console.log(response.data.monitors);
  }, (error) => {
    console.log(error);
  });*/

  const Discord = require('discord.js')
  const { Intents } = require('discord.js')
  const client = new Discord.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MEMBERS],
	  partials: ['MESSAGE', , 'GUILD_MEMBER', 'CHANNEL', 'REACTION', 'USER'],
  });
const Canvas = require('canvas')
const {
	registerFont
} = require('canvas');
registerFont('./fonts/Roboto-Regular.ttf', {
	family: 'Roboto'
});
registerFont('./fonts/Roboto-Medium.ttf', {
	family: 'Roboto-Medium'
});
registerFont('./fonts/Roboto-Bold.ttf', {
	family: 'Roboto-Bold'
});
  client.functions = require('./functions.js');
  const { loading } = require('./functions.js')
  const mongo = require('./mongo.js')
  client.commands = new Discord.Collection();
  client.slashCommands = new Discord.Collection();
  client.events = new Discord.Collection();
  console.log(`〚 ${module_name} Module 〛`);

  ['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
  })

  client.on('ready', async () => {
    client.loading = loading(client);
    await mongo(mongo_path);
    console.log('🍃 Ready and up!')
    const schemas = require('./resources.js')
    client.schemas = schemas;
    client.schemas = client.schemas.schemas;
  })
  
  /*client
    .on("debug", console.log)
    .on("warn", console.log)*/
  client.login(token);
}
