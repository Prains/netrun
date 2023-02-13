const { Markup, Extra } = require("telegraf");

const utils = require("../utils/utils.js");

async function registerAccount(bot, ctx, db) {
  let registrationDate = new Date();

  const user = {
    name: ctx.from.first_name,
    lastName: ctx.from.last_name,
    id: ctx.update.message.from.id,
    registrationDate: registrationDate,
  };

  await ctx.reply(
    `${user.name}, id: ${user.id}`,
    Extra.markup(
      Markup.inlineKeyboard([
        [Markup.callbackButton("О проекте", "bot_about")],
        [Markup.callbackButton("Регистрация", `bot_registration`)],
      ])
    )
  );

  bot.action(`bot_registration`, (ctx) => {
    utils.removeInlineKeyboard(ctx);
    ctx.reply(
      "Правила проекта",
      Extra.markup(
        Markup.inlineKeyboard([
          [Markup.callbackButton("Принять", `accept_${user.id}`)],
        ])
      )
    );
  });

  bot.action(`accept_${user.id}`, (ctx) => {
    user.acceptRules = "accepted";
    utils.removeInlineKeyboard(ctx);
    ctx.reply(
      "выбор направления",
      Extra.markup(
        Markup.inlineKeyboard([
          [Markup.callbackButton("Направление 1", `specify1_${user.id}`)],
          [Markup.callbackButton("Направление 2", `specify2_${user.id}`)],
          [Markup.callbackButton("Направление 3", `specify3_${user.id}`)],
          [Markup.callbackButton("Направление 4", `specify4_${user.id}`)],
        ])
      )
    );

    for (let i = 1; i < 5; i++) {
      bot.action(`specify${i}_${user.id}`, (ctx) => {
        user.profession = `specify${i}`;
        utils.removeInlineKeyboard(ctx);
        db.setUserData(user);
        ctx.reply(
          "выберите опыт работы",
          Extra.markup(
            Markup.inlineKeyboard([
              [Markup.callbackButton("<1м", `experience1_${user.id}`)],
              [Markup.callbackButton("<5м", `experience2_${user.id}`)],
              [Markup.callbackButton("<1г", `experience3_${user.id}`)],
              [Markup.callbackButton("<3г", `experience4_${user.id}`)],
            ])
          )
        );
      });
    }
  });

  utils.handleButtonCallback(bot, "bot_about", "о проекте");
}

module.exports.registerAccount = registerAccount;
