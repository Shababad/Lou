const discord = require('discord.js')
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Shababad:actx3819@cluster0.v4hao.mongodb.net/790504650909417482");

module.exports = {
    name: "joinmessage",
    description: "Set a join message for a server",
    category: "Setup Command",
    usage: "joinmessage <settitle/setdesc...> <Text here>",
    example: "joinmessage setdesc Welcome {user} to this server!",
    run: async (client, message, args) => {
        const joinchannel = await db.get(`${message.guild.id}.joinchannel`)
        const JMTitles = await db.get(`${message.guild.id}.jm_title`)
        let JMTitle;if (JMTitles == null) {JMTitle = "A New Member!";} else {JMTitle = JMTitles;}
        const JMDescs = await db.get(`${message.guild.id}.jm_desc`)
        let JMDesc;if (JMDescs == null) {JMDesc = "Welcome {user} to {server.name}, hope you enjoy your stay!";} else {JMDesc = JMDescs;}
        const JMColors = await db.get(`${message.guild.id}.jm_color`)
        let JMColor;if (JMColors == null) {JMColor = "#8afff1";} else {JMColor = JMColors;}
        let p;let prefixes=await db.get(`${message.guild.id}.prefix`);if(prefixes==null){p='!';}else{p=prefixes;}
        if (!message.member.hasPermission('MANAGE_GUILD')) {
            const A = new discord.MessageEmbed()
                .setTitle('400 Bad Request')
                .setDescription('You don\'t have the required permission to use this command')
                message.delete()
            const SendA = await message.channel.send(A)
            .then(setTimeout(() => { SendA.delete() }, 10000))
        } else {
            if (joinchannel == null) {
                var chx = message.guild.channels.cache.filter(chx => chx.type === "text").find(x => x.position === 0);
                const A = new discord.MessageEmbed()
                    .setTitle('404 Not Found')
                    .setDescription(`There are no join channel found in ${message.guild.name}.\nTo set a join channel for this server, use the following command:\`\`\`!joinchannel set <#channel>\`\`\`\nExample: **${p}joinchannel set ${chx}**`)
                const SendA = await message.channel.send(A)
                message.delete()
                .then(setTimeout(() => { SendA.delete() }, 10000))
            }
            else if (joinchannel !== null) {
                if (!args[0]) {
                    const A = new discord.MessageEmbed()
                        .setTitle(`Join Message`)
                        .setDescription(`To edit the embed, use this command:\n\`\`\`${p}joinmessage <setdesc/settitle...> <Message here>\`\`\`\nTo see the preview. use this command:\`\`\`${p}joinmessage preview\`\`\`\nTo see the documentations, use:\`\`\`${p}joinmessage docs\`\`\``)
                        .addFields(
                            {name: 'Title:', value: JMTitle},
                            {name: 'Description:', value: JMDesc},
                            {name: 'Color:', value: JMColor}
                        )
                    message.delete()
                    const SendA = await message.channel.send(A)
                    .then(setTimeout(() => { SendA.delete() }, 60000))
                }

                else if (args[0] == "preview") {
                    let JMDescX = JMDesc.replace("{user}", message.author.username).replace("{user.id}", message.author.id).replace("{user.discriminator}", message.author.discriminator).replace('{user.mention}', `<@${message.author.id}>`).replace("{server.name}", message.guild.name).replace("{server.id}", message.guild.id).replace("{server.members}", message.guild.memberCount)
                    if (JMTitle == "01010010" && JMDesc == "01010010") {
                        const B = new discord.MessageEmbed()
                            .setTitle('404 Not Found')
                            .setDescription('Embed can\'t be sent without a Title and a Descriptiom')
                        message.channel.send(B)
                    }
                    else {
                        const A = new discord.MessageEmbed()
                        if (JMTitle !== "01010010") {
                            A.setTitle(JMTitle)
                        }
                        if (JMDesc !== "01010010") {
                            A.setDescription(JMDescX)
                        }
                        A.setColor(JMColor)
                        message.delete()
                        const SendA = await message.channel.send(A)
                        .then(setTimeout(() => { SendA.delete() }, 30000))
                    }
                }
                else if (args[0] == "docs") {
                    const A = new discord.MessageEmbed()
                        .setTitle('DOCUMENTATION')
                        .setThumbnail('https://static.wikia.nocookie.net/brawlstars/images/b/b4/Lou_Pin-Thanks.png/revision/latest/scale-to-width-down/45?cb=20201111225739')
                        .setDescription('Here is a page Documentation for the Official Lou Bot\n`<Required Field>` || `[Optional Field]`')
                        .addField('\u200B', '\u200B')
                        .addField('**COMMANDS**', 'List of commands for joinmessage')
                        .addFields(
                            {name: "> joinmessage", value: `> See the main page of the joinmessage\n> Usage: \`${p}joinmessage\``},
                            {name: "> docs", value: `> See the documentation of this command\n> Usage: \`${p}joinmessage docs\``},
                            {name: "> preview", value: `> See the preview of the joinmessage for this server\n> Usage: \`${p}joinmessage preview\``},
                            {name: "> set...", value: `> Set Embed parts of the Embed\n> Usage: \`${p}joinmessage set... <Text>\``},
                            {name: "> remove...", value: `> Remove Embed parts of the Embed\n> Usage: \`${p}joinmessage remove...\``}
                        )
                        .addField('\u200B', '\u200B')
                        .addField("**EMBED PARTS**", "Parts name of the embed")
                        .addFields(
                            {name: "> settitle", value: `> set title of the embed\n> Usage: \`${p}joinmessage settitle <Text>\``},
                            {name: "> setdesc", value: `> set description of the embed\n> Usage: \`${p}joinmessage setdesc <Text>\``},
                            {name: "> setcolor", value: `> set color of the embed\n> Usage: \`${p}joinmessage setcolor <Hex color>\`\n> To get the Hex color code, click [here](https://www.google.com/search?sxsrf=ALeKk02U6m7EHf7qGxcylJZNWjbnJNvtug%3A1609836288447&ei=ACf0X5rsGoSCjLsPgviS2Ac&q=color+picker&oq=%23color&gs_lcp=CgZwc3ktYWIQAxgAMgQIABBHMgQIABBHMgQIABBHMgQIABBHMgQIABBHMgQIABBHMgQIABBHMgQIABBHUABYAGCMHGgAcAJ4AIABAIgBAJIBAJgBAKoBB2d3cy13aXrIAQjAAQE&sclient=psy-ab)`},
                            {name: "> removetitle", value: `> remove title of the embed\n> Usage: \`${p}joinmessage removetitle\``},
                            {name: "> removedesc", value: `> remove description of the embed\n> Usage: \`${p}joinmessage removedesc\``},
                            { name: '\u200B', value: '\u200B' }
                        )
                        .addField("**TEMPLATE STRINGS**", 'Get all the name of the Template strings')
                        .addFields(
                            {name: "> `{user}`", value: `> get the name of the joined member, ex: **${message.author.username}**`},
                            {name: "> `{user.id}`", value: `> get the id of the joined member, ex: **${message.author.id}**`},
                            {name: "> `{user.discriminator}`", value: `> get the discriminator of the joined member, ex: **${message.author.discriminator}**`},
                            {name: "> `{user.tag}`", value: `> get the name#tag of the joined member, ex: **${message.author.tag}**`},
                            {name: "> `{user.mention}`", value: `> ping the joined member, ex: <@${message.author.id}>`},
                            {name: "> `{server.members}`", value: `> get the total member value of the server, ex: **${message.guild.memberCount}**`},
                            {name: "> `{server.name}`", value: `> get the name of the server, ex: **${message.guild.name}**`},
                            { name: '\u200B', value: '\u200B' }
                        )
                        const SendA = await message.channel.send(A)
                }
                else if (args[0] == "settitle") {
                    let x = args.slice(1).join(" ")
                    if (!x.length) {
                        const A = new discord.MessageEmbed()
                            .setTitle('411 Length required')
                            .setDescription(`Please give a piece of text you want to set as the Embed-Title (max. 10 words)\`\`\`${p}joinmessage settitle <YOUR TITLE HERE>\`\`\`\nUse this command to see the documentations:\`\`\`${p}joinmessage docs\`\`\``)
                        message.delete()
                        const SendA = await message.channel.send(A)
                        .then(setTimeout(() => { SendA.delete() }, 10000))
                    }
                    else if (x.length) {
                        let y = args.length - 1;
                        if (y >= 11) {
                            const A = new discord.MessageEmbed()
                                .setTitle('An Error Occurred')
                                .setDescription('The given title was too long, max. 10 words. Try again')
                            message.delete()
                            const SendA = await message.channel.send(A)
                            .then(setTimeout(() => { SendA.delete() }, 10000))
                        }
                        else if (y <= 10){
                            const A = new discord.MessageEmbed()
                                .setTitle('201 Created')
                                .setDescription(`The Embed-Title of ${message.guild.name} has now been set to:\n"**${x}**"\n\nTo see the preview, use this command:\`\`\`${p}joinmessage preview\`\`\``)
                            message.delete()
                            db.set(`${message.guild.id}.jm_title`, x)
                            const SendA = await message.channel.send(A)
                            .then(setTimeout(() => { SendA.delete() }, 10000))
                        }

                    }
                }
                else if (args[0] == "setdesc") {
                    let x = args.slice(1).join(" ")
                    if (!x.length) {
                        const A = new discord.MessageEmbed()
                            .setTitle('411 Length required')
                            .setDescription(`Please give a piece of text you want to set as the Embed-Description (max. 100 words)\`\`\`${p}joinmessage setdesc <YOUR DESCRIPTION HERE>\`\`\`\nUse this command to see the documentations:\`\`\`${p}joinmessage docs\`\`\``)
                        message.delete()
                        const SendA = await message.channel.send(A)
                        .then(setTimeout(() => { SendA.delete() }, 10000))
                    }
                    else if (x.length) {
                        let y = args.length - 1;
                        if (y >= 101) {
                            const A = new discord.MessageEmbed()
                                .setTitle('An Error Occurred')
                                .setDescription('The given description was too long, max. 100 words. Try again')
                            message.delete()
                            const SendA = await message.channel.send(A)
                            .then(setTimeout(() => { SendA.delete() }, 10000))
                        }
                        else if (y <= 100){
                            const A = new discord.MessageEmbed()
                                .setTitle('201 Created')
                                .setDescription(`The Embed-Description of ${message.guild.name} has now been set to:\n"**${x}**"\n\nTo see the preview, use this command:\`\`\`${p}joinmessage preview\`\`\``)
                            message.delete()
                            db.set(`${message.guild.id}.jm_desc`, x)
                            const SendA = await message.channel.send(A)
                            .then(setTimeout(() => { SendA.delete() }, 10000))
                        }

                    }
                }
                else if (args[0] == "setcolor") {
                    if (!args[1]) {
                        const A = new discord.MessageEmbed()
                            .setTitle('411 Length Required')
                            .setDescription(`Please give a valid HEX color Code. \`\`\`${p}joinmessage setcolor #HEX\`\`\`\n Get a HEX code [here](https://www.google.com/search?q=%23color+picker&oq=%23&aqs=chrome.1.69i57j69i59l3.1902j0j1&sourceid=chrome&ie=UTF-8)`)
                        message.delete()
                        const SendA = await message.channel.send(A)
                        .then(setTimeout(() => { SendA.delete() }, 10000))
                    } else if (args[1]) {
                        if (args[1].length >= 8 || args[1].length <= 5) {
                            const A = new discord.MessageEmbed()
                                .setTitle('Invalid HEX color code')
                                .setDescription('Please provide a valid Hex Color Code, get one [here](https://www.google.com/search?q=%23color+picker&oq=%23&aqs=chrome.1.69i57j69i59l3.1902j0j1&sourceid=chrome&ie=UTF-8)')
                            message.delete()
                            const SendA = await message.channel.send(A)
                            .then(setTimeout(() => { SendA.delete() }, 10000))
                        }
                        else if (args[1].length == 6 || 7) {
                            const A = new discord.MessageEmbed()
                                .setTitle('202 Accepted')
                                .setDescription(`Embed-Color has now been set to "**${args[1]}**"`)
                            db.set(`${message.guild.id}.jm_color`, args[1])
                            const SendA = await message.channel.send(A)
                            message.delete()
                            .then(setTimeout(() => { SendA.delete() }, 10000))
                        }
                    }
                }
                else if (args[0] == "removetitle") {
                    const A = new discord.MessageEmbed()
                        .setTitle('Working...')
                        .setDescription(`Removing join-message-title of ${message.guild.name}\n"**${JMTitle}**"`)
                    const B = new discord.MessageEmbed()
                        .setTitle('202 Accepted')
                        .setDescription('join-message-title has been sucessfully removed!')
                    const SendA = await message.channel.send(A)
                    message.delete()
                        .then(setTimeout(() => { SendA.edit(B) }, 4000))
                        db.set(`${message.guild.id}.jm_title`, "01010010")
                        .then(setTimeout(() => { SendA.delete() }, 10000))
                }
                else if (args[0] == "removedesc") {
                    const A = new discord.MessageEmbed()
                        .setTitle('Working...')
                        .setDescription(`Removing join-message-description of ${message.guild.name}\n"**${JMTitle}**"`)
                    const B = new discord.MessageEmbed()
                        .setTitle('202 Accepted')
                        .setDescription('join-message-desc has been sucessfully removed!')
                    const SendA = await message.channel.send(A)
                    message.delete()
                        .then(setTimeout(() => { SendA.edit(B) }, 4000))
                    db.set(`${message.guild.id}.jm_desc`, "01010010")
                        .then(setTimeout(() => { SendA.delete() }, 10000))
                }
            }
        }
    }
}
