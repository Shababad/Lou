const discord = require('discord.js')
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Shababad:actx3819@cluster0.v4hao.mongodb.net/790504650909417482");

module.exports = {
    name: "password",
    description: "DESCRIPTION",
    category: "CATEGORY",
    usage: "",
    run: async (client, message, args) => {
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        function generateString(length) {
            let result = ' ';
            const charactersLength = characters.length;
            for ( let i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
        
            return result;
        }
        if (args[0]) {
            const A = new discord.MessageEmbed()
                .setTitle('Password guesser')
                .setDescription(`Target: **${args[0]}**`)
                .addFields(
                    {name: 'guess 1.:', value: `**tjky1234**`},
                    {name: 'guess 2.:', value: `**Olps9284**`},
                    {name: 'guess 3.:', value: `**Open1688**`},
                )
                message.channel.send(A)
        }
    }
}