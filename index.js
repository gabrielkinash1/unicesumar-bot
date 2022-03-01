// Carrega as variáveis de ambiente do .env
require("dotenv").config();

// Cliente do bot
const { Client, Intents, MessageEmbed } = require("discord.js");
const ClassesData = require("./classes.json");

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS
    ],
});

const SUGGESTIONS_CHANNEL = process.env.SUGGESTIONS_CHANNEL;
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const PING_CHANNEL = process.env.PING_CHANNEL;

client.on("ready", (message) => {
    const date = new Date();
    const embed = new MessageEmbed();

    console.log("Bot está online!");

    const isTodayAclassDay = Object.keys(ClassesData.conflitos).find(key => key === `${date.getDate()}/${date.getMonth() + 1}`);
    if (isTodayAclassDay === `${date.getDate()}/${date.getMonth() + 1}`) {
        return message.channels.cache.get(PING_CHANNEL).send({
            embeds: [
                embed
                    .setColor("BLURPLE")
                    .setTitle("Links para as aulas de hoje")
                    .addField("Administração de conflitos e relacionamentos: ", ClassesData.conflitos[isTodayAclassDay])
                    .addField("Fundamentos e Arquitetura de Computadores: ", ClassesData.arquitetura[isTodayAclassDay])
            ]
        })
    }
});

client.on("messageCreate", async (message) => {
    if(message.author.bot) return;

    if (message.channel.id === SUGGESTIONS_CHANNEL) {
        await message.react("👍");
        await message.react("👎");
    }
});
client.login(DISCORD_TOKEN);