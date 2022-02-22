// Carrega as variáveis de ambiente do .env
require("dotenv").config();

// Cliente do bot
const { Client, Intents } = require("discord.js");

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS
    ],
});

// Canal de sugestões
const SUGGESTIONS_CHANNEL = process.env.SUGGESTIONS_CHANNEL;

// Token do bot
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

client.on("ready", () => {
    console.log("Bot está online!");
});

client.on("messageCreate", async (message) => {
    if (message.channel.id === SUGGESTIONS_CHANNEL) {
        await message.react("👍");
        await message.react("👎");
    }
});

client.login(DISCORD_TOKEN);