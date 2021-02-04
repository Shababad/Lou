const discord = require('discord.js')
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Shababad:actx3819@cluster0.v4hao.mongodb.net/790504650909417482");

module.exports = {
    name: "prefix",
    description: "Set a custom prefix for the server",
    category: "Setup Commands",
    usage: "prefix set <prefix>",
    example: "prefix set ?",
    run: async (client, message, args) => {

        let p;
        let prefixes = await db.get(`${message.guild.id}.prefix`);
        if (prefixes == null) {
            p = "!";
        } else {
            p = prefixes;
        }
        if (!message.member.hasPermission('MANAGE_CHANNELS')) {
            const A = new discord.MessageEmbed()
                .setTitle('400 Bad Request')
                .setDescription('You don\'t have the required permission to use this command')
            message.delete()
            const SendA = await message.channel.send(A)
            .then(setTimeout(() => { SendA.delete() }, 10000))
        }
        else {
            if (!args[0]) {
                const A = new discord.MessageEmbed()
                    .setTitle('Prefix')
                    .setDescription(`The current prefix in ${message.guild.name} is **${p}**\n\`\`\`${p}prefix set <prefix>\`\`\``)
                message.delete()
                const SendA = await message.channel.send(A)
                .then(setTimeout(() => { SendA.delete() }, 10000))
            }
            else if (args[0] == "set") {
            // If no argument 0 provided, ex: "!setprefix"
                if (!args[1]) {
                    // If the message.author has the required permission "Manage Guild"
                    const A = new discord.MessageEmbed()
                        .setTitle('411 Length Required')
                        .setDescription(`No argument provided\n\`\`\`${p}prefix set <prefix>\`\`\``)
                    const SendA = await message.channel.send(A)
                    .then(setTimeout(() => { SendA.delete() }, 10000))
                }

                // If argument 0 is provided, ex "!setprefix -"
                else if (args[1]) {
                    if (args[1].length >= 5) {
                        const A = new discord.MessageEmbed()
                            .setTitle('406 Not Acceptable')
                            .setDescription(`Provided prefix too long, max. **4** characters!\nExample: \`\`\`!prefix set -\`\`\``)
                        const SendA = await message.channel.send(A)
                        .then(setTimeout(() => { SendA.delete() }, 10000))
                    }
                    // If argument 0 is less than 5, ex: "!setprefix -"
                    else if (args[1].length < 5) {

                        const A = new discord.MessageEmbed() // Confirmation Embed
                            .setTitle('Confirmation')
                            .setDescription(`Are you sure you want to change the prefix of ${message.guild.name} from \`${p}\` to \`${args[1]}\`?
                                            Type \`confirm\` to confirm or \`cancel\` to cancel the action`)
                            .setFooter('This action will automatically be canceled after 1 minute if no response')
                        const B = new discord.MessageEmbed() // Confirmed Embed
                            .setTitle('201 Created')
                            .setDescription(`Prefix in ${message.guild.name} has been changed from \`${p}\` to \`${args[1]}\``)
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
                                console.log(`Prefix in ${message.guild.name} has been changed from ${p} to ${args[1]}`)
                                const SendB = await message.channel.send(B)
                                .then(setTimeout(() => { SendB.delete() }, 10000))
                                db.set(`${message.guild.id}.prefix`, args[1])
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
}