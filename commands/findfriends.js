const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('findfriends')
        .setDescription('Shows members in all mutual Voice Channels'),
    execute: async (interaction) => {
        const guilds = interaction.client.guilds.cache
        const selfID = interaction.user.id

        const mutualGuilds = (
            await Promise.all(
                guilds.map(async (guild) => {
                    try {
                        await guild.members.fetch(selfID)

                        const voiceChannels = guild.channels.cache
                            .map((channel) => ({
                                channel,
                                members: channel.members.filter(
                                    (member) => member.user.id !== selfID
                                ),
                            }))
                            .filter(
                                ({ channel, members }) =>
                                    channel.isVoice() && members.size > 0
                            )

                        return {
                            name: guild.name,
                            voiceChannels,
                        }
                    } catch (e) {}
                })
            )
        ).filter(
            (guild) => guild !== undefined && guild.voiceChannels.length > 0
        )

        if (mutualGuilds.length === 0) {
            await interaction.reply("Nobody's home")
            return
        }

        const reply = mutualGuilds
            .map((guild) => {
                const channelsMessage = guild.voiceChannels
                    .map(({ channel, members }) => {
                        const membersMessage = members
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
