const discord = require('discord.js')
const Client = require('discord.js')
const client = new discord.Client()
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Shababad:actx3819@cluster0.v4hao.mongodb.net/790504650909417482");

module.exports = async (client, member) => {
    const joinchannel = await db.get(`${member.guild.id}.joinchannel`)
    const JMTitles = await db.get(`${member.guild.id}.jm_title`)
    let JMTitle;if (JMTitles == null) {JMTitle = "A New Member!";} else {JMTitle = JMTitles;}
    const JMDescs = await db.get(`${member.guild.id}.jm_desc`)
    let JMDesc;if (JMDescs == null) {JMDesc = "Welcome {user} to {server.name}, hope you enjoy your stay!";} else {JMDesc = JMDescs;}
    const JMColors = await db.get(`${member.guild.id}.jm_color`)
    let JMColor;if (JMColors == null) {JMColor = "#8afff1";} else {JMColor = JMColors;}
    let p;let prefixes=await db.get(`${member.guild.id}.prefix`);if(prefixes==null){p='!';}else{p=prefixes;}

    if (joinchannel == null) {
        return;
    }
    else {
        let channel = client.channels.cache.get(joinchannel)
        const JMTitleX = JMTitle.replace('{user}', member.user.username).replace('{user.name}', member.user.username).replace('{user.id}', member.user.id).replace('{user.tag}', member.user.tag).replace('{user.discriminator}', member.user.discriminator).replace('{server.members}', member.guild.memberCount).replace('{user.mention}', `<@${member.user.id}>`)
        const JMDescX = JMDesc.replace('{user}', member.user.username).replace('{user.name}', member.user.username).replace('{user.id}', member.user.id).replace('{user.tag}', member.user.tag).replace('{user.discriminator}', member.user.discriminator).replace('{server.members}', member.guild.memberCount).replace('{user.mention}', `<@${member.user.id}>`)
        const A = new discord.MessageEmbed()
            .setTitle(JMTitleX)
            .setDescription(JMDescX)
            .setColor(JMColor)
        channel.send(A)
    }
}