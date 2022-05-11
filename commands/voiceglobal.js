const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('voiceglobal')
        .setDescription('Shows members in all mutual Voice Channels'),
    execute: async (interaction) => {
        const guilds = interaction.client.guilds.cache

        const mutualServers = (
            await Promise.all(
                guilds.map(async (guild) => {
                    try {
                        await guild.members.fetch(interaction.user.id)

                        return guild
                    } catch (e) {}
                })
            )
        ).filter((guild) => guild !== undefined)

        console.log(mutualServers)

        await interaction.reply(
            mutualServers.map((guild) => guild.name).join(', ')
        )
    },
}
