const discord = require('discord.js')
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Shababad:actx3819@cluster0.v4hao.mongodb.net/790504650909417482");

module.exports = {
    name: "help",
    description: "get some ice cream from lou",
    category: "Help Commands",
    usage: "!help / !help <Command>",
    run: async (client, message, args) => {
        let p;let prefixes=await db.get(`${message.guild.id}.prefix`);if(prefixes==null){p='!';}else{p=prefixes;}
        if (!args[0]) {
            const A = new discord.MessageEmbed()
                .setTitle('Need some help?')
                .setDescription(`Here are some easy commands **You** can use.\nIf you have some command you want, use the command \`${p}suggest\` to suggest it!`)
                .addFields(
                    {name: 'Help', value: '`help`, `support`'},
                    {name: 'Moderators', value: '`joinchannel`, `joinmessage`, `leavechannel`, `leavemessage`, `prefix`, `settings`, `verifysetup`'}
                )
                message.channel.send(A)
        }
    }
}