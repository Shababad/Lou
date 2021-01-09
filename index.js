/*

 ___       ________  ___  ___     
|\  \     |\   __  \|\  \|\  \    
\ \  \    \ \  \|\  \ \  \\\  \   
 \ \  \    \ \  \\\  \ \  \\\  \  
  \ \  \____\ \  \\\  \ \  \\\  \ 
   \ \_______\ \_______\ \_______\
    \|_______|\|_______|\|_______|

*/

const discord = require("discord.js");
const { Command } = require("discord.js-commando");
const { Client, Collection } = require("discord.js");
const client = new discord.Client();
const { token, version } = require("./config.json");
const fs = require("fs");
const request = require('request')
const {Client:BSClient} = require('brawlstars');
const capitalize = require('chumnend-capitalize');
const ascii = require("ascii-table");
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Shababad:actx3819@cluster0.v4hao.mongodb.net/790504650909417482");


client.commands = new Collection();;
client.aliases = new Collection();
client.catergories = fs.readdirSync("./Commands");


["command"].forEach((handler) => {
    require(`./handlers/${handler}`)(client);
});

fs.readdir("./events/", (err, files) => {
    if (err) return console.error;
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
  
        const evt = require(`./events/${file}`);
        let evtName = file.split(".")[0];
        client.on(evtName, evt.bind(null, client));
    });
});


client.once("ready", async () => {

    db.add(`bot.restarts`, 1)
    const restartvalue = await db.get(`bot.restarts`)
    
    const client2 = new BSClient("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjVkNTYxM2VkLTRkNzctNDE1Mi1hNjcxLTNmNTQ4NDBjZGZmYyIsImlhdCI6MTYwODEwNzkyNiwic3ViIjoiZGV2ZWxvcGVyL2VjZjRkOThlLTgyOTMtZTQ1Yi1lOTAzLTJjZjk4NzI1ODNmZiIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiOTMuMjAyLjI0My4xNTMiXSwidHlwZSI6ImNsaWVudCJ9XX0.BqAqdCBnHv6vPNTZB7spDEO0omit1z6PbJwCFHEbc4shO7_4-crQmKoUyo85aUi8hGMB6dWDsrjEsUbGEL6ZuA", { 
        cache: true, // default is true
        cacheOptions: undefined // options for node-cache, default is undefined.
    });

    /* Bot Status */ let Me = client2.getPlayer('#8R8P8QOLP'); let MyTrophies = (await Me).trophies; let s = ["Brawl Stars", `with ${MyTrophies} Trophies`, "Lou in Solo", `with ${client.users.cache.size} players`, `in ${client.guilds.cache.size} server`, `Lou V.${version}`]; var count = 0; setInterval((e) => {var randomNumber = Math.floor(Math.random() * 11); count = (count + randomNumber) % s.length; var news = s[count]; client.user.setActivity(news);}, 30000);

    let stats = new ascii("Bot Stats")
        stats.setHeading("Value Name", "Value")
        stats.addRow("Guilds", client.guilds.cache.size)
        stats.addRow("Members", client.users.cache.size)
        stats.addRow("Version", version)

    console.log(stats.toString())
    console.log(client.readyTime)
    console.log(`Logged in as ${client.user.tag}!`);

    const channel = await client.channels.cache.get('792786693014421564')
    const A = new discord.MessageEmbed()
        .setTitle('Bot Ready')
        .setThumbnail('https://static.wikia.nocookie.net/brawlstars/images/c/cb/Lou_Pin-GG.png/revision/latest/scale-to-width-down/45?cb=20201111225737')
        .setTimestamp()
        .setDescription(`Sucessfully loaded ${client.commands.size} commands\nThis is the ${restartvalue} time this bot has been turned on`)
        .addFields({name: "Total Guilds:", value: client.guilds.cache.size}, {name: "Total Emojis:", value: client.emojis.cache.size}, {name: "Total Members:", value: client.users.cache.size})
        .setFooter('Lou Bot Logging', 'https://static.wikia.nocookie.net/brawlstars/images/0/0b/Lou_Portrait.png/revision/latest/scale-to-width-down/340?cb=20201111223555')
    channel.send(A)
});

client.on("message", async (message) => {

    let prefix;
    let prefixes = await db.fetch(`${message.guild.id}.prefix`);
    if (prefixes == null) {
        prefix = "!";
    } else {
        prefix = prefixes;
    }
    const args = message.content.slice(prefix.length).trim().split(' ');
    if(args){
        if(args[0]){if(args[0].startsWith('<')&&args[0].length >= 3&&!message.mentions.channels.first()&&!message.mentions.members.first()&&!message.mentions.roles.first()){let x=message.content;let y=x.replace(/</g, '').replace(/>/g, '');const A = new discord.MessageEmbed().setTitle('Warning').setDescription(`Please do not necessary put \`<>\` or \`[]\` into a command, they have meanings.\n\`<Required Field>\` and \`[Optional Field]\`.\n\nExample:\n> **In the documentation:**\`\`\`!prefix set <PREFIX>\`\`\`**Usage:**\`\`\`!prefix set ?\`\`\` \n\nYour Command:\n\`\`\`${message.content}\`\`\`Auto Corrector:\`\`\`${y}\`\`\``);message.author.send(A)}}
        if(args[1]){if(args[1].startsWith('<')&&args[1].length >= 3&&!message.mentions.channels.first()&&!message.mentions.members.first()&&!message.mentions.roles.first()){let x=message.content;let y=x.replace(/</g, '').replace(/>/g, '');const A = new discord.MessageEmbed().setTitle('Warning').setDescription(`Please do not necessary put \`<>\` or \`[]\` into a command, they have meanings.\n\`<Required Field>\` and \`[Optional Field]\`.\n\nExample:\n> **In the documentation:**\`\`\`!prefix set <PREFIX>\`\`\`**Usage:**\`\`\`!prefix set ?\`\`\` \n\nYour Command:\n\`\`\`${message.content}\`\`\`Auto Corrector:\`\`\`${y}\`\`\``);message.author.send(A)}}
        if(args[2]){if(args[2].startsWith('<')&&args[2].length >= 3&&!message.mentions.channels.first()&&!message.mentions.members.first()&&!message.mentions.roles.first()){let x=message.content;let y=x.replace(/</g, '').replace(/>/g, '');const A = new discord.MessageEmbed().setTitle('Warning').setDescription(`Please do not necessary put \`<>\` or \`[]\` into a command, they have meanings.\n\`<Required Field>\` and \`[Optional Field]\`.\n\nExample:\n> **In the documentation:**\`\`\`!prefix set <PREFIX>\`\`\`**Usage:**\`\`\`!prefix set ?\`\`\` \n\nYour Command:\n\`\`\`${message.content}\`\`\`Auto Corrector:\`\`\`${y}\`\`\``);message.author.send(A)}}
        if(args[3]){if(args[3].startsWith('<')&&args[3].length >= 3&&!message.mentions.channels.first()&&!message.mentions.members.first()&&!message.mentions.roles.first()){let x=message.content;let y=x.replace(/</g, '').replace(/>/g, '');const A = new discord.MessageEmbed().setTitle('Warning').setDescription(`Please do not necessary put \`<>\` or \`[]\` into a command, they have meanings.\n\`<Required Field>\` and \`[Optional Field]\`.\n\nExample:\n> **In the documentation:**\`\`\`!prefix set <PREFIX>\`\`\`**Usage:**\`\`\`!prefix set ?\`\`\` \n\nYour Command:\n\`\`\`${message.content}\`\`\`Auto Corrector:\`\`\`${y}\`\`\``);message.author.send(A)}}
        if(args[4]){if(args[4].startsWith('<')&&args[4].length >= 3&&!message.mentions.channels.first()&&!message.mentions.members.first()&&!message.mentions.roles.first()){let x=message.content;let y=x.replace(/</g, '').replace(/>/g, '');const A = new discord.MessageEmbed().setTitle('Warning').setDescription(`Please do not necessary put \`<>\` or \`[]\` into a command, they have meanings.\n\`<Required Field>\` and \`[Optional Field]\`.\n\nExample:\n> **In the documentation:**\`\`\`!prefix set <PREFIX>\`\`\`**Usage:**\`\`\`!prefix set ?\`\`\` \n\nYour Command:\n\`\`\`${message.content}\`\`\`Auto Corrector:\`\`\`${y}\`\`\``);message.author.send(A)}}
        if(args[5]){if(args[5].startsWith('<')&&args[5].length >= 3&&!message.mentions.channels.first()&&!message.mentions.members.first()&&!message.mentions.roles.first()){let x=message.content;let y=x.replace(/</g, '').replace(/>/g, '');const A = new discord.MessageEmbed().setTitle('Warning').setDescription(`Please do not necessary put \`<>\` or \`[]\` into a command, they have meanings.\n\`<Required Field>\` and \`[Optional Field]\`.\n\nExample:\n> **In the documentation:**\`\`\`!prefix set <PREFIX>\`\`\`**Usage:**\`\`\`!prefix set ?\`\`\` \n\nYour Command:\n\`\`\`${message.content}\`\`\`Auto Corrector:\`\`\`${y}\`\`\``);message.author.send(A)}}
        if(args[6]){if(args[6].startsWith('<')&&args[6].length >= 3&&!message.mentions.channels.first()&&!message.mentions.members.first()&&!message.mentions.roles.first()){let x=message.content;let y=x.replace(/</g, '').replace(/>/g, '');const A = new discord.MessageEmbed().setTitle('Warning').setDescription(`Please do not necessary put \`<>\` or \`[]\` into a command, they have meanings.\n\`<Required Field>\` and \`[Optional Field]\`.\n\nExample:\n> **In the documentation:**\`\`\`!prefix set <PREFIX>\`\`\`**Usage:**\`\`\`!prefix set ?\`\`\` \n\nYour Command:\n\`\`\`${message.content}\`\`\`Auto Corrector:\`\`\`${y}\`\`\``);message.author.send(A)}}
    }
    if (message.mentions.users.has('790504650909417482')) {
        const A = new discord.MessageEmbed()
            .setTitle('Uncle Lou is here for you!')
            .setDescription(`Here are some informations that may help you out!`)
            .addFields(
                {name: "**bot & server stats:**", value: `*Here are some improtant infos you should know*`, inline: false},
                {name: "local prefix:", value: `\`${prefix}\``, inline: true},
                {name: "guilds:", value: `\`${client.guilds.cache.size}\``, inline: true},
                {name: "members:", value: `\`${client.users.cache.size}\``, inline: true},
                {name: "**Useful commands:**", value: `*Here are some useful commands you should know*`, inline: false},
                {name: `\`${prefix}help\``, value: "Get a list of all commands"},
                {name: `\`${prefix}support\``, value: "Get contact to the Lou HQ"}
            )
        message.channel.send(A)
    }

    if (message.author.bot) return;
    if (!message.guild) return;
    if (message.content.startsWith(prefix)) {

        if (!message.member)
            message.member = await message.guild.fetchMember(message);
            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const cmd = args.shift().toLowerCase();

        if (cmd.length === 0) return;
        let command = client.commands.get(cmd);
        if (!command) command = client.commands.get(client.aliases.get(cmd));
        if (command) command.run(client, message, args);
        if (command) {db.add(`${message.guild.id}.totalcommands`, 1)}
        if (command) {db.add(`${message.author.id}.totalcommands`, 1)}
    }
});


client.login(token);

//require('./dashboard/server')
