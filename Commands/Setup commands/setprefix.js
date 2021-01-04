const discord = require('discord.js')
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Shababad:actx3819@cluster0.v4hao.mongodb.net/790504650909417482");

module.exports = {
    name: "setprefix",
    description: "Set the prefix of a server",
    category: "Setup Commands",
    usage: "!setprefix <prefix>",
    run: async (client, message, args) => {

        let prefix;
        let prefixes = await db.get(`${message.guild.id}.prefix`);
        if (prefixes == null) {
            prefix = "!";
        } else {
            prefix = prefixes;
        }

        // If no argument 0 provided, ex: "!setprefix"
        if (!args[0]) {
            // If the message.author does not have the required permission "Manage Guild"
            if (!message.member.hasPermission('MANAGE_GUILD')) {
                const A = new discord.MessageEmbed()
                    .setTitle('400 Bad Request')
                    .setDescription('You don\'t have the required permission "**Manage Guild**"')
                const SendA = await message.channel.send(A)
                .then(setTimeout(() => { SendA.delete() }, 10000))
            }
            // If the message.author has the required permission "Manage Guild"
            if (message.member.hasPermission('MANAGE_GUILD')) {
                const A = new discord.MessageEmbed()
                    .setTitle('411 Length Required')
                    .setDescription('No argument provided\n```!setprefix <prefix>```')
                const SendA = await message.channel.send(A)
                .then(setTimeout(() => { SendA.delete() }, 10000))
            }
        }

        // If argument 0 is provided, ex "!setprefix -"
        else if (args[0]) {
                
            // If the message.author does not have the required permission "Manage Guild"
            if (!message.member.hasPermission('MANAGE_GUILD')) {
                const A = new discord.MessageEmbed()
                    .setTitle('400 Bad Request')
                    .setDescription('You don\'t have the required permission "**Manage Guild**"')
                const SendA = await message.channel.send(A)
                .then(setTimeout(() => { SendA.delete() }, 10000))
            }
            // If the message.author has the required permission "Manage Guild"
            else if (message.member.hasPermission('MANAGE_GUILD')) {
                // If argument 0 is greater than or equals to 5, ex: "!setprefix !!!!!!"
                if (args[0].length >= 5) {
                    const A = new discord.MessageEmbed()
                        .setTitle('406 Not Acceptable')
                        .setDescription('Provided prefix too long, max. **4** characters!\nExample: ```!setprefix -```')
                    const SendA = await message.channel.send(A)
                    .then(setTimeout(() => { SendA.delete() }, 10000))
                }
                // If argument 0 is less than 5, ex: "!setprefix -"
                else if (args[0].length < 5) {

                    const A = new discord.MessageEmbed() // Confirmation Embed
                        .setTitle('Confirmation')
                        .setDescription(`Are you sure you want to change the prefix of ${message.guild.name} from \`${prefix}\` to \`${args[0]}\`?
                                        Type \`confirm\` to confirm or \`cancel\` to cancel the action`)
                        .setFooter('This action will automatically be canceled after 1 minute if no response')
                    const B = new discord.MessageEmbed() // Confirmed Embed
                        .setTitle('201 Created')
                        .setDescription(`Prefix in ${message.guild.name} has been changed from \`${prefix}\` to \`${args[0]}\``)
                    const C = new discord.MessageEmbed() // Canceled Embed
                        .setTitle('499 Canceled Request')
                        .setDescription('Action has been canceled')
                    const D = new discord.MessageEmbed() // Timeout Embed
                        .setTitle('408 Request Timeout')
                        .setDescription('You didn\'t make it in time... try again')
                    message.delete()
                    const SendA = await message.channel.send(A)
                    const filter = m => m.author.id === message.author.id
                    const collector = message.channel.createMessageCollector(filter, { max: 1, time: 60000 });

                    collector.on('collect',  async m => {
                        // If confirm
	                    if (m.content === "confirm") {
                            SendA.delete()
                            m.delete()
                            console.log(`Prefix in ${message.guild.name} has been changed from ${prefix} to ${args[0]}`)
                            const SendB = await message.channel.send(B)
                            .then(setTimeout(() => { SendB.delete() }, 10000))
                            db.set(`${message.guild.id}.prefix`, args[0])
                        }
                        // If Canceled
                        else if (m.content === "cancel") {
                            SendA.delete()
                            m.delete()
                            const SendC = await message.channel.send(C)
                            .then(setTimeout(() => { SendC.delete() }, 5000))
                        }
                        // If not confirm or Canceled collected
                        else {
                            m.delete()
                            const E = new discord.MessageEmbed()
                                .setTitle('406 Not Acceptable')
                                .setDescription(`\`${m.content}\` is not valid`)
                            const SendE = await message.channel.send(E)
                            .then(setTimeout(() => { SendE.delete() }, 5000))
                        }
                    });

                    collector.on('end', async collected => {
                        // If no message was collected
                        if (collected.size == 0) {
                            SendA.delete()
                            m.delete()
                            const SendD = await message.channel.send(D)
                            .then(setTimeout(() => { SendD.delete() }, 10000))
                        }
                        else {
                            return;
                        }
                    });
                }
            }
        }
    }
}