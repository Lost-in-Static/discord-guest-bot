const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ping-Pong Ding-Dong!'),
    execute: async (interaction) => {
        await interaction.reply('Pong!')
    },
}
