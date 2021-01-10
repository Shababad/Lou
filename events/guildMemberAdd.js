const discord = require('discord.js')
const Client = require('discord.js')
const client = new discord.Client()
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Shababad:actx3819@cluster0.v4hao.mongodb.net/790504650909417482");

module.exports = async (client, member) => {
    const nickname = member.user.username.split(' ')
    let p;let prefixes=await db.get(`${member.guild.id}.prefix`);if(prefixes==null){p='!';}else{p=prefixes;}
    const X = new discord.MessageEmbed()
        .setTitle('Welcome!')
        .setDescription(`Hello **${nickname[0]}**, welcome to **${member.guild.name}**! I am Lou, a new Discord bot made by **Shababad (a.k.a. King Lou)**.\nAs a bot, I really need your help finding some bugs in my commands.\nIf you can find any, make sure to use the command \`${p}support\` to report the bug you found.\nAfter your bug is confirmed, you and your server will recieve a **Bug Hunter Badge**!\nHope you will enjoy your stay in ${member.guild.name}`)
    member.send(X)
    const joinchannel = await db.get(`${member.guild.id}.joinchannel`)
    const JMTitles = await db.get(`${member.guild.id}.jm_title`)
    let JMTitle;if (JMTitles == null) {JMTitle = "A New Member!";} else {JMTitle = JMTitles;}
    const JMDescs = await db.get(`${member.guild.id}.jm_desc`)
    let JMDesc;if (JMDescs == null) {JMDesc = "Welcome {user} to {server.name}, hope you enjoy your stay!";} else {JMDesc = JMDescs;}
    const JMColors = await db.get(`${member.guild.id}.jm_color`)
    let JMColor;if (JMColors == null) {JMColor = "#8afff1";} else {JMColor = JMColors;}

    if (joinchannel == null) {
        return;
    }
    else {
        let channel = client.channels.cache.get(joinchannel)
        const JMTitleX = JMTitle.replace('{user}', member.user.username).replace('{user.name}', member.user.username).replace('{user.id}', member.user.id).replace('{user.tag}', member.user.tag).replace('{user.discriminator}', member.user.discriminator).replace('{server.members}', member.guild.memberCount).replace('{user.mention}', `<@${member.user.id}>`)
        const JMDescX = JMDesc.replace('{user}', member.user.username).replace('{user.name}', member.user.username).replace('{user.id}', member.user.id).replace('{user.tag}', member.user.tag).replace('{user.discriminator}', member.user.discriminator).replace('{server.members}', member.guild.memberCount).replace('{user.mention}', `<@${member.user.id}>`)
        if (JMTitle == "01010010" && JMDesc == "01010010") {
            return;
        }
        
        else {
            const A = new discord.MessageEmbed()
            if (JMTitle !== "01010010") {
                A.setTitle(JMTitleX)
            }
            if (JMDesc !== "01010010") {
                A.setDescription(JMDescX)
            }
            A.setColor(JMColor)
        }
            
        channel.send(A)
    }
}