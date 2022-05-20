const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('findfriends')
        .setDescription('Shows members in all mutual Voice Channels'),
    execute: async (interaction) => {
        const guilds = interaction.client.guilds.cache

        const mutualGuilds = (
            await Promise.all(
                guilds.map(async (guild) => {
                    try {
                        await guild.members.fetch(interaction.user.id)

                        const voiceChannels = guild.channels.cache.filter(
                            (channel) =>
                                channel.isVoice() && channel.members.size > 0
                        )

                        return {
                            name: guild.name,
                            voiceChannels,
                        }
                    } catch (e) { }
                })
            )
        ).filter((guild) => guild !== undefined && guild.voiceChannels.size > 0)

        const reply = mutualGuilds
            .map((guild) => {
                const channelsMessage = guild.voiceChannels
                    .map((channel) => {
                        const membersMessage = channel.members
                            .toJSON()
                            .map((member) => ` - ${member}`)
                            .join('\n')

                        return `${channel}\n${membersMessage}\n`
                    })
                    .join('\n')

                return `Guild: ${guild.name}\n${channelsMessage}`
            })
            .join('\n')

        await interaction.reply(reply)
    },
}
