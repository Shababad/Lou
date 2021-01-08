const discord = require('discord.js')
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Shababad:actx3819@cluster0.v4hao.mongodb.net/790504650909417482");
const {Client:BSClient} = require('brawlstars');
const client2 = new BSClient("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjVkNTYxM2VkLTRkNzctNDE1Mi1hNjcxLTNmNTQ4NDBjZGZmYyIsImlhdCI6MTYwODEwNzkyNiwic3ViIjoiZGV2ZWxvcGVyL2VjZjRkOThlLTgyOTMtZTQ1Yi1lOTAzLTJjZjk4NzI1ODNmZiIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiOTMuMjAyLjI0My4xNTMiXSwidHlwZSI6ImNsaWVudCJ9XX0.BqAqdCBnHv6vPNTZB7spDEO0omit1z6PbJwCFHEbc4shO7_4-crQmKoUyo85aUi8hGMB6dWDsrjEsUbGEL6ZuA", { 
    cache: true, // default is true
    cacheOptions: undefined // options for node-cache, default is undefined.
});

module.exports = {
    name: "eval",
    description: "eval a piece of script",
    category: "Owner",
    usage: "!eval <script>",
    run: async (client, message, args) => {
        if (message.author.id == "718870868025147515") {
            let x = args.slice(0).join(" ");
            eval(x).catch((err) => {message.channel.send(`\`\`\`${err}\`\`\``)})
            console.log(x)
        }
        else {
            return;
        }
    }
}