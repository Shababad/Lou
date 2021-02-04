const discord = require('discord.js')
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Shababad:actx3819@cluster0.v4hao.mongodb.net/790504650909417482");
const ms = require('ms')

module.exports = {
    name: "help",
    description: "Get informations about commands",
    category: "Help",
    usage: "help [commandname]",
    testOnly: true,
    aliases: ['h'],
    cooldown: 5,
    example: 'help joinmessage',
    run: async (client, message, args, p) => {

        if (!args[0]) {
            message.delete();
            const A = new discord.MessageEmbed()
                .setTitle('Need some help?')
                .setDescription(`Here are some easy commands **You** can use.\nIf you need support from the official Lou Support team, use the command \`${p}support\`\n\`<Required Field>\`, \`[Optional Field]\``)
                .addFields(
                    {name: 'Help', value: '`help`, `help [command name]` `support`'},
                    {name: 'Moderators', value: '`joinchannel`, `joinmessage`, `leavechannel`, `leavemessage`, `prefix`, `settings`, `verifysetup`'}
                )
            const Send0001 = await message.channel.send(A);
            setTimeout(() => {Send0001.delete()}, 10000)
        } else if (args) {
            const cmd = args.shift().toLowerCase();
            const command = client.commands.get(cmd) || client.commands.find(c => c.aliases && c.aliases.includes(cmd));
            if (command) {
                const Name = command.name.charAt(0).toUpperCase() + command.name.slice(1)
                const A = new discord.MessageEmbed()
                    .setTitle(`${Name} Command`)
                    if (command.description) A.setDescription(command.description);
                    if (command.category) A.addField('Catergory:', `\`${command.category} Commands\``, false);
                    if (command.aliases) A.addField('Aliases:', `\`${command.aliases.join('`, `')}\``, false);
                    if (command.cooldown) A.addField('Cooldown:', `\`${ms((command.cooldown) * 1000)}\``, false)
                    if (command.usage) A.addField('Usage:', `\`\`\`${p}${command.usage}\`\`\``)
                    if (command.example) A.addField('Example:', `\`\`\`${p}${command.example}\`\`\``)
                message.channel.send(A)
            } 
            else return message.channel.send(`No command with the name **${args[0]}** found!`);
        }
    }
}