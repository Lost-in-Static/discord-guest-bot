const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("voice")
    .setDescription("Shows members in Voice Channels"),
  execute: async (interaction) => {
    const voiceChannels = interaction.guild.channels.cache
      .filter((channel) => channel.isVoice() && channel.members.size > 0)
      .map((channel) => ({
        name: channel.name,
        members: channel.members.map((member) => member.displayName).join(", "),
      }));

    await interaction.reply(
      voiceChannels
        .map(
          (channel) => `Members: ${channel.members}\nChannel: ${channel.name}`
        )
        .join("\n\n")
    );
  },
};
