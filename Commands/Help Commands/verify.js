const discord = require('discord.js');
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Shababad:actx3819@cluster0.v4hao.mongodb.net/790504650909417482");
const {Client:BSClient} = require('brawlstars');
const { default: millify } = require('millify');
const client2 = new BSClient("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjUyZGEzMTg2LWE4M2MtNDMyMi05ODIyLTc5MjkyNmFlOTk4OCIsImlhdCI6MTYxMDQ0OTIyMywic3ViIjoiZGV2ZWxvcGVyL2VjZjRkOThlLTgyOTMtZTQ1Yi1lOTAzLTJjZjk4NzI1ODNmZiIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiODcuMTc3Ljc5LjkyIl0sInR5cGUiOiJjbGllbnQifV19.4ywl2BUAjFdMVPQQ5JiMa_8KsZ4GKyZrlQEtdB3XxA4sfAk3sxik24oSxLiYtR5hW6bd0Eeax8ed0kQU8UjlKQ", { 
    cache: true, // default is true
    cacheOptions: undefined // options for node-cache, default is undefined.
});

module.exports = {
    name: "verify",
    description: "verify",
    category: "CATEGORY",
    usage: "",
    run: async (client, message, args) => {
        const vchannel = await db.get(`${message.guild.id}.vchannel`)
        const role1 = await db.get(`${message.guild.id}.vrole1`)
        const role2 = await db.get(`${message.guild.id}.vrole2`)
        const PTag = await db.get(`${message.author.id}.tag`)
        const vname = await db.get(`${message.guild.id}.vname`)

        if (!args[0]) {
            if (vchannel == null) {
                return;
            }
            else {
                if(message.channel.id !== vchannel) {
                    message.channel.send(`This is not a proper channel to verify, Please go to <#${vchannel}>`)
                }
                else {
                    if (vchannel !== null&&role1 !== null&&role2 !== null) {
                        if (!message.member.roles.cache.has(role1)) {
                            const send = await message.channel.send('You are already verified!')
                            if (message.member.roles.cache.has(role2)) {
                                return;
                            } else {
                                message.member.roles.add(role2)
                            }
                        }
                        else {
                            if (PTag !== null) {
                                const Player = client2.getPlayer(PTag.toUpperCase()).catch(err => {
                                    const filter = m => m.author == message.author;
                                    const collector = message.channel.createMessageCollector(filter);

                                    collector.on('collect', async m => {
                                        const Player = client2.getPlayer(args[0].toUpperCase()).catch(err => message.channel.send('Player not found'))
                                        collector.stop()
                                        message.channel.send(`Saved you as '**${(await Player).name}**'`).then(collector.stop()).then(db.set(`${message.author.id}.tag`, args[0].toUpperCase()))
                                        message.member.roles.remove(role1).then(message.member.roles.add(role2))
                                    })
                                })
                                message.channel.send(`Verified you as '**${(await Player).name}**'`);
                                message.member.roles.remove(role1).then(message.member.roles.add(role2));
                            } else {
                                message.channel.send('**What is your Brawl Stars tag?**\nExample: #8P8R8QOLP\nType `cancel` to cancel the verification')
                                const filter = m => m.author == message.author;
                                const collector = message.channel.createMessageCollector(filter);

                                collector.on('collect', async m => {
                                    if (m.content == "cancel") {
                                        collector.stop()
                                        message.channel.send('Action canceled! No verify role you you :eyes:')

                                    } else {
                                        const Player = client2.getPlayer(m.content.toUpperCase()).catch(err => message.channel.send('Player not found, please try again'))
                                        collector.stop()
                                        message.channel.send(`Saved you as '**${(await Player).name}**'`).then(db.set(`${message.author.id}.tag`, m.content.toUpperCase()));
                                        message.member.roles.remove(role1).then(message.member.roles.add(role2));
                                        if (vname !== null) {
                                            const trophies = millify((await Player).trophies, {precision: 1})
                                            const vnameX = vname.replace(/{bs.name}/gi, (await Player).name).replace(/{bs.trophies}/gi, trophies).replace(/{bs.club}/gi, (await Player).club.name).replace(/{bs.tag}/gi, m.content).replace(/{user}/gi, message.author.username).replace(/{user.tag}/gi, message.author.tag).replace(/{user.discriminator}/gi, message.author.discriminator)
                                            message.member.setNickname(vnameX)
                                        } else {
                                            return;
                                        }

                                    }
                                })
                            }
                        }
                    }
                }
            }
        } else if (args[0]) {
            if (!message.member.hasPermission('MANAGE_GUILD')) {
                return;
            } else {
                if (args[0] == 'disable') {
                    db.set(`${message.guild.id}.vchannel`, null)
                    db.set(`${message.guild.id}.vrole1`, null)
                    db.set(`${message.guild.id}.vrole2`, null)
                    message.channel.send('Successfully ')
                }
            }
        }
    }
}