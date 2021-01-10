const discord = require('discord.js')
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Shababad:actx3819@cluster0.v4hao.mongodb.net/790504650909417482");

module.exports = {
    name: "quiz",
    description: "DESCRIPTION",
    category: "CATEGORY",
    usage: "",
    run: async (client, message, args) => {
        const quiz = require('../../quiz.json');
        const item = quiz[Math.floor(Math.random() * quiz.length)];
        const filter = response => {
            return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
        };

        message.channel.send(item.question).then(() => {
            message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                .then(collected => {
                    message.channel.send(`${collected.first().author} got the correct answer!`);
                    message.channel.send(item.question).then(() => {
                        message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                            .then(collected => {
                                message.channel.send(`${collected.first().author} got the correct answer!`);
                                message.channel.send(item.question).then(() => {
                                    message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                                        .then(collected => {
                                            message.channel.send(`${collected.first().author} got the correct answer!`);
                                            message.channel.send(item.question).then(() => {
                                                message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                                                    .then(collected => {
                                                        message.channel.send(`${collected.first().author} got the correct answer!`);
                                                    })
                                                    .catch(collected => {
                                                        message.channel.send('Looks like nobody got the answer this time.');
                                                    });
                                            });
                                        })
                                        .catch(collected => {
                                            message.channel.send('Looks like nobody got the answer this time.');
                                        });
                                });
                            })
                            .catch(collected => {
                                message.channel.send('Looks like nobody got the answer this time.');
                            });
                    });
                })
                .catch(collected => {
                    message.channel.send('Looks like nobody got the answer this time.');
                });
        });
    }
}