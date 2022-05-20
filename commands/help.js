const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Display all commands from BOT'),
    execute: async (interaction) => {
        await interaction.reply(`The BOT has the following commands: 

/HELP (Guild / Whisper) --- Self-Explainatory

/PING (Guild / Whisper) --- Returns your Ping. Use it to confirm that the BOT is properly configured.

/SERVER (Guild) --- Displays the current Guild name & Total Members.

/VOICE (Guild) --- LEGACY COMMAND --- Displays all Voice channels that contain users and the users connected to them on the Guild the slash-command is ran.

/VOICEGLOBAL (Whisper) --- Displays all Voice Channels that contain users and the users connected accross all Guilds you and this BOT share.
`)
    }
}