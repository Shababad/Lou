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
const client = new discord.Client({
    partials: ['MESSAGE', 'REACTION'],
});
const { token, version } = require("./config.json");
const fs = require("fs");
const request = require('request')
const {Client:BSClient} = require('brawlstars');
const capitalize = require('chumnend-capitalize');
const ascii = require("ascii-table");
const { Database } = require("quickmongo");
const ms = require("ms");
const db = new Database("mongodb+srv://Shababad:actx3819@cluster0.v4hao.mongodb.net/790504650909417482");
const pingedRecently = new Set();
const talkedRecently = new Set();
const warnedRecently = new Set();
const cooldowns = new discord.Collection();


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
    
    let stats = new ascii("Bot Stats")
        stats.setHeading("Value Name", "Value")
        stats.addRow("Guilds", client.guilds.cache.size)
        stats.addRow("Members", client.users.cache.size)
        stats.addRow("Version", version)

    console.log(stats.toString())
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

    /* PREFIX */ let prefixes = await db.fetch(`${message.guild.id}.prefix`); let p = prefixes || "!";
    /* ARGS */ const args = message.content.slice(p.length).trim().split(/ +/g);

    if (message.author.id == '790504650909417482') return;
    if (message.author.bot) return;
    if (!message.guild) return;
    if (message.author.id === client.user.id) return;
    if (message.content.startsWith(p)) {

        if (!message.member)
            message.member = await message.guild.members.fetch(message);
            const cmd = args.shift().toLowerCase();

        if (cmd.length === 0) return;
        const command = client.commands.get(cmd) || client.commands.find(c => c.aliases && c.aliases.includes(cmd));
        if (command) {
            if (message.guild.id !== '761346495194202132' && message.guild.id !== '740307260823044139') {
                if (warnedRecently.has(message.author.id)) {
                    message.delete();
                    return;
                } else {
                    message.delete();
                    warnedRecently.add(message.author.id);
                    setTimeout(() => {
                        warnedRecently.delete(message.author.id);
                    }, 60000);
                    const maintain = new discord.MessageEmbed().setTitle('Closed').setDescription('This bot is currently not public yet, please wait until the bot owner starts the bot! :pray:')
                    const SendMaintain = await message.channel.send(maintain);
                    setTimeout(() => {SendMaintain.delete()}, 5000)

                    return;
                }
            }
        }

        /*---------- COOLDOWN SET ----------*/
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new discord.Collection());
        }
        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 1) * 1000;
        
        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                const SendCooldownMessage = await message.reply(`please wait **${ms((timeLeft.toFixed(1)) * 1000)}** more second(s) before reusing the \`${command.name}\` command again!`);setTimeout(() => {SendCooldownMessage.delete()}, 5000)
                return message.delete();
            }
        }
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        const TestOnly = (command.testOnly || false);
        const TestServers = ['761346495194202132', '740307260823044139']
        if (TestOnly == true && message.channel.id.includes(TestServers)) {
            const maintain = new discord.MessageEmbed().setTitle('Closed').setDescription('This bot is currently not public yet, please wait until the bot owner starts the bot! :pray:')
            return message.channel.send(maintain);
        }

        if (command.permissions) {
            const authorPerms = message.channel.permissionsFor(message.author);
            if (!authorPerms || !authorPerms.has(command.permissions)) {
                const SendErrorMessage = await message.reply(`you do not have the required permission(s) "**${command.permissions.toString().join(", ").toLowerCase()}**" to use this command`);
                return setTimeout(() => {SendErrorMessage.delete()}, 5000);

            }
        }


        if (!command) return;
        if (command) command.run(client, message, args, p);



    }

    const sniff = ['*Sniffs~*, someone said my name?', ':eyes:, someone talked about me?', ':eyes:', 'Sleeping... No time to talk... :sleeping: ']
    var randomSniff = Math.floor(Math.random()*sniff.length) + 1;
    if (message.content.includes('lou')||message.content.includes('Lou')) {const SendHuh = await message.channel.send(sniff[randomSniff]);setTimeout(() => {SendHuh.delete()}, 3000)}
    if (args) {
        args.forEach(a => {
            if (a.startsWith('<') && a.endsWith('>') && a.length >=3 && !message.mentions.size && !/<:(a-zA-Z0-9_-):(\d)>/) {
                message.channel.send(message.replace(/</gi, '').replace(/>/gi, ''))
            }
        })
    }

    /*---------- PING FUNCTION ----------*/
    if (message.mentions.users.has('790504650909417482')) {
        if (pingedRecently.has(message.author.id)) {
            return;
        } else {
            const A = new discord.MessageEmbed()
                .setTitle('Uncle Lou is here for you!')
                .setDescription(`Here are some informations that may help you out!`)
                .addFields(
                    {name: "**bot & server stats:**", value: `*Here is some information that may help you out*`, inline: false},
                    {name: "local prefix:", value: `\`${p}\``, inline: true},
                    {name: "guilds:", value: `\`${client.guilds.cache.size}\``, inline: true},
                    {name: "members:", value: `\`${client.users.cache.size}\``, inline: true},
                    {name: "**Useful commands:**", value: `*Here are some useful commands you should know*`, inline: false},
                    {name: `\`${p}help\``, value: "Get a list of all commands"},
                    {name: `\`${p}support\``, value: "Get contact to the Lou HQ"}
                );
            message.delete();
            const Send001 = await message.channel.send(A);
            setTimeout(() => {Send001.delete()}, 5000)
            

            // Adds the user to the set so that they can't talk for a minute
            pingedRecently.add(message.author.id);
            setTimeout(() => {
            // Removes the user from the set after a minute
            pingedRecently.delete(message.author.id);
            }, 30000);
        }
    }
});

client.login(token);

//require('./dashboard/server')
