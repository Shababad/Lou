const discord = require('discord.js')
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Shababad:actx3819@cluster0.v4hao.mongodb.net/790504650909417482");

module.exports = {
    name: "g",
    description: "DESCRIPTION",
    category: "CATEGORY",
    usage: "",
    run: async (client, message, args) => {
        const filter = m => m.content.includes('test');
        const collector1 = message.channel.createMessageCollector(filter, { time: 100000, max: 1 });
        const SendMessage = await message.channel.send('Start 1')
        collector1.on('collect', m => {	        
            message.channel.send(`collected first: '${m.content}'`)
            message.channel.send(`Start 2`)
            collector1.stop()
        })            
        collector1.on('end', m => {
            const collector2 = message.channel.createMessageCollector(filter, { time: 100000, max: 1 });
            collector2.on('collect', m1 => {
                message.channel.send(`collected second: '${m1.content}'`)
            });
        })
    }
}