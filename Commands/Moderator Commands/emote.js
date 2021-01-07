const discord = require('discord.js')
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Shababad:actx3819@cluster0.v4hao.mongodb.net/790504650909417482");

module.exports = {
    name: "emote",
    description: "DESCRIPTION",
    category: "CATEGORY",
    usage: "",
    run: async (client, message, args) => {
        if (args[0] == "var") {
            message.guild.emojis.cache.forEach(emoji => {
                const emoname = emoji.name.toLowerCase()
                message.channel.send(`\`\`\`let ${emoname} = '<:${emoji.name}:${emoji.id}>'\`\`\``)
            })
        }
        else if (args[0] == "cache" || "client") {
            message.guild.emojis.cache.forEach(emoji => {
                const emoname = emoji.name.toLowerCase()
                message.channel.send(`\`\`\`let ${emoname} = client.emojis.cahce.get('${emoji.id}')\`\`\``)
            })
        }
    }
}