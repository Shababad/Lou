const discord = require('discord.js')
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Shababad:actx3819@cluster0.v4hao.mongodb.net/790504650909417482");
const {Client:BSClient} = require('brawlstars');
const client2 = new BSClient("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjUyZGEzMTg2LWE4M2MtNDMyMi05ODIyLTc5MjkyNmFlOTk4OCIsImlhdCI6MTYxMDQ0OTIyMywic3ViIjoiZGV2ZWxvcGVyL2VjZjRkOThlLTgyOTMtZTQ1Yi1lOTAzLTJjZjk4NzI1ODNmZiIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiODcuMTc3Ljc5LjkyIl0sInR5cGUiOiJjbGllbnQifV19.4ywl2BUAjFdMVPQQ5JiMa_8KsZ4GKyZrlQEtdB3XxA4sfAk3sxik24oSxLiYtR5hW6bd0Eeax8ed0kQU8UjlKQ", { 
    cache: true, // default is true
    cacheOptions: undefined // options for node-cache, default is undefined.
});

module.exports = {
    name: "bss",
    description: "DESCRIPTION",
    category: "CATEGORY",
    usage: "",
    run: async (client, message, args) => {
        const Player = client2.getPlayer(args[0].toUpperCase()).catch(err => message.channel.send('Player not found'))
        message.channel.send((await Player).name)
    }
}