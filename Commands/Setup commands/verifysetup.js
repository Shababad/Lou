const discord = require('discord.js')
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Shababad:actx3819@cluster0.v4hao.mongodb.net/790504650909417482");

module.exports = {
    name: "verifysetup",
    description: "DESCRIPTION",
    category: "CATEGORY",
    usage: "",
    run: async (client, message, args) => {
        const vchannel = await db.get(`${message.guild.id}.vchannel`)
        let p;let prefixes=await db.get(`${message.guild.id}.prefix`);if(prefixes==null){p='!';}else{p=prefixes;}
        if (!message.member.hasPermission('MANAGE_CHANNELS')){
            message.channel.send('You do not have the required permission to use this command!')
        }
        else {
            message.channel.send('**Which channel do you want the members to verify in?**\nType `cancel` to cancel this action!')
            const filter = m => m.author == message.author;
            const collector = message.channel.createMessageCollector(filter);
            
            collector.on('collect', m => {
                if (m.mentions.channels.first()) {
                    collector.stop()
                    message.channel.send(`**What role do you want to set as the unverified role, members get when they are unverified?**\nType \`cancel\` to cancel this action!`)
                    const collector1 = message.channel.createMessageCollector(filter);
            
                    collector1.on('collect', msg => {
                        if (msg.mentions.roles.first()) {
                            collector1.stop()
                            message.channel.send(`**What role do you want to give the members after they are verified?**\nType \`cancel\` to cancel this action!`)
                                const collector2 = message.channel.createMessageCollector(filter);
            
                                collector2.on('collect', mes => {
                                    if (mes.mentions.roles.first()) {
                                        collector2.stop()
                                        message.channel.send(`**What Nickname do you want to give the user after verifying?**\nType \`cancel\` to cancel this action,\n\`docs\` to see the docs,\nand\`none\` if you don't want to count this as a requirement!`)
                                        const collector3 = message.channel.createMessageCollector(filter);
            
                                        collector3.on('collect', async mess => {
                                            if (mess.content == 'cancel') {
                                                message.channel.send('Action has been sucessfully canceled!')
                                                collector3.stop()
                                            } else if (mess.content == 'docs'){
                                                const A = new discord.MessageEmbed()
                                                    .setTitle('Documentation')
                                                    .setDescription(`Here are some template strings you can use to make the username looks better!\nUsage/Username:\`\`\`{bs.name} | {bs.trohpies}\`\`\`\nResult:\n**Shababad | 24k**`)
                                                    .addFields(
                                                        {name: '`{user}`', value: 'User\'s Discord username, Ex: **Shababad**'},
                                                        {name: '`{user.tag}`', value: 'User\'s Discord username + Tag, Ex: **Shababad#6751**'},
                                                        {name: '`{user.discriminator}`', value: 'User\'s Discord discriminator, Ex: **6751**'},
                                                        {name: '`{bs.name}`', value: 'User\'s Brawl Stars username, Ex: **Shababad**'},
                                                        {name: '`{bs.trophies}`', value: 'User\'s Brawl Stars trophies count, Ex: **23k** or **500**'},
                                                        {name: '`{bs.club}`', value: 'User\'s Brawl Stars club name, Ex: **CODEMAGIC**'},
                                                        {name: '`{bs.tag}`', value: 'User\'s Brawl Stars player-tag'}
                                                    )
                                                message.channel.send(A)
                                            } else if (mess.content == 'none') {
                                                message.channel.send(`Success!\nVerification Channel: <#${m.mentions.channels.first().id}>\nUnverfied Role: <@&${msg.mentions.roles.first().id}>\nVerified Role: <@&${mes.mentions.roles.first().id}>\nVerified Username: None`)
                                                collector3.stop();
                                                await db.set(`${message.guild.id}.vchannel`, m.mentions.channels.first().id);
                                                await db.set(`${message.guild.id}.vrole1`, msg.mentions.roles.first().id);
                                                await db.set(`${message.guild.id}.vrole2`, mes.mentions.roles.first().id);
                                                await db.set(`${message.guild.id}.vname`, null)
                                            } else {
                                                message.channel.send(`Success!\nVerification Channel: <#${m.mentions.channels.first().id}>\nUnverfied Role: <@&${msg.mentions.roles.first().id}>\nVerified Role: <@&${mes.mentions.roles.first().id}>\nVerified Username: **${mess.content}**`)
                                                collector3.stop();
                                                await db.set(`${message.guild.id}.vchannel`, m.mentions.channels.first().id);
                                                await db.set(`${message.guild.id}.vrole1`, msg.mentions.roles.first().id);
                                                await db.set(`${message.guild.id}.vrole2`, mes.mentions.roles.first().id);
                                                await db.set(`${message.guild.id}.vname`, mess.content)
                                            }
                                            
                                        });
                                    } else if (mes.content == 'cancel') {
                                        message.channel.send('Action has been sucessfully canceled!')
                                        collector2.stop()
                                    } else {
                                        message.channel.send(`\`${mes.content}\` is not a role. Please try again.`)
                                    }
                                    
                                });
                        } else if (msg.content == 'cancel') {
                            message.channel.send('Action has been sucessfully canceled!')
                            collector1.stop()
                        } else {
                            message.channel.send(`\`${msg.content}\` is not a role. Please try again.`)
                        }
                        
                    });
                } else if (m.content == 'cancel') {
                    message.channel.send('Action has been sucessfully canceled!')
                    collector.stop()
                } else {
                    message.channel.send(`\`${m.content}\` is not a channel. Please try again.`)
                }
            });
        /*
            const filter = m => {
                m.author == message.author
            };
            message.channel.send('Please mention a channel you want to set as a channel.\ntype `cancel` to cancel this action').then(() => {
                message.channel.awaitMessages(filter, { max: 1, errors: ['time'] })
                    .then(collected => {
                        if (collected == )
                        message.channel.send(`Verify channel has been set to <#${message.mentions.channels.first().id}>\nPlease give a username you want the member to have after verifying.\nExample:\`\`\`{bs.name} | {bs.trophies}\`\`\`Result:\`\`\`King Lou | 20k\`\`\`\nSome guide:\n\`{bs.name}\` - Brawl Stars username\n\`{bs.trophies}\` - Brawl Stars trophies amount\n\`{bs.club}\` - Brawl Stars club name\n\`{user}\` - Discord username\n\`{user.discriminator}\``)
                    })

                message.channel.awaitMessages('cancel', { max: 1, errors: ['time'] })
                    .then(collected => {
                        message.channel.send(`Action has been canceled!`)
                    })
            });*/
        }
    }
}