const discord = require('discord.js')
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Shababad:actx3819@cluster0.v4hao.mongodb.net/790504650909417482");

module.exports = {
    name: "purge",
    description: "DESCRIPTION",
    category: "CATEGORY",
    usage: "",
    run: async (client, message, args) => {
        if (!args[0]) {
            message.channel.send("please give an amount of message you want to delete")
        } else {
            message.delete();
            message.channel.bulkDelete(args[0]).then(
                message.channel.send(`Deleted ${args[0]} messages`)
            )
        }
    }
}