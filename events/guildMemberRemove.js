const discord = require('discord.js')
const Client = require('discord.js')
const client = new discord.Client()
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Shababad:actx3819@cluster0.v4hao.mongodb.net/790504650909417482");

module.exports = async (client, member) => {
    const leavechannel = await db.get(`${member.guild.id}.leavechannel`)
    const lMTitles = await db.get(`${member.guild.id}.lm_title`)
    let lMTitle;if (lMTitles == null) {lMTitle = "A Member left";} else {lMTitle = lMTitles;}
    const lMDescs = await db.get(`${member.guild.id}.lm_desc`)
    let lMDesc;if (lMDescs == null) {lMDesc = "{user} just left the server, hope you didn't have too much problem here :(";} else {lMDesc = lMDescs;}
    const lMColors = await db.get(`${member.guild.id}.lm_color`)
    let lMColor;if (lMColors == null) {lMColor = "#8afff1";} else {lMColor = lMColors;}
    let p;let prefixes=await db.get(`${member.guild.id}.prefix`);if(prefixes==null){p='!';}else{p=prefixes;}

    if (leavechannel == null) {
        return;
    }
    else {
        let channel = client.channels.cache.get(leavechannel)
        const lMTitleX = lMTitle.replace('{user}', member.user.username).replace('{user.name}', member.user.username).replace('{user.id}', member.user.id).replace('{user.tag}', member.user.tag).replace('{user.discriminator}', member.user.discriminator).replace('{server.members}', member.guild.memberCount).replace('{user.mention}', `<@${member.user.id}>`)
        const lMDescX = lMDesc.replace('{user}', member.user.username).replace('{user.name}', member.user.username).replace('{user.id}', member.user.id).replace('{user.tag}', member.user.tag).replace('{user.discriminator}', member.user.discriminator).replace('{server.members}', member.guild.memberCount).replace('{user.mention}', `<@${member.user.id}>`)
        const A = new discord.MessageEmbed()
            .setTitle(lMTitleX)
            .setDescription(lMDescX)
            .setColor(lMColor)
        channel.send(A)
    }
}