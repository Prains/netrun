const fs = require("fs");
const { Telegraf, Markup, Extra } = require("telegraf");
require("dotenv").config();
const utils = require("./utils/utils.js");
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

