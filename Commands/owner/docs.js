const discord = require('discord.js')
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Shababad:actx3819@cluster0.v4hao.mongodb.net/790504650909417482");
const { search } = require('djsdocs-generator')

module.exports = {
    name: "docs",
    description: "DESCRIPTION",
    category: "CATEGORY",
    usage: "",
    example: "",
    run: async (client, message, args, p) => {
        if (message.author.id !== "718870868025147515") return message.channel.send('You are not the owner of the bot!').then(msg => setTimeout(() => {msg.delete()}, 5000));
        let x = args.slice(0).join(" ")
        const body = await search(undefined, x)
        message.channel.send({ embed: body });
    }
}