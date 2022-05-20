const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Display all commands from BOT'),
    execute: async (interaction) => {
        await interaction.reply(`The BOT has the following commands: 

/HELP (Guild / Whisper) --- Self-Explainatory

/PING (Guild / Whisper) --- Returns your Ping. Use it to confirm that the BOT is properly configured.

/FINDFRIENDS (Whisper) --- Displays all Voice Channels that contain users and the users connected accross all Guilds you and this BOT share.
`)
    }
}