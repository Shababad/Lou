const discord = require('discord.js')
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Shababad:actx3819@cluster0.v4hao.mongodb.net/790504650909417482");
const {Client:BSClient} = require('brawlstars');
const client2 = new BSClient("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjVkNTYxM2VkLTRkNzctNDE1Mi1hNjcxLTNmNTQ4NDBjZGZmYyIsImlhdCI6MTYwODEwNzkyNiwic3ViIjoiZGV2ZWxvcGVyL2VjZjRkOThlLTgyOTMtZTQ1Yi1lOTAzLTJjZjk4NzI1ODNmZiIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiOTMuMjAyLjI0My4xNTMiXSwidHlwZSI6ImNsaWVudCJ9XX0.BqAqdCBnHv6vPNTZB7spDEO0omit1z6PbJwCFHEbc4shO7_4-crQmKoUyo85aUi8hGMB6dWDsrjEsUbGEL6ZuA", { 
    cache: true, // default is true
    cacheOptions: undefined // options for node-cache, default is undefined.
});

module.exports = {
    name: "stats",
    description: "DESCRIPTION",
    category: "CATEGORY",
    usage: "",
    run: async (client, message, args) => {
        const player = await client2.getPlayer('#8R8P8QOLP');
        let x = 0;
        let latert = 0;
        player.brawlers.forEach(b => {
            if (b.trophies >= 501 && b.trophies <= 524) {
                x += 20;
                latert += 500;
            }
            else if (b.trophies >= 525 && b.trophies <= 549) {
                x += 50;
                latert += 524;
            }
            else if (b.trophies >= 550 && b.trophies <= 574) {
                x += 70;
                latert += 549;
            }
            else if (b.trophies >= 575 && b.trophies <= 599) {
                x += 80;
                latert += 574;
            }
            else if (b.trophies >= 600 && b.trophies <= 624) {
                x += 90;
                latert += 599;
            }
            else if (b.trophies >= 625 && b.trophies <= 649) {
                x += 100;
                latert += 624;
            }
            else if (b.trophies >= 650 && b.trophies <= 674) {
                x += 110;
                latert += 649;
            }
            else if (b.trophies >= 675 && b.trophies <= 699) {
                x += 120;
                latert += 674;
            }
            else if (b.trophies >= 700 && b.trophies <= 724) {
                x += 130;
                latert += 699;
            }
            else if (b.trophies >= 725 && b.trophies <= 749) {
                x += 140;
                latert += 724;
            }
            else if (b.trophies >= 750 && b.trophies <= 774) {
                x += 150;
                latert += 749;
            }
            else if (b.trophies >= 775 && b.trophies <= 799) {
                x += 160;
                latert += 774;
            }
            else if (b.trophies >= 800 && b.trophies <= 824) {
                x += 170;
                latert += 899;
            }
            else if (b.trophies >= 825 && b.trophies <= 849) {
                x += 180;
                latert += 924;
            }
            else if (b.trophies >= 850 && b.trophies <= 874) {
                x += 190;
                latert += 949;
            }
            else if (b.trophies >= 875 && b.trophies <= 899) {
                x += 200;
                latert += 974;
            }
            else if (b.trophies >= 900 && b.trophies <= 924) {
                x += 210;
                latert += 885;
            }
            else if (b.trophies >= 925 && b.trophies <= 949) {
                x += 220;
                latert += 900;
            }
            else if (b.trophies >= 950 && b.trophies <= 974) {
                x += 230;
                latert += 920;
            }
            else if (b.trophies >= 975 && b.trophies <= 999) {
                x += 240;
                latert += 940;
            }
            else if (b.trophies >= 1000 && b.trophies <= 1049) {
                x += 250;
                latert += 960;
            }
            else if (b.trophies >= 1050 && b.trophies <= 1099) {
                x += 260;
                latert += 980;
            }
            else if (b.trophies >= 1100 && b.trophies <= 1149) {
                x += 270;
                latert += 1000;
            }
            else if (b.trophies >= 1150 && b.trophies <= 1199) {
                x += 280;
                latert += 1020;
            }
            else if (b.trophies >= 1200 && b.trophies <= 1249) {
                x += 290;
                latert += 1040;
            }
            else if (b.trophies >= 1250 && b.trophies <= 1299) {
                x += 300;
                latert += 1060;
            }
            else if (b.trophies >= 1300 && b.trophies <= 1349) {
                x += 310;
                latert += 1080;
            }
            else if (b.trophies >= 1350 && b.trophies <= 1399) {
                x += 320;
                latert += 1100;
            }
            else if (b.trophies >= 1400 && b.trophies <= 1449) {
                x += 330;
                latert += 1120;
            }
            else if (b.trophies >= 1450 && b.trophies <= 1499) {
                x += 340;
                latert += 1140;
            }
            else if (b.trophies > 1500 ) {
                x += 350;
                latert += 1150;
            }
        })
        message.channel.send(`Season end StarPoints: ${x}\nSeason end Trophies: ${latert}`)
    }
}