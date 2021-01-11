const discord = require('discord.js')
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Shababad:actx3819@cluster0.v4hao.mongodb.net/790504650909417482");

module.exports = {
    name: "perms",
    description: "DESCRIPTION",
    category: "CATEGORY",
    usage: "",
    run: async (client, message, args) => {
        const Invite = message.channel.createInvite()
        .then(invite => message.channel.send(`https://discord.gg/${invite.code}`))
    }
}