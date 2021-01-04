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
        let JMTitle;if (JMTitles == null) {JMTitle = "None";} else {JMTitle = JMTitles;}
        const JMDescs = await db.get(`${message.guild.id}.jm_desc`)
        let JMDesc;if (JMDescs == null) {JMDesc = "None";} else {JMDesc = JMDescs;}
        const JMColors = await db.get(`${message.guild.id}.jm_color`)
        let JMColor;if (JMColors == null) {JMColor = "None";} else {JMColor = Color;}
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
                    .setDescription(`To edit the embed, use this command:\n\`\`\`${p}joinmessage <SetDesc/SetTitle...> <Message here>\`\`\`\nTo see the preview. use this command:\`\`\`${p}joinmessage preview\`\`\``)
                    .addFields(
                        {name: 'Title:', value: JMTitle},
                        {name: 'Description:', value: JMDesc},
                        {name: 'Color:', value: JMColor}
                    )
                message.delete()
                const SendA = await message.channel.send(A)
                .then(setTimeout(() => { SendA.delete() }, 10000))
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