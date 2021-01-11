const discord = require('discord.js')
const Client = require('discord.js')
const { readdirSync } = require("fs");
const client = new discord.Client()
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Shababad:actx3819@cluster0.v4hao.mongodb.net/790504650909417482");
const ms = require('ms')


module.exports = {
    name: "bot",
    description: "See some bot stats",
    category: "Config Commands",
    usage: "!bot [stats/invite]",
    run: async (client, message, args) => {
        if (!args[0]) {
            const A = new discord.MessageEmbed()
                .setTitle('About Me')
                .setDescription(`I am a Chromatic Brawler who can be unlocked as a Brawl Pass reward at tier 30 from Season 4: Holiday Getaway, or from Brawl Boxes after reaching tier 30 in my featured season. I have below-average damage and health, but have support mechanics in my attack and Super. For my Main Attack I throw snow cones at my enemies which can stun them for 1 seconds if the frost meter on the enemy is filled. My Super creates a fairly large area of ice that slows down enemies if they try to make hard turns on the ice. My Gadget, Ice Block, makes me immune to all damage for 1 second with the payoff of me being unable to move or attack for the duration. My first Star Power, Supercool, makes my opponents have their frost meter fill when they are on my Super. My second Star Power, Hyperthermia, slows down enemy reload speed depending on how filled up their frost meter is.`)
                .setThumbnail('https://static.wikia.nocookie.net/brawlstars/images/6/60/Lou_Skin-Default.png/revision/latest/scale-to-width-down/1000?cb=20201113072202')
                .addFields(
                    {name: "Bot Creator:", value: "King Lou - Shababad 🧊#6751 (a.k.a. King Lou Shababad)"},
                    {name: "Alpha Testers:", value: "G-Toasty, Nomura"}
                )
            message.channel.send(A)
        }
        else if (args[0] == "stats") {
            const uptime = ms(client.uptime)
            const A = new discord.MessageEmbed()
                .setTitle('My Stats')
                .addFields(
                    {name: "Total Guilds:", value: `\`${client.guilds.cache.size}\``, inline: false},
                    {name: "Total Channels:", value: `\`${client.channels.cache.size}\``, inline: false},
                    {name: "Total Members:", value: `\`${client.users.cache.size}\``, inline: false},
                    {name: "Total Commands", value: client.commands.size},
                    {name: "uptime:", value: `\`${uptime}\``}
                )
            message.channel.send(A)
        }
    }
}