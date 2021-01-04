const discord = require('discord.js')
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Shababad:actx3819@cluster0.v4hao.mongodb.net/790504650909417482");

module.exports = {
    name: "help",
    description: "get some ice cream from lou",
    category: "Help Commands",
    usage: "!help / !help <Command>",
    run: async (client, message, args) => {
        if (!args[0]) {
            
        }
    }
}