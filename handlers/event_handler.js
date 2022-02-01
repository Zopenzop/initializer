const fs = require('fs');
const path = require("path");
let count = 0;

module.exports = (client, Discord) => {
  const load_dir = (dirs) => {
    const event_files = fs.readdirSync(path.resolve(`./events/${dirs}`)).filter(file => file.endsWith('.js'));
    for(const file of event_files){
      count++;
      const event = require(path.resolve(`./events/${dirs}/${file}`));
      const event_name = file.split('.')[0];
      //client.events.set(event_name, event);
      //client.on(event_name, event.bind(null, Discord, client, message, reaction, user))
      client.on(event_name, (...args) => event(client, ...args));
    }
  }

  ['client', 'guild'].forEach(e => load_dir(e));  
  console.log(`⇀ Events: ${count}`)
}
