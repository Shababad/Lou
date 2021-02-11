const discord = require('discord.js');
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Shababad:actx3819@cluster0.v4hao.mongodb.net/790504650909417482");
const {Client:BSClient} = require('brawlstars');
const { default: millify } = require('millify');
const client2 = new BSClient("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjUyZGEzMTg2LWE4M2MtNDMyMi05ODIyLTc5MjkyNmFlOTk4OCIsImlhdCI6MTYxMDQ0OTIyMywic3ViIjoiZGV2ZWxvcGVyL2VjZjRkOThlLTgyOTMtZTQ1Yi1lOTAzLTJjZjk4NzI1ODNmZiIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiODcuMTc3Ljc5LjkyIl0sInR5cGUiOiJjbGllbnQifV19.4ywl2BUAjFdMVPQQ5JiMa_8KsZ4GKyZrlQEtdB3XxA4sfAk3sxik24oSxLiYtR5hW6bd0Eeax8ed0kQU8UjlKQ", { 
    cache: true, // default is true
    cacheOptions: undefined // options for node-cache, default is undefined.
});
const data = require('quick.db');

module.exports = {
    name: "verify",
    description: "verify",
    category: "CATEGORY",
    usage: "",
    run: async (client, message, args, p) => {
        const vchannel = await db.get(`${message.guild.id}.vchannel`);
        const role1 = await db.get(`${message.guild.id}.vrole1`);
        const role2 = await db.get(`${message.guild.id}.vrole2`);
        const PTag = await db.get(`${message.author.id}.tag`);
        const vname = await db.get(`${message.guild.id}.vname`);
        const filter = m => m.author == message.author;
        if (args[0] == 'setup') {
    
            message.channel.send(`**Hello ${message.author.user.username}, I am going to start off with some questions.**\nType \`cancel\` to cancel the action and skip to skip your current question`)
            async function f2() {

            }
            async function f1() {
                const A = new discord.MessageEmbed()
                    .setTitle('**1. Which channel do you want to set as the verify channel?**')
                    .setDescription('Answer with a channel to set the mentioned channel as the verify channel,\n\`none\` to set the verify channel as **any**\nExample\`\`\`#verify-here\`\`\`\n*Enabling a verify channel will only allow users to verify in that channel*')
                setTimeout(() => {message.channel.send(A)}, 2000);
                const collector = message.channel.createMessageCollector(filter);
                collector.on('collect', m => {
                    if (m.content == 'cancel') {
                        collector.stop()
                        return;
                    } else if (m.content == 'skip') {
                        collector.stop()
                        f1()
                    } else if (m.content == "none") {
                        data.set(`${message.guild.id}.vchannel`, 'any')
                        collector.stop()
                        f1()
                    } else if (m.mentions.channels.first) {
                        data.set(`${message.guild.id}.vchannel`, m.mentions.channels.first().id)
                        collector.stop()
                        f1()
                    } else {
                        message.channel.send(`${m.content} is not valid, please try again`)
                    }
                })
            }
            async function f() {
                if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You don\'t have the required to use this command!');
                
            }
            f()
        }
    }
}