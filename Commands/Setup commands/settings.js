const discord = require('discord.js')
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Shababad:actx3819@cluster0.v4hao.mongodb.net/790504650909417482");

module.exports = {
    name: "settings",
    description: "View the settings of this server",
    category: "Help Command",
    usage: "settings",
    example: "settings",
    run: async (client, message, args) => {
        // Database Promises
        let prefix = await db.get(`${message.guild.id}.prefix`)
        let joinchannels = await db.get(`${message.guild.id}.joinchannel`)
        let leavechannels = await db.get(`${message.guild.id}.leavechannel`)
        let vchannels = await db.get(`${message.guild.id}.vchannel`)
        let vrole1s = await db.get(`${message.guild.id}.vrole1`)
        let vrole2s = await db.get(`${message.guild.id}.vrole2`)

        // If Statements
        let joinchannel;
        if (joinchannels == null) {
            joinchannel = "Disabled"
        } else if (joinchannels !== null) {
            joinchannel = `<#${joinchannels}>`
        }
        let leavechannel;
        if (leavechannels == null) {
            leavechannel = "Disabled"
        } else if (leavechannels !== null) {
            leavechannel = `<#${leavechannels}>`
        }
        let vchannel;
        if (vchannels == null) {
            vchannel = "Disabled"
        } else if (vchannels !== null) {
            vchannel = `<#${vchannels}>`
        }
        let vrole1;
        if (vrole1s == null) {
            vrole1 = "None"
        } else if (vrole1s !== null) {
            vrole1 = `<@&${vrole1s}>`
        }
        let vrole2;
        if (vrole2s == null) {
            vrole2 = "None"
        } else if (vrole2s !== null) {
            vrole2 = `<@&${vrole2s}>`
        }

        const A = new discord.MessageEmbed()
            .setTitle(`Settings in ${message.guild.name}`)
            .setThumbnail(message.guild.iconURL())
            .addFields(
                {name: "Prefix", value: `\`${prefix}\``, inline: true},
                {name: "Join Channel", value: `${joinchannel}`, inline: true},
                {name: "Leave Channel", value: `${leavechannel}`, inline: true},
                {name: "Verify Channel", value: `${vchannel}`, inline: true},
                {name: "Unverified Role", value: `${vrole1}`, inline: true},
                {name: "Verified Role", value: `${vrole2}`, inline: true}
            )
        const SendA = await message.channel.send(A)
    }
}