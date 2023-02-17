const { Telegraf } = require("telegraf");
require("dotenv").config();
const registerAccount = require("./scenes/registration.js");
const bot = new Telegraf(process.env.BOT_TOKEN);
const Database = require("./utils/Database.js");

const Db = new Database.Database("./databases");

bot.start(async (ctx) => {
  registerAccount.registerAccount(bot, ctx, Db);
});

bot.help((ctx) => {
  ctx.reply("бот для поиска исполнителей или заказчиков");
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
