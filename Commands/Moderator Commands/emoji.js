let bd_neutral = '<:BD_Neutral:796320769361444895>'
let blank = '<:Blank:796320769378222081>'
let speechless = '<:Speechless:796320769398538271>'
let smile = '<:Smile:796320769423704085>'
let db_happy = '<:Happy:796320769487142913>'
let grin = '<:Grin:796320769592000513>'
let thumbs_down = '<:Thumbs_Down:796320769609170966>'
let bd_phew = '<:BD_Phew:796320769684537415>'
let gg = '<:GG:796320769721368587>'
let laugh = '<:Laugh:796320769725693992>'
let happy = '<:Happy:796320769729888266>'
let angry = '<:Angry:796320769733951488>'
let bd_special = '<:BD_Special:796320769738670090>'
let bothered = '<:Bothered:796320769739063316>'
let shocked = '<:Shocked:796320769742340146>'
let bd_angry = '<:BD_Angry:796320769742733312>'
let rage = '<:Rage:796320769759510557>'
let bd_sad = '<:BD_Sad:796320769767374868>'
let frenzied = '<:Frenzied:796320769772355584>'
let ecstatic = '<:Ecstatic:796320769780482058>'
let sad = '<:Sad:796320769793458176>'
let stunned = '<:Stunned:796320769839857684>'
let annoyed = '<:Annoyed:796320769847721984>'
let bd_thanks = '<:BD_Thanks:796320769910505482>'
let thumbs_up = '<:Thumbs_Up:796320769939734548>'

const discord = require('discord.js')
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Shababad:actx3819@cluster0.v4hao.mongodb.net/790504650909417482");

module.exports = {
    name: "emoji",
    description: "Add some cool emojis to your server",
    category: "Moderator Commands",
    usage: "",
    run: async (client, message, args) => {
        let p;let prefixes=await db.get(`${message.guild.id}.prefix`);if(prefixes==null){p='!';}else{p=prefixes;}
        if (!message.member.hasPermission('MANAGE_EMOJIS')) {
            const A = new discord.MessageEmbed()
                .setTitle('400 Bad Request')
                .setDescription('You do not have the permission to use this Command!')
            message.delete()
            const SendA = await message.channel.send(A)
            .then(setTimeout(() => { SendA.delete() }, 10000))
        }
        else if (message.member.hasPermission('MANAGE_EMOJIS')) {
            if (!args[0]) {
                const A = new discord.MessageEmbed()
                    .setTitle('Lou\'s Emoji Board')
                    .setDescription(`Want to add some cool Brawl Stars emojis into this server?\nHere are some cool commands you an try!\n\nSee the emoji stock, use this command:\`\`\`${p}emoji stock\`\`\`\nAdd an emoji or emoji pack from the stock, use this command:\`\`\`${p}emoji add <EMOJI ID>\`\`\`\n`)
                message.delete()
                const SendA = await message.channel.send(A)
                .then(setTimeout(() => { SendA.delete() }, 60000))
            }
            else if (args[0] == "stock") {
                const A = new discord.MessageEmbed()
                    .setTitle('Player Pins')
                    .setDescription(`Want to add some cool pins to this server? \nChoose the pins you want and use this command:\`\`\`${p}emoji add <ID>\`\`\`\nExample:\`\`\`${p}emoji add A0005`)
                    .addFields(
                        {name: "__**Happy Pins**__", value: "Pack ID: `B001\n`"},
                        {name: `> ${smile} · Smile`, value: "> ID: `A0001`"},
                        {name: `> ${happy} · Happy`, value: "> ID: `A0002`"},
                        {name: `> ${grin} · Grin`, value: "> ID: `A0003`"},
                        {name: `> ${laugh} · Laugh`, value: "> ID: `A0004`"},
                        {name: `> ${ecstatic} · Ecstatic`, value: "> ID: `A0005`"},
                        {name: '\u200B', value: '\u200B'},
                        {name: "__**Sad Pins**__", value: "Pack ID: `B002\n`"},
                        {name: `> ${sad} · Sad`, value: "> ID: `A0006`"},
                        {name: `> ${shocked} · Shocked`, value: "> ID: `A0007`"},
                        {name: `> ${blank} · Blank`, value: "> ID: `A0008`"},
                        {name: `> ${speechless} · Speechless`, value: "> ID: `A0009`"},
                        {name: `> ${stunned} · stunned`, value: "> ID: `A0010`"},
                        {name: '\u200B', value: '\u200B'},
                        {name: "__**Rage Pins**__", value: "Pack ID: `B003\n`"},
                        {name: `> ${angry} · Angry`, value: "> ID: `A0011`"},
                        {name: `> ${bothered} · Bothered`, value: "> ID: `A0012`"},
                        {name: `> ${annoyed} · Annoyed`, value: "> ID: `A0013`"},
                        {name: `> ${rage} · Rage`, value: "> ID: `A0014`"},
                        {name: `> ${frenzied} · Frenzied`, value: "> ID: `A0015`"}
                    )
                message.channel.send(A)
            }
            else if (args[0] == "add") {
                if (!args[1]) {
                    const A = new discord.MessageEmbed()
                        .setTitle('Player Pins')
                        .setDescription(`Want to add some cool pins to this server? \nChoose the pins you want and use this command:\`\`\`${p}emoji add <ID>\`\`\`\nExample:\`\`\`${p}emoji add A0005`)
                        .addFields(
                            {name: "__**Happy Pins**__", value: "Pack ID: `B001\n`"},
                            {name: `> ${smile} · Smile`, value: "> ID: `A0001`"},
                            {name: `> ${happy} · Happy`, value: "> ID: `A0002`"},
                            {name: `> ${grin} · Grin`, value: "> ID: `A0003`"},
                            {name: `> ${laugh} · Laugh`, value: "> ID: `A0004`"},
                            {name: `> ${ecstatic} · Ecstatic`, value: "> ID: `A0005`"},
                            {name: '\u200B', value: '\u200B'},
                            {name: "__**Sad Pins**__", value: "Pack ID: `B002\n`"},
                            {name: `> ${sad} · Sad`, value: "> ID: `A0006`"},
                            {name: `> ${shocked} · Shocked`, value: "> ID: `A0007`"},
                            {name: `> ${blank} · Blank`, value: "> ID: `A0008`"},
                            {name: `> ${speechless} · Speechless`, value: "> ID: `A0009`"},
                            {name: `> ${stunned} · stunned`, value: "> ID: `A0010`"},
                            {name: '\u200B', value: '\u200B'},
                            {name: "__**Rage Pins**__", value: "Pack ID: `B003\n`"},
                            {name: `> ${angry} · Angry`, value: "> ID: `A0011`"},
                            {name: `> ${bothered} · Bothered`, value: "> ID: `A0012`"},
                            {name: `> ${annoyed} · Annoyed`, value: "> ID: `A0013`"},
                            {name: `> ${rage} · Rage`, value: "> ID: `A0014`"},
                            {name: `> ${frenzied} · Frenzied`, value: "> ID: `A0015`"}
                        )
                    message.channel.send(A)
                }
                else if (args[1] == 'A0001') {
                    message.delete()
                    message.guild.emojis.create(`C:/Users/abiel/Desktop/Lou/Commands/Moderator Commands/Player Pins/${args[1]}.png`, 'Smile').catch((err) => {
                        const A = new discord.MessageEmbed()
                            .setTitle('Error!')
                            .setDescription(err)
                        message.channel.send(A)
                    }).then(emoji => {
                        const A = new discord.MessageEmbed()
                            .setTitle(`Created! <:${emoji.name}:${emoji.id}>`)
                            .setDescription('Thank you for using our emoji!')
                        message.channel.send(A)
                    })
                }
                else if (args[1] == 'A0002') {
                    message.delete()
                    message.guild.emojis.create(`C:/Users/abiel/Desktop/Lou/Commands/Moderator Commands/Player Pins/${args[1]}.png`, 'Smile').catch((err) => {
                        const A = new discord.MessageEmbed()
                            .setTitle('Error!')
                            .setDescription(err)
                        message.channel.send(A)
                    }).then(emoji => {
                        const A = new discord.MessageEmbed()
                            .setTitle(`Created! <:${emoji.name}:${emoji.id}>`)
                            .setDescription('Thank you for using our emoji!')
                        message.channel.send(A)
                    })
                }
                else if (args[1] == 'A0003') {
                    message.delete()
                    message.guild.emojis.create(`C:/Users/abiel/Desktop/Lou/Commands/Moderator Commands/Player Pins/${args[1]}.png`, 'Smile').catch((err) => {
                        const A = new discord.MessageEmbed()
                            .setTitle('Error!')
                            .setDescription(err)
                        message.channel.send(A)
                    }).then(emoji => {
                        const A = new discord.MessageEmbed()
                            .setTitle(`Created! <:${emoji.name}:${emoji.id}>`)
                            .setDescription('Thank you for using our emoji!')
                        message.channel.send(A)
                    })
                }
                else if (args[1] == 'A0004') {
                    message.delete()
                    message.guild.emojis.create(`C:/Users/abiel/Desktop/Lou/Commands/Moderator Commands/Player Pins/${args[1]}.png`, 'Smile').catch((err) => {
                        const A = new discord.MessageEmbed()
                            .setTitle('Error!')
                            .setDescription(err)
                        message.channel.send(A)
                    }).then(emoji => {
                        const A = new discord.MessageEmbed()
                            .setTitle(`Created! <:${emoji.name}:${emoji.id}>`)
                            .setDescription('Thank you for using our emoji!')
                        message.channel.send(A)
                    })
                }
                else if (args[1] == 'A0005') {
                    message.delete()
                    message.guild.emojis.create(`C:/Users/abiel/Desktop/Lou/Commands/Moderator Commands/Player Pins/${args[1]}.png`, 'Smile').catch((err) => {
                        const A = new discord.MessageEmbed()
                            .setTitle('Error!')
                            .setDescription(err)
                        message.channel.send(A)
                    }).then(emoji => {
                        const A = new discord.MessageEmbed()
                            .setTitle(`Created! <:${emoji.name}:${emoji.id}>`)
                            .setDescription('Thank you for using our emoji!')
                        message.channel.send(A)
                    })
                }
                else if (args[1] == 'A0006') {
                    message.delete()
                    message.guild.emojis.create(`C:/Users/abiel/Desktop/Lou/Commands/Moderator Commands/Player Pins/${args[1]}.png`, 'Smile').catch((err) => {
                        const A = new discord.MessageEmbed()
                            .setTitle('Error!')
                            .setDescription(err)
                        message.channel.send(A)
                    }).then(emoji => {
                        const A = new discord.MessageEmbed()
                            .setTitle(`Created! <:${emoji.name}:${emoji.id}>`)
                            .setDescription('Thank you for using our emoji!')
                        message.channel.send(A)
                    })
                }
                else if (args[1] == 'A0007') {
                    message.delete()
                    message.guild.emojis.create(`C:/Users/abiel/Desktop/Lou/Commands/Moderator Commands/Player Pins/${args[1]}.png`, 'Smile').catch((err) => {
                        const A = new discord.MessageEmbed()
                            .setTitle('Error!')
                            .setDescription(err)
                        message.channel.send(A)
                    }).then(emoji => {
                        const A = new discord.MessageEmbed()
                            .setTitle(`Created! <:${emoji.name}:${emoji.id}>`)
                            .setDescription('Thank you for using our emoji!')
                        message.channel.send(A)
                    })
                }
                else if (args[1] == 'A0008') {
                    message.delete()
                    message.guild.emojis.create(`C:/Users/abiel/Desktop/Lou/Commands/Moderator Commands/Player Pins/${args[1]}.png`, 'Smile').catch((err) => {
                        const A = new discord.MessageEmbed()
                            .setTitle('Error!')
                            .setDescription(err)
                        message.channel.send(A)
                    }).then(emoji => {
                        const A = new discord.MessageEmbed()
                            .setTitle(`Created! <:${emoji.name}:${emoji.id}>`)
                            .setDescription('Thank you for using our emoji!')
                        message.channel.send(A)
                    })
                }
                else if (args[1] == 'A0009') {
                    message.delete()
                    message.guild.emojis.create(`C:/Users/abiel/Desktop/Lou/Commands/Moderator Commands/Player Pins/${args[1]}.png`, 'Smile').catch((err) => {
                        const A = new discord.MessageEmbed()
                            .setTitle('Error!')
                            .setDescription(err)
                        message.channel.send(A)
                    }).then(emoji => {
                        const A = new discord.MessageEmbed()
                            .setTitle(`Created! <:${emoji.name}:${emoji.id}>`)
                            .setDescription('Thank you for using our emoji!')
                        message.channel.send(A)
                    })
                }
                else if (args[1] == 'A0010') {
                    message.delete()
                    message.guild.emojis.create(`C:/Users/abiel/Desktop/Lou/Commands/Moderator Commands/Player Pins/${args[1]}.png`, 'Smile').catch((err) => {
                        const A = new discord.MessageEmbed()
                            .setTitle('Error!')
                            .setDescription(err)
                        message.channel.send(A)
                    }).then(emoji => {
                        const A = new discord.MessageEmbed()
                            .setTitle(`Created! <:${emoji.name}:${emoji.id}>`)
                            .setDescription('Thank you for using our emoji!')
                        message.channel.send(A)
                    })
                }
                else if (args[1] == 'A0011') {
                    message.delete()
                    message.guild.emojis.create(`C:/Users/abiel/Desktop/Lou/Commands/Moderator Commands/Player Pins/${args[1]}.png`, 'Smile').catch((err) => {
                        const A = new discord.MessageEmbed()
                            .setTitle('Error!')
                            .setDescription(err)
                        message.channel.send(A)
                    }).then(emoji => {
                        const A = new discord.MessageEmbed()
                            .setTitle(`Created! <:${emoji.name}:${emoji.id}>`)
                            .setDescription('Thank you for using our emoji!')
                        message.channel.send(A)
                    })
                }
                else if (args[1] == 'A0012') {
                    message.delete()
                    message.guild.emojis.create(`C:/Users/abiel/Desktop/Lou/Commands/Moderator Commands/Player Pins/${args[1]}.png`, 'Smile').catch((err) => {
                        const A = new discord.MessageEmbed()
                            .setTitle('Error!')
                            .setDescription(err)
                        message.channel.send(A)
                    }).then(emoji => {
                        const A = new discord.MessageEmbed()
                            .setTitle(`Created! <:${emoji.name}:${emoji.id}>`)
                            .setDescription('Thank you for using our emoji!')
                        message.channel.send(A)
                    })
                }
                else if (args[1] == 'A0013') {
                    message.delete()
                    message.guild.emojis.create(`C:/Users/abiel/Desktop/Lou/Commands/Moderator Commands/Player Pins/${args[1]}.png`, 'Smile').catch((err) => {
                        const A = new discord.MessageEmbed()
                            .setTitle('Error!')
                            .setDescription(err)
                        message.channel.send(A)
                    }).then(emoji => {
                        const A = new discord.MessageEmbed()
                            .setTitle(`Created! <:${emoji.name}:${emoji.id}>`)
                            .setDescription('Thank you for using our emoji!')
                        message.channel.send(A)
                    })
                }
                else if (args[1] == 'A0014') {
                    message.delete()
                    message.guild.emojis.create(`C:/Users/abiel/Desktop/Lou/Commands/Moderator Commands/Player Pins/${args[1]}.png`, 'Smile').catch((err) => {
                        const A = new discord.MessageEmbed()
                            .setTitle('Error!')
                            .setDescription(err)
                        message.channel.send(A)
                    }).then(emoji => {
                        const A = new discord.MessageEmbed()
                            .setTitle(`Created! <:${emoji.name}:${emoji.id}>`)
                            .setDescription('Thank you for using our emoji!')
                        message.channel.send(A)
                    })
                }
                else if (args[1] == 'A0015') {
                    message.delete()
                    message.guild.emojis.create(`C:/Users/abiel/Desktop/Lou/Commands/Moderator Commands/Player Pins/${args[1]}.png`, 'Smile').catch((err) => {
                        const A = new discord.MessageEmbed()
                            .setTitle('Error!')
                            .setDescription(err)
                        message.channel.send(A)
                    }).then(emoji => {
                        const A = new discord.MessageEmbed()
                            .setTitle(`Created! <:${emoji.name}:${emoji.id}>`)
                            .setDescription('Thank you for using our emoji!')
                        message.channel.send(A)
                    })
                }
            }
        }
    }
}