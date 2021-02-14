const discord = require('discord.js')
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Shababad:actx3819@cluster0.v4hao.mongodb.net/790504650909417482");

module.exports = {
    name: ".",
    description: "DESCRIPTION",
    category: "CATEGORY",
    usage: "",
    run: async (client, message, p) => {
        message.delete()
        const x = message.content.replace(/\n/g, " ").replace("    ", " ").replace(/9-10/g, "9")
        const args = x.slice(3).trim().split(/ +/g);
        message.channel.send(`
            \`\`\`json
"${args[36]}": {
    "p${args[0]}": {"health": "${args[1]}", "damage": "${args[2]}", "superdamage": "${args[3]}"},
    "p${args[0+4]}": {"health": "${args[1+4]}", "damage": "${args[2+4]}", "superdamage": "${args[3+4]}"},
    "p${args[0+8]}": {"health": "${args[1+8]}", "damage": "${args[2+8]}", "superdamage": "${args[3+8]}"},
    "p${args[0+12]}": {"health": "${args[1+12]}", "damage": "${args[2+12]}", "superdamage": "${args[3+12]}"},
    "p${args[0+16]}": {"health": "${args[1+16]}", "damage": "${args[2+16]}", "superdamage": "${args[3+16]}"},
    "p${args[0+20]}": {"health": "${args[1+20]}", "damage": "${args[2+20]}", "superdamage": "${args[3+20]}"},
    "p${args[0+24]}": {"health": "${args[1+24]}", "damage": "${args[2+24]}", "superdamage": "${args[3+24]}"},
    "p${args[0+28]}": {"health": "${args[1+28]}", "damage": "${args[2+28]}", "superdamage": "${args[3+28]}"},
    "p${args[0+32]}": {"health": "${args[1+32]}", "damage": "${args[2+32]}", "superdamage": "${args[3+32]}"}
},\`\`\`
        `)
    }
}

/* 
Nita 
Jessie
Dyna
Emz
*/