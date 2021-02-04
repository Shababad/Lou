const discord = require('discord.js')
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Shababad:actx3819@cluster0.v4hao.mongodb.net/790504650909417482");

module.exports = {
    name: "leavemessage",
    description: "Set a leave message for a server",
    category: "Setup Command",
    usage: "leavemessage settitle <Text here>",
    example: "leavemessage setdesc Bye bye {user}, cries~",
    run: async (client, message, args) => {
        const leavechannel = await db.get(`${message.guild.id}.leavechannel`)
        const LMTitles = await db.get(`${message.guild.id}.lm_title`)
        let LMTitle;if (LMTitles == null) {LMTitle = "A Member left";} else {LMTitle = LMTitles;}
        const LMDescs = await db.get(`${message.guild.id}.lm_desc`)
        let LMDesc;if (LMDescs == null) {LMDesc = "{user} left the server... bye bye :(";} else {LMDesc = LMDescs;}
        const LMColors = await db.get(`${message.guild.id}.lm_color`)
        let LMColor;if (LMColors == null) {LMColor = "#8afff1";} else {LMColor = LMColors;}
        let p;let prefixes=await db.get(`${message.guild.id}.prefix`);if(prefixes==null){p='!';}else{p=prefixes;}
        if (!message.member.hasPermission('MANAGE_GUILD')) {
            const A = new discord.MessageEmbed()
                .setTitle('400 Bad Request')
                .setDescription('You don\'t have the required permission to use this command')
                message.delete()
            const SendA = await message.channel.send(A)
            .then(setTimeout(() => { SendA.delete() }, 10000))
        } else {
            if (leavechannel == null) {
                var chx = message.guild.channels.cache.filter(chx => chx.type === "text").find(x => x.position === 0);
                const A = new discord.MessageEmbed()
                    .setTitle('404 Not Found')
                    .setDescription(`There are no leave channel found in ${message.guild.name}.\nTo set a leave channel for this server, use the following command:\`\`\`!leavechannel set <#channel>\`\`\`\nExample: **${p}leavechannel set ${chx}**`)
                const SendA = await message.channel.send(A)
                message.delete()
                .then(setTimeout(() => { SendA.delete() }, 10000))
            }
            else if (leavechannel !== null) {
                if (!args[0]) {
                    const A = new discord.MessageEmbed()
                        .setTitle(`leave Message`)
                        .setDescription(`To edit the embed, use this command:\n\`\`\`${p}leavemessage <setdesc/settitle...> <Message here>\`\`\`\nTo see the preview. use this command:\`\`\`${p}leavemessage preview\`\`\`\nTo see the documentations, use:\`\`\`${p}leavemessage docs\`\`\``)
                        .addFields(
                            {name: 'Title:', value: LMTitle},
                            {name: 'Description:', value: LMDesc},
                            {name: 'Color:', value: LMColor}
                        )
                    message.delete()
                    const SendA = await message.channel.send(A)
                    .then(setTimeout(() => { SendA.delete() }, 60000))
                }

                else if (args[0] == "preview") {
                    let LMDescX = LMDesc.replace("{user}", message.author.username).replace("{user.id}", message.author.id).replace("{user.discriminator}", message.author.discriminator).replace('{user.mention}', `<@${message.author.id}>`).replace("{server.name}", message.guild.name).replace("{server.id}", message.guild.id).replace("{server.members}", message.guild.memberCount)
                    if (LMTitle == "01010010" && LMDesc == "01010010") {
                        const B = new discord.MessageEmbed()
                            .setTitle('404 Not Found')
                            .setDescription('Embed can\'t be sent without a Title and a Descriptiom')
                        message.channel.send(B)
                    }
                    else {
                        const A = new discord.MessageEmbed()
                        if (LMTitle !== "01010010") {
                            A.setTitle(LMTitle)
                        }
                        if (LMDesc !== "01010010") {
                            A.setDescription(LMDescX)
                        }
                        A.setColor(LMColor)
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
                        .addField('**COMMANDS**', 'List of commands for leavemessage')
                        .addFields(
                            {name: "> leavemessage", value: `> See the main page of the leavemessage\n> Usage: \`${p}leavemessage\``},
                            {name: "> docs", value: `> See the documentation of this command\n> Usage: \`${p}leavemessage docs\``},
                            {name: "> preview", value: `> See the preview of the leavemessage for this server\n> Usage: \`${p}leavemessage preview\``},
                            {name: "> set...", value: `> Set Embed parts of the Embed\n> Usage: \`${p}leavemessage set... <Text>\``},
                            {name: "> remove...", value: `> Remove Embed parts of the Embed\n> Usage: \`${p}leavemessage remove...\``}
                        )
                        .addField('\u200B', '\u200B')
                        .addField("**EMBED PARTS**", "Parts name of the embed")
                        .addFields(
                            {name: "> settitle", value: `> set title of the embed\n> Usage: \`${p}leavemessage settitle <Text>\``},
                            {name: "> setdesc", value: `> set description of the embed\n> Usage: \`${p}leavemessage setdesc <Text>\``},
                            {name: "> setcolor", value: `> set color of the embed\n> Usage: \`${p}leavemessage setcolor <Hex color>\`\n> To get the Hex color code, click [here](https://www.google.com/search?sxsrf=ALeKk02U6m7EHf7qGxcylJZNWjbnJNvtug%3A1609836288447&ei=ACf0X5rsGoSCjLsPgviS2Ac&q=color+picker&oq=%23color&gs_lcp=CgZwc3ktYWIQAxgAMgQIABBHMgQIABBHMgQIABBHMgQIABBHMgQIABBHMgQIABBHMgQIABBHMgQIABBHUABYAGCMHGgAcAJ4AIABAIgBAJIBAJgBAKoBB2d3cy13aXrIAQjAAQE&sclient=psy-ab)`},
                            {name: "> removetitle", value: `> remove title of the embed\n> Usage: \`${p}leavemessage removetitle\``},
                            {name: "> removedesc", value: `> remove description of the embed\n> Usage: \`${p}leavemessage removedesc\``},
                            { name: '\u200B', value: '\u200B' }
                        )
                        .addField("**TEMPLATE STRINGS**", 'Get all the name of the Template strings')
                        .addFields(
                            {name: "> `{user}`", value: `> get the name of the leaveed member, ex: **${message.author.username}**`},
                            {name: "> `{user.id}`", value: `> get the id of the leaveed member, ex: **${message.author.id}**`},
                            {name: "> `{user.discriminator}`", value: `> get the discriminator of the leaveed member, ex: **${message.author.discriminator}**`},
                            {name: "> `{user.tag}`", value: `> get the name#tag of the leaveed member, ex: **${message.author.tag}**`},
                            {name: "> `{user.mention}`", value: `> ping the leaveed member, ex: <@${message.author.id}>`},
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
                            .setDescription(`Please give a piece of text you want to set as the Embed-Title (max. 10 words)\`\`\`${p}leavemessage settitle <YOUR TITLE HERE>\`\`\`\nUse this command to see the documentations:\`\`\`${p}leavemessage docs\`\`\``)
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
                                .setDescription(`The Embed-Title of ${message.guild.name} has now been set to:\n"**${x}**"\n\nTo see the preview, use this command:\`\`\`${p}leavemessage preview\`\`\``)
                            message.delete()
                            db.set(`${message.guild.id}.lm_title`, x)
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
                            .setDescription(`Please give a piece of text you want to set as the Embed-Description (max. 100 words)\`\`\`${p}leavemessage setdesc <YOUR DESCRIPTION HERE>\`\`\`\nUse this command to see the documentations:\`\`\`${p}leavemessage docs\`\`\``)
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
                                .setDescription(`The Embed-Description of ${message.guild.name} has now been set to:\n"**${x}**"\n\nTo see the preview, use this command:\`\`\`${p}leavemessage preview\`\`\``)
                            message.delete()
                            db.set(`${message.guild.id}.lm_desc`, x)
                            const SendA = await message.channel.send(A)
                            .then(setTimeout(() => { SendA.delete() }, 10000))
                        }

                    }
                }
                else if (args[0] == "setcolor") {
                    if (!args[1]) {
                        const A = new discord.MessageEmbed()
                            .setTitle('411 Length Required')
                            .setDescription(`Please give a valid HEX color Code. \`\`\`${p}leavemessage setcolor #HEX\`\`\`\n Get a HEX code [here](https://www.google.com/search?q=%23color+picker&oq=%23&aqs=chrome.1.69i57j69i59l3.1902j0j1&sourceid=chrome&ie=UTF-8)`)
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
                            db.set(`${message.guild.id}.lm_color`, args[1])
                            const SendA = await message.channel.send(A)
                            message.delete()
                            .then(setTimeout(() => { SendA.delete() }, 10000))
                        }
                    }
                }
                else if (args[0] == "removetitle") {
                    const A = new discord.MessageEmbed()
                        .setTitle('Working...')
                        .setDescription(`Removing leave-message-title of ${message.guild.name}\n"**${LMTitle}**"`)
                    const B = new discord.MessageEmbed()
                        .setTitle('202 Accepted')
                        .setDescription('leave-message-title has been sucessfully removed!')
                    const SendA = await message.channel.send(A)
                    message.delete()
                        .then(setTimeout(() => { SendA.edit(B) }, 4000))
                        db.set(`${message.guild.id}.lm_title`, "01010010")
                        .then(setTimeout(() => { SendA.delete() }, 10000))
                }
                else if (args[0] == "removedesc") {
                    const A = new discord.MessageEmbed()
                        .setTitle('Working...')
                        .setDescription(`Removing leave-message-description of ${message.guild.name}\n"**${LMTitle}**"`)
                    const B = new discord.MessageEmbed()
                        .setTitle('202 Accepted')
                        .setDescription('leave-message-desc has been sucessfully removed!')
                    const SendA = await message.channel.send(A)
                    message.delete()
                        .then(setTimeout(() => { SendA.edit(B) }, 4000))
                        db.set(`${message.guild.id}.lm_desc`, "01010010")
                        .then(setTimeout(() => { SendA.delete() }, 10000))
                }
            }
        }
    }
}
/*
        const leavechannel = await db.get(`${message.guild.id}.leavechannel`)
        // If leave messages are disabled
        if (leavechannel == null) {
            const A = new discord.MessageEmbed()
                .setTitle('400 Bad Request')
                .setDescription(`Welcome messages in ${message.guild.name} are disabled\n\`\`\`!setleavechannel <channel>\`\`\`\n^^ To enable and set a welcome message for this server!`)
            const SendA = await message.channel.send(A)
            .then(setTimeout(() => { SendA.delete() }, 10000))
        }
        // If leave messages are enabled
        else if (leavechannel !== null) {
            // If message.author does not have the required Permission "Manage Guild"
            if (!message.member.hasPermission("MANAGE_GUILD")) {
                const A = new discord.MessageEmbed()
                    .setTitle('400 Bad Request')
                    .setDescription('You don\'t have the required permission "**Manage Guild**"')
                const SendA = await message.channel.send(A)
                .then(setTimeout(() => { SendA.delete() }, 10000))
            }
            // If He has the required Permission
            else if (message.member.hasPermission("MANAGE_GUILD")) {
                // If no argument provided
                if (!args[0]){
                    const A = new discord.MessageEmbed()
                        .setTitle('411 Length Required')
                        .setDescription('**No argument provided**\n```!setleavemessage <Embed Part> <Text>```**Example:**\n```!setleavemessage description Welcome to the server {user.tag}```')
                    const B = new discord.MessageEmbed()
                        .setTitle('leave Message Documentation')
                        .addFields(
                            {name: '`{user}`', value: `user's username, ex.: **${message.author.username}**`},
                            {name: '`{user.tag}`', value: `user's username#usertag, ex.: **${message.author.tag}**`},
                            {name: '`{user.ping}`', value: `ping the user, ex.: <@${message.author.id}>`},
                            {name: '`{member.size}`', value: `get the value of members in the server, ex.: **${message.guild.memberCount}**`}
                        )
                    const SendA = await message.channel.send(A).then(message.channel.send(B))
                    .then(message.delete())
                // Setting up the Title
                } else if (args[0] == "title") {
                    let title = args.slice(1).leave(" ")
                    if (!title.length) {
                        const A = new discord.MessageEmbed()
                            .setTitle('411 Length Required')
                            .setDescription('**Text is missing**\n```!setleavemessage title <text>```')
                        const SendA = await message.channel.send(A).then(setTimeout(() => { SendA.delete() }, 10000))
                    }
                    else if (title.length) {
                        const set = await db.set(`${message.guild.id}.embed_title`, title)
                        const A = new discord.MessageEmbed()
                            .setTitle('201 Created')
                            .setDescription(`The title of the leave message is now\n"${title}"\nTo see the preview, try this command:\`\`\`!leavemessage preview\`\`\``)
                        const SendA = await message.channel.send(A).then(setTimeout(() => { SendA.delete() }, 10000))
                    }
                }
            }
            
        }*/