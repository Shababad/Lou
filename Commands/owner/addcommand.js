const discord = require('discord.js')
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Shababad:actx3819@cluster0.v4hao.mongodb.net/790504650909417482");
var fs = require('fs');

module.exports = {
    name: "addcommand",
    description: "DESCRIPTION",
    category: "CATEGORY",
    usage: "",
    run: async (client, message, args) => {
        let x = args.slice(1).join(" ")
        fs.writeFile(args[0], x, function (err) {
            if (err) throw err;
            console.log('File is created successfully.');
        });
        var oldPath = `C:/Users/abiel/Desktop/Lou/${args[0]}`
        var newPath = `C:/Users/abiel/Desktop/Lou/Commands/owner/${args[0]}`
        
        fs.rename(oldPath, newPath, function (err) {
          if (err) throw err
          console.log('Successfully renamed - AKA moved!')
        });
        const Send = await message.channel.send(`Creating file ${args[0]}`)
        setTimeout(() => { Send.edit('Restarting bot...') }, 5000)
            .then(msg => client.destroy())
            .then(() => client.login('NzkwNTA0NjUwOTA5NDE3NDgy.X-Bk0w.r43EtKeTszoAyNx9SabzyqnpDkM'));
    }
}