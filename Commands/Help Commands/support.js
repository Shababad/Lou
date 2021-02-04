const discord = require('discord.js')
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Shababad:actx3819@cluster0.v4hao.mongodb.net/790504650909417482");

module.exports = {
    name: "support",
    description: "Get official support from the Lou Support team!",
    category: "Help ",
    usage: "support",
    example: "support",
    cooldown: 86400,
    run: async (client, message, args) => {
        if (!args[0]) {
            const HQChannel = client.channels.cache.get('797071649765589052');
                const A = new discord.MessageEmbed()
                .setTitle('Lou Support')
                .setDescription('Waking up 24 hours support team...\nPlease choose one of these options')
                .addFields(
                    {name: "🐛 `Bug report`", value: "Experienced a bug and want to report it? Report it!"},
                    {name: "💡 `Suggestion`", value: "You have a suggestion you want to suggest? Suggest it!"},
                    {name: "❔ `Question`", value: "You have a question about Lou Bot? Ask us!"},
                    {name: "🌐 `Others`", value: "Others..."}
                )
                .setFooter('Lou Support Team')
                .setTimestamp()
            const Bug = new discord.MessageEmbed()
                .setTitle('Lou Support')
                .setDescription('Please discribe the bug you\'ve experienced. You have 10 minute time! \n(Please use proper English)\nType: `cancel` to cancel the action')
            const suggestion = new discord.MessageEmbed()
                .setTitle('Lou Support')
                .setDescription('Please send your suggestion under this Embed. You have 10 minute time! \n(Please use proper English)\nType: `cancel` to cancel the action')
            const question = new discord.MessageEmbed()
                .setTitle('Lou Support')
                .setDescription('Please send your question under this Embed. You have 10 minute time! \n(Please use proper English)\nType: `cancel` to cancel the action')
            const others = new discord.MessageEmbed()
                .setTitle('Lou Support')
                .setDescription('Please send your thought under this Embed. You have 10 minute time! \n(Please use proper English)\nType: `cancel` to cancel the action')
            message.delete()
            const SendA = await message.channel.send(A)
            SendA.react('🐛').then(() => SendA.react('💡')).then(() => SendA.react('❔')).then(() => SendA.react('🌐'))

            const filter = (reaction, user) => {
            return ['🐛', '💡', '❔', '🌐'].includes(reaction.emoji.name) && user.id === message.author.id
            };

            SendA.awaitReactions(filter, { max: 1})
            .then(collected => {
                const reaction = collected.first();

                if (reaction.emoji.name === '🐛') {
                    SendA.reactions.removeAll()
                    SendA.edit(Bug);
                    const filter = (m) => m.author.id === message.author.id
                    const collector = message.channel.createMessageCollector(filter, {max: 1});

                    collector.on('collect', m => {
                        if (m.content == "cancel") {
                            const A = new discord.MessageEmbed()
                                .setTitle('Action Canceled!')
                                .setDescription('Action has been canceled')
                            message.delete()
                            message.channel.send(A).then(collector.stop())
                        }
                        else if (message.content !== "cancel"){
                            message.delete();
                            SendA.delete();
                            message.channel.send(`Your message has been sent to the Lou Support team.`)
                            const MSG = new discord.MessageEmbed()
                                .setTitle('Bug report!')
                                .setDescription(`Content: "**${m.content}**"`)
                                .addFields(
                                    {name: "Username:", value: `\`${message.author.username}\``},
                                    {name: "UserID", value: `\`${message.author.id}\``},
                                    {name: "MessageGuild", value: `\`${message.guild.name}\``}
                                )
                                .setFooter('Lou Support System')
                                .setTimestamp()
                            HQChannel.send(MSG)
                        }
                    });
                } else if (reaction.emoji.name === '💡') {
                    SendA.reactions.removeAll()
                    SendA.edit(suggestion);
                    const filter = (m) => m.author.id === message.author.id
                    const collector = message.channel.createMessageCollector(filter, {max: 1});

                    collector.on('collect', m => {
                        if (m.content == "cancel") {
                            const A = new discord.MessageEmbed()
                                .setTitle('Action Canceled!')
                                .setDescription('Action has been canceled')
                            message.delete()
                            message.channel.send(A).then(collector.stop())
                        }
                        else if (message.content !== "cancel"){
                            message.delete();
                            SendA.delete();
                            message.channel.send(`Your message has been sent to the Lou Support team.`)
                            const MSG = new discord.MessageEmbed()
                                .setTitle('Suggestion!')
                                .setDescription(`Content: "**${m.content}**"`)
                                .addFields(
                                    {name: "Username:", value: `\`${message.author.username}\``},
                                    {name: "UserID", value: `\`${message.author.id}\``},
                                    {name: "MessageGuild", value: `\`${message.guild.name}\``}
                                )
                                .setFooter('Lou Support System')
                                .setTimestamp()
                            HQChannel.send(MSG)
                        }
                    });
                } else if (reaction.emoji.name === '❔') {
                    SendA.reactions.removeAll()
                    SendA.edit(question);
                    const filter = (m) => m.author.id === message.author.id
                    const collector = message.channel.createMessageCollector(filter, {max: 1});

                    collector.on('collect', m => {
                        if (m.content == "cancel") {
                            const A = new discord.MessageEmbed()
                                .setTitle('Action Canceled!')
                                .setDescription('Action has been canceled')
                            message.delete()
                            message.channel.send(A).then(collector.stop())
                        }
                        else if (message.content !== "cancel"){
                            message.delete();
                            SendA.delete();
                            message.channel.send(`Your message has been sent to the Lou Support team.`)
                            const MSG = new discord.MessageEmbed()
                                .setTitle('Question!')
                                .setDescription(`Content: "**${m.content}**"`)
                                .addFields(
                                    {name: "Username:", value: `\`${message.author.username}\``},
                                    {name: "UserID", value: `\`${message.author.id}\``},
                                    {name: "MessageGuild", value: `\`${message.guild.name}\``}
                                )
                                .setFooter('Lou Support System')
                                .setTimestamp()
                            HQChannel.send(MSG)
                        }
                    });
                } else if (reaction.emoji.name === '🌐') {
                    SendA.reactions.removeAll()
                    SendA.edit(others);
                    const filter = (m) => m.author.id === message.author.id
                    const collector = message.channel.createMessageCollector(filter, {max: 1});

                    collector.on('collect', m => {
                        if (m.content == "cancel") {
                            const A = new discord.MessageEmbed()
                                .setTitle('Action Canceled!')
                                .setDescription('Action has been canceled')
                            message.delete()
                            message.channel.send(A).then(collector.stop())
                        }
                        else if (message.content !== "cancel"){
                            message.delete();
                            SendA.delete();
                            message.channel.send(`Your message has been sent to the Lou Support team.`)
                            const MSG = new discord.MessageEmbed()
                                .setTitle('Others?')
                                .setDescription(`Content: "**${m.content}**"`)
                                .addFields(
                                    {name: "Username:", value: `\`${message.author.username}\``},
                                    {name: "UserID", value: `\`${message.author.id}\``},
                                    {name: "MessageGuild", value: `\`${message.guild.name}\``}
                                )
                                .setFooter('Lou Support System')
                                .setTimestamp()
                            HQChannel.send(MSG)
                        }
                    });
                }
            })
        }
    }
}