const discord = require('discord.js')
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Shababad:actx3819@cluster0.v4hao.mongodb.net/790504650909417482");

module.exports = {
    name: ".",
    description: "DESCRIPTION",
    category: "CATEGORY",
    usage: "",
    run: async (client, message, args) => {
        const v = args[0].split('-')
        message.delete()
        message.channel.send(`
\`\`\`js
else if (b.trophies >= ${v[0]} || b.trophies <= ${v[1]}) {
    x + ${args[2]};
}
\`\`\``)
    }
}