# **Personal initializer module**

## 1. Installation

Make an npmrc file, then use the code below:

`require('@zopenzop/initializer')('<module-name>', token, mongo_uri);`

## 2. Usage Info

- Schemas: (declared under `client.schemas`)

  - Bot Schema
    
    > Usage - `client.schemas.bot`
    > 
    > Fields -
    > 1. `defaultPrefix` (*Default bot prefix*)
    > 2. `devs` (*User IDs of devs*)
  
  - Command Schema
    
    > Usage - `client.schemas.command`
    > 
    > Fields -
    > 1. `guildId` (*Guild ID of document*)
    > 2. `command` (*Name of command*)
    > 2. `disabled` (*True or False*) 
    > 2. `roles` (*Array of role IDs whitelisted for this command*)
    > 2. `channels` (*Array of channel IDs whitelisted for this command*)

  - Server settings Schema
    
    > Usage - `client.schemas.server_settings`
    > 
    > Fields -
    > 1. `guildId` (*Guild ID of document*)
    > 2. `premium` (*True or False*)
    > 3. `staff`
    > 
    >   - `role` (*Role ID*)
    >   - `channel` (*Channel ID*)
    >   
    > 4. `suggestionChannel` (*Suggestion channel ID*)
    > 5. `reportChannel` (*Report Channel ID*)

- Functions: (declared under `client.functions`)

1. `findPrefixes(guildId) //Fetches prefixes for given guild ID from the database`
2. `cmdInfo(guildId, commandName) //Fetches prefixes for given guild ID from the database`
3. `sendEmbed(message, title, description) //Sends an embed to message.channel`
4. `sendSlashEmbed(interaction, title, description, true) //Sends an embed to interaction.channel`
5. `isInteger(value) //Checks if given value is an integer`
6. `isNumeric(value) //Checks if given value is numeric`
7. `isImgLink(URL) //Checks if given URL points to an image`
8. `isHexColor(value) //Checks if given value is a Hexadecimal Color Code`

- Fonts: (can be directly used in Canvas)

1. Roboto
2. Roboto-Medium
3. Roboto-Bold
