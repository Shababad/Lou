const discord = require('discord.js')
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Shababad:actx3819@cluster0.v4hao.mongodb.net/790504650909417482");

module.exports = {
    name: "settings",
    description: "See the settings of a server",
    category: "Help Command",
    usage: "!settings",
    run: async (client, message, args) => {
        // Database Promises
        let prefix = await db.get(`${message.guild.id}.prefix`)
        let joinchannels = await db.get(`${message.guild.id}.joinchannel`)

        // If Statements
        let joinchannel;
        if (joinchannels == null) {
            joinchannel = "Disabled"
        } else if (joinchannels !== null) {
            joinchannel = joinchannels
        }

        const A = new discord.MessageEmbed()
            .setTitle(`Settings in ${message.guild.name}`)
            .setThumbnail(message.guild.iconURL())
            .addFields(
                {name: "Prefix", value: `\`${prefix}\``},
                {name: "Join Channel", value: `<#${joinchannel}>`}
            )
        const SendA = await message.channel.send(A)
    }
}