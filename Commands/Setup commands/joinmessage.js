const discord = require('discord.js')
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Shababad:actx3819@cluster0.v4hao.mongodb.net/790504650909417482");

module.exports = {
    name: "joinmessage",
    description: "Set a join message for a server",
    category: "Setup Command",
    usage: "!joinmessage settitle <Text here>",
    run: async (client, message, args) => {
        const JMTitles = await db.get(`${message.guild.id}.jm_title`)
        let JMTitle;if (JMTitles == null) {JMTitle = "A New Member!";} else {JMTitle = JMTitles;}
        const JMDescs = await db.get(`${message.guild.id}.jm_desc`)
        let JMDesc;if (JMDescs == null) {JMDesc = "Welcome {user} to {server.name}, hope you enjoy your stay!";} else {JMDesc = JMDescs;}
        const JMColors = await db.get(`${message.guild.id}.jm_color`)
        let JMColor;if (JMColors == null) {JMColor = "#8afff1";} else {JMColor = Color;}
        let p;let prefixes=await db.get(`${message.guild.id}.prefix`);if(prefixes==null){p='!';}else{p=prefixes;}
        if (!message.member.hasPermission('MANAGE_GUILD')) {
            const A = new discord.MessageEmbed()
                .setTitle('400 Bad Request')
                .setDescription('You don\'t have the required permission to use this command')
                message.delete()
            const SendA = await message.channel.send(A)
            .then(setTimeout(() => { SendA.delete() }, 10000))
        } else {
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
                let JMDescX = JMDesc.replace("{user}", message.author.username).replace("{user.id}", message.author.id).replace("{user.discriminator}", message.author.discriminator).replace("{server.name}", message.guild.name).replace("{server.id}", message.guild.id)
                const A = new discord.MessageEmbed()
                    .setTitle(JMTitle)
                    .setDescription(JMDescX)
                    .setColor(JMColor)
                    message.delete()
                    const SendA = await message.channel.send(A)
                    .then(setTimeout(() => { SendA.delete() }, 30000))
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
                        {name: "> set...", value: `> Set Embed parts of the Embed\n> Usage: \`${p}joinmessage set... <Text>\``}
                    )
                    .addField('\u200B', '\u200B')
                    .addField("**EMBED PARTS**", "Parts name of the embed")
                    .addFields(
                        {name: "> settitle", value: `> set title of the embed\n> Usage: \`${p}joinmessage settitle <Text>\``},
                        {name: "> setdesc", value: `> set description of the embed\n> Usage: \`${p}joinmessage setdesc <Text>\``},
                        {name: "> setcolor", value: `> set color of the embed\n> Usage: \`${p}joinmessage setcolor <Hex color>\`\n> To get the Hex color code, click [here](https://www.google.com/search?sxsrf=ALeKk02U6m7EHf7qGxcylJZNWjbnJNvtug%3A1609836288447&ei=ACf0X5rsGoSCjLsPgviS2Ac&q=color+picker&oq=%23color&gs_lcp=CgZwc3ktYWIQAxgAMgQIABBHMgQIABBHMgQIABBHMgQIABBHMgQIABBHMgQIABBHMgQIABBHMgQIABBHUABYAGCMHGgAcAJ4AIABAIgBAJIBAJgBAKoBB2d3cy13aXrIAQjAAQE&sclient=psy-ab)`},
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
                        { name: '\u200B', value: '\u200B' }
                    )
                    .addField("**TEXT FORMATTING**", 'Guide for the formatting of the text')
                    .addFields(
                        {name: "> `*italics*` or `_italics_`", value: `> *Italic* the text`},
                        {name: "> `**bold**`", value: `> Make the text **Bold**`},
                        {name: "> `***bold-italics***`", value: `> Make the text ***Bold-Italics***`},
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
                    if (x.length >= 11) {
                        const A = new discord.MessageEmbed()
                            .setTitle('An Error Occurred')
                            .setDescription('The given title was too long, max. 10 words. Try again')
                        message.delete()
                        const SendA = await message.channel.send(A)
                        .then(setTimeout(() => { SendA.delete() }, 10000))
                    }
                    else {
                        const A = new discord.MessageEmbed()
                            .setTitle('201 Created')
                            .description(`The Embed-Title of ${message.guild.name} has now been set to:\n"**${x}**"`)
                    }
                }
            }
        }
    }
}
/*
        const joinchannel = await db.get(`${message.guild.id}.joinchannel`)
        // If Join messages are disabled
        if (joinchannel == null) {
            const A = new discord.MessageEmbed()
                .setTitle('400 Bad Request')
                .setDescription(`Welcome messages in ${message.guild.name} are disabled\n\`\`\`!setjoinchannel <channel>\`\`\`\n^^ To enable and set a welcome message for this server!`)
            const SendA = await message.channel.send(A)
            .then(setTimeout(() => { SendA.delete() }, 10000))
        }
        // If join messages are enabled
        else if (joinchannel !== null) {
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
                        .setDescription('**No argument provided**\n```!setjoinmessage <Embed Part> <Text>```**Example:**\n```!setjoinmessage description Welcome to the server {user.tag}```')
                    const B = new discord.MessageEmbed()
                        .setTitle('Join Message Documentation')
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
                    let title = args.slice(1).join(" ")
                    if (!title.length) {
                        const A = new discord.MessageEmbed()
                            .setTitle('411 Length Required')
                            .setDescription('**Text is missing**\n```!setjoinmessage title <text>```')
                        const SendA = await message.channel.send(A).then(setTimeout(() => { SendA.delete() }, 10000))
                    }
                    else if (title.length) {
                        const set = await db.set(`${message.guild.id}.embed_title`, title)
                        const A = new discord.MessageEmbed()
                            .setTitle('201 Created')
                            .setDescription(`The title of the join message is now\n"${title}"\nTo see the preview, try this command:\`\`\`!joinmessage preview\`\`\``)
                        const SendA = await message.channel.send(A).then(setTimeout(() => { SendA.delete() }, 10000))
                    }
                }
            }
            
        }*/