const discord = require('discord.js')
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Shababad:actx3819@cluster0.v4hao.mongodb.net/790504650909417482");
const chalk = require('chalk')
const data = require('quick.db')

module.exports = {
    name: "setup",
    description: "DESCRIPTION",
    category: "CATEGORY",
    usage: "",
    example: "",
    run: async (client, message, args, p) => {
        const filter = m => m.author == message.author;
        if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('You do not have the required permission to use this command!');
        // FUNCTIONS //
        async function c4() {
            message.channel.send('under construction')
        }
        async function c3() {
            const Embed = new discord.MessageEmbed()
                .setTitle('**4. Do you want this server to have a Leave channel?**')
                .setDescription('Answer with \`yes\` if yes and \`no\` if no.\n*Bot will send an good bye message (customize with command \`leavemessage\`) when a user leaves if the leave messages is on to the leave channel*')
            message.channel.send(Embed)
            const collector = message.channel.createMessageCollector(filter);
            collector.on('collect', m => {
                if (m.content == 'cancel') {
                    collector.stop();
                    return;
                } else if (m.content == 'skip') {
                    collector.stop();
                    c4();
                } else if (m.content == 'no') {
                    collector.stop()
                    c4();
                } else if (m.content.includes('yes')) {
                    message.channel.send('Mention a channel you want to set as the leave channel please.')
                    const collector2 = message.channel.createMessageCollector(filter);
                    collector2.on('collect', msg => {
                        
                        if (msg.mentions.channels.first()) {
                            data.set(`${message.guild.id}.leavechannel`, msg.mentions.channels.first().id)
                            collector2.stop()
                            collector.stop()
                            c4()
                        } else {
                            message.channel.send(`**${msg.content}** is not a valid channel or isn't in this guild, please try again!`)
                        }
                    })
                }
            })
        }
        async function c2() {
            const Embed = new discord.MessageEmbed()
                .setTitle('**3. Do you want this server to have a Join channel?**')
                .setDescription('Answer with \`yes\` if yes and \`no\` if no.\n*Bot will send an welcome message (customize with command \`joinmessage\`) when a user joins if the join messages is on to the join channel*')
            message.channel.send(Embed)
            const collector = message.channel.createMessageCollector(filter);
            collector.on('collect', m => {
                if (m.content == 'cancel') {
                    collector.stop();
                    return;
                } else if (m.content == 'skip') {
                    collector.stop();
                    c3();
                } else if (m.content == 'no') {
                    collector.stop()
                    c3();
                } else if (m.content.includes('yes')) {
                    message.channel.send('Mention a channel you want to set as the join channel please.')
                    const collector2 = message.channel.createMessageCollector(filter);
                    collector2.on('collect', msg => {
                        
                        if (msg.mentions.channels.first()) {
                            data.set(`${message.guild.id}.joinchannel`, msg.mentions.channels.first().id)
                            collector2.stop()
                            collector.stop()
                            c3()
                        } else {
                            message.channel.send(`**${msg.content}** is not a valid channel or isn't in this guild, please try again!`)
                        }
                    })
                }
            })
        }
        async function c1() {
            const Embed = new discord.MessageEmbed()
                .setTitle('**2. Do you want this server to have a Bot-Commands-Only channel?**')
                .setDescription('If no, please send a \`no\` under this message, else mention a channel, example:\`\`\`yes #bot-commands\`\`\`\n*This will allow the bot to not reply to commands out of the commands only channel, only users with administartors permission can. (can be changed later with the command \`botchannel\`)*')
            message.channel.send(Embed)
            const collector = message.channel.createMessageCollector(filter);
            collector.on('collect', m => {
                if (m.content == 'cancel') {
                    collector.stop();
                    return;
                } else if (m.content == 'skip') {
                    collector.stop();
                    c2();
                } else if (m.content == 'no') {
                    collector.stop()
                    c2();
                } else if (m.content.includes('yes')){
                    if (!m.mentions.channels.first()) {
                        message.channel.send('With channel do you want to set as the Bot-Commands-Only channel?')
                        const collector2 = message.channel.createMessageCollector(filter);
                        collector2.on('collect', msg => {
                            if (msg.mentions.channels.first()) {
                                data.set(`${message.guild.id}.bochannelid`, msg.mentions.channels.first().id)
                                collector2.stop()
                                collector.stop()
                                c2()
                            } else {
                                message.channel.send(`**${msg.content}** is not a valid channel or isn't in this guild, please try again!`)
                            }
                        })
                    } else {
                        collector.stop()
                        c2()
                        data.set(`${message.guild.id}.bochannelid`, m.mentions.channels.first().id)
                    }
                }
            })
        }

        async function c() {
            message.channel.send(`**Hello ${message.author.username}, I will start off with some questions.**\n(You can type \`cancel\` to cancel the action or \`skip\` to skip your current question!)`)
            const Embed = new discord.MessageEmbed()
                .setTitle(`**1. What prefix do you want to set for this server?**\n`)
                .setDescription(`If you want to set the prefix as default (!), type \`default\`, else think of a good prefix for me, example:\`\`\`?\`\`\`\n*A prefix is something that you attach before every command. (You can always change it with the command \`prefix\`)*`)
            setTimeout(() => {message.channel.send(Embed)}, 2000)

            const collector = message.channel.createMessageCollector(filter); // prefix

            collector.on('collect', async m => {
                if (m.content == 'cancel') {
                    collector.stop();
                    return;
                } else if (m.content == 'skip') {
                    collector.stop();
                    c1();
                } else if (m.content == 'default') {
                    collector.stop();
                    c1();
                } else {
                    if (m.content.length >= 5) {
                        const SendErrorMessage = await message.channel.send('Max prefix length is 5 characters, please try again!');
                        setTimeout(() => {SendErrorMessage.delete()}, 5000)
                    } else {
                        collector.stop();
                        data.set(`${message.guild.id}.prefix`, m.content)
                        c1();
                    }
                }
            })
        }
        c()
    }
}