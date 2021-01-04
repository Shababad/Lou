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
                .setDescription(`I am a Chromatic Brawler that can be unlocked as a Brawl Pass reward at Tier 30 from Season 4: Holiday Getaway or from Brawl Boxes after reaching Tier 30 in his featured season. I have below-average damage and health but have support mechanics in both of my attack and Super. I throw damaging snow cones at opponents, which apply Frost that stun my enemies when completely filled. My Super creates a fairly large area of ice that slows down enemies and makes it harder to maneuver. My Gadget, Ice Block, makes me immune to all damage for a brief amount of time. My first Star Power, Supercool, makes opponent's Frost meter fill up while they are in my Super area of effect. My second Star Power, Hypothermia, decreases my opponents' reload speed depending on their Frost.`)
                .setThumbnail('https://static.wikia.nocookie.net/brawlstars/images/6/60/Lou_Skin-Default.png/revision/latest/scale-to-width-down/1000?cb=20201113072202')
                .addFields(
                    {name: "Bot Creator:", value: "Shababad 🧊#6751 (a.k.a. King Lou Shababad)"}
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