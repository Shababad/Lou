const discord = require('discord.js')
const Client = require('discord.js')
const client = new discord.Client()
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Shababad:actx3819@cluster0.v4hao.mongodb.net/790504650909417482");

module.exports = (client, guild) => {
    let channel = client.channels.cache.get('793124130220146698')
    const A = new discord.MessageEmbed()
        .setTitle('I joined a new server!')
        .setThumbnail(guild.iconURL())
        .addFields(
            {name: 'Name', value: `\`${guild.name}\``, inline: true},
            {name: 'ID', value: `\`${guild.id}\``, inline: true},
            {name: 'Region', value: `\`${guild.region}\``, inline: true},
            {name: 'Members', value: `\`${guild.memberCount}\``, inline: true},
            {name: 'Owner', value: `<@${guild.owner.id}>`, inline: true},
            {name: 'Total Guilds', value: `\`${client.guilds.cache.size}\``, inline: true},
            {name: 'CreatedAt', value: `\`${guild.createdAt}\``, inline: true}
        )
        .setTimestamp()
        .setFooter('Lou Bot Logging', 'https://static.wikia.nocookie.net/brawlstars/images/0/0b/Lou_Portrait.png/revision/latest/scale-to-width-down/340?cb=20201111223555')
    channel.send(A)
}