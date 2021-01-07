const discord = require('discord.js')
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Shababad:actx3819@cluster0.v4hao.mongodb.net/790504650909417482");

module.exports = {
    name: "leavechannel",
    description: "Set a Leave-Channel for a server",
    category: "Setup Commands",
    usage: "!leavechannel set <#channel>",
    run: async (client, message, args) => {
        let p;let prefixes=await db.get(`${message.guild.id}.prefix`);if(prefixes==null){p='!';}else{p=prefixes;}
        if (!message.member.hasPermission('MANAGE_CHANNELS')) {
            const A = new discord.MessageEmbed()
                .setTitle('400 Bad Request')
                .setDescription('You don\'t have the required permission to use this command')
                message.delete()
            const SendA = await message.channel.send(A)
            .then(setTimeout(() => { SendA.delete() }, 10000))
        }
        else {
        
            const leaveChannel = await db.get(`${message.guild.id}.leavechannel`)
            if (!args[0]) {
                if (leaveChannel == null) {
                    var chx = message.guild.channels.cache.filter(chx => chx.type === "text").find(x => x.position === 0);
                    const A = new discord.MessageEmbed()
                        .setTitle('404 Not Found')
                        .setDescription(`There are no leave channel found in ${message.guild.name}.\nTo set a leave channel for this server, use the following command:\`\`\`!leavechannel set <#channel>\`\`\`\nExample: **${p}leavechannel set ${chx}**`)
                    const SendA = await message.channel.send(A)
                    message.delete()
                    .then(setTimeout(() => { SendA.delete() }, 10000))
                }
                else {
                    const A = new discord.MessageEmbed()
                        .setTitle('leave Channel')
                        .setDescription(`The current leave channel in ${message.guild.name} is <#${leaveChannel}>\nTo change it, use this command:\`\`\`${p}leavechannel set <#channel>\`\`\`\nTo remve it, use this command:\`\`\`${p}leavechannel remove\`\`\``)
                    const SendA = await message.channel.send(A)
                    message.delete()
                    .then(setTimeout(() => { SendA.delete() }, 10000))
                }
            }
            else if (args[0] == "set") {
                if (!args[1]) {
                    const A = new discord.MessageEmbed()
                        .setTitle('411 Length Required')
                        .setDescription(`No mentioned channel\n\`\`\`${p}leavechannel set <channel>\`\`\``)
                    const SendA = await message.channel.send(A)
                    message.delete()
                    .then(setTimeout(() => { SendA.delete() }, 10000))
                }
                else if (/<#(\d{17,19})>/.test(args[1])) {
                    const A = new discord.MessageEmbed()
                        .setTitle('202 Accepted')
                        .setDescription(`The leave messages will now be sent to "<#${message.mentions.channels.first().id}>"`)
                    const SendA = await message.channel.send(A)
                    message.delete()
                    .then(setTimeout(() => { SendA.delete() }, 10000))
                    db.set(`${message.guild.id}.leavechannel`, message.mentions.channels.first().id)
                    console.log(`leaveChannel in ${message.guild.name} has been set to #${message.mentions.channels.first().name} {id: ${message.mentions.channels.first().id}}`)
                }
                else if (!/<#(\d{17,19})>/.test(args[1])) {
                    const A = new discord.MessageEmbed()
                        .setTitle('400 Bad Request')
                        .setDescription(`Please mention a channel`)
                    const SendA = await message.channel.send(A)
                    message.delete()
                    .then(setTimeout(() => { SendA.delete() }, 10000))
                }
            }
            else if (args[0] == "remove") {
                if (leaveChannel == null) {
                    var chx = message.guild.channels.cache.filter(chx => chx.type === "text").find(x => x.position === 0);
                    const A = new discord.MessageEmbed()
                        .setTitle('404 Not Found')
                        .setDescription(`There are no leave channel found in ${message.guild.name}.\nTo set a leave channel for this server, use the following command:\`\`\`!leavechannel set <#channel>\`\`\`\nExample: **${p}leavechannel set ${chx}**`)
                    const SendA = await message.channel.send(A)
                    message.delete()
                    .then(setTimeout(() => { SendA.delete() }, 10000))
                }
                else {
                    const three = new discord.MessageEmbed()
                        .setTitle('Removing leave Channel...')
                        .setDescription('The leave Channel will be deleted in 5 seconds')
                    const two = new discord.MessageEmbed()
                        .setTitle('Removing leave Channel...')
                        .setDescription('The leave Channel will be deleted in 3 seconds')
                    const one = new discord.MessageEmbed()
                        .setTitle('Removing leave Channel...')
                        .setDescription('The leave Channel will be deleted in 1 seconds')
                    const A = new discord.MessageEmbed()
                        .setTitle('202 Accepted')
                        .setDescription(`leave channel in ${message.guild.name} has been successfully deleted`)
                    message.delete()
                    const SendA = await message.channel.send(three)
                    setTimeout(() => {SendA.edit(two)}, 2000)
                    setTimeout(() => { SendA.edit(one) }, 2000)
                    setTimeout(() => { SendA.edit(A) }, 2000)
                    setTimeout(() => { SendA.delete() }, 10000)
                    db.set(`${message.guild.id}.leavechannel`, null)
                }
            }
        }
    }
}