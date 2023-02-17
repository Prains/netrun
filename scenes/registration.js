const { Markup, Telegraf } = require("telegraf");

const utils = require("../utils/utils.js");

const professions = require("../utils/professionObjects.js").profession;

const jobExperience = require("../utils/professionObjects.js").jobExperienses;

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
    Markup.inlineKeyboard([
      [Markup.button.callback("О проекте", "bot_about")],
      [Markup.button.callback("Регистрация", `bot_registration`)],
    ])
  );

  bot.action(`bot_registration`, (ctx) => {
    utils.removeInlineKeyboard(ctx);
    ctx.reply(
      "Правила проекта",
      Markup.inlineKeyboard([
        [Markup.button.callback("Принять", `accept_${user.id}`)],
      ])
    );
  });

  bot.action(`accept_${user.id}`, (ctx) => {
    user.acceptRules = "accepted";
    utils.removeInlineKeyboard(ctx);
    ctx.reply(
      "вы кто",
      Markup.inlineKeyboard([
        [Markup.button.callback("Я исполнитель", "bot_registration_worker")],
        [Markup.button.callback("Я заказчик", "bot_registration_boss")],
      ])
    );
  });

  bot.action("bot_registration_worker", (ctx) => {
    utils.removeInlineKeyboard(ctx);
    user.role = "worker";
    ctx.reply(
      "выбор направления",
      Markup.inlineKeyboard(utils.createButtons(professions))
    );
  });

  bot.action("bot_registration_boss", (ctx) => {
    utils.removeInlineKeyboard(ctx);
    user.role = "boss";
    ctx.reply("хорошо");
  });

  professions.forEach((profession) => {
    bot.action(profession.module, (ctx) => {
      utils.removeInlineKeyboard(ctx);
      const buttonsData = utils.createButtons(profession.jobs);
      buttonsData.push([Markup.button.callback("Назад", `accept_${user.id}`)]);
      ctx.reply("направления", Markup.inlineKeyboard(buttonsData));
    });

    profession.jobs.forEach((job) => {
      bot.action(job.module, (ctx) => {
        utils.removeInlineKeyboard(ctx);
        ctx.reply(
          `Выбран ${job.name}. Правильно?`,
          Markup.inlineKeyboard([
            utils.confirmChosenOption(job.name, profession.module),
          ])
        );
      });

      bot.action(`chosen_${job.name}`, (ctx) => {
        user.profession = job.name;
        utils.removeInlineKeyboard(ctx);
        ctx.reply(
          "выберите опыт работы",
          Markup.inlineKeyboard(utils.createButtons(jobExperience))
        );
      });

      jobExperience.forEach((experience) => {
        bot.action(experience.module, (ctx) => {
          utils.removeInlineKeyboard(ctx);
          ctx.reply(
            `опыт ${experience.name}`,
            Markup.inlineKeyboard(
              utils.confirmChosenOption(experience.name, `chosen_${job.name}`)
            )
          );
        });

        bot.action(`chosen_${experience.name}`, (ctx) => {
          user.experience = experience.name;
          utils.removeInlineKeyboard(ctx);
          ctx.reply(`отправьте ссылку на свое портфолио`);
        });

        bot.hears(/https:/gm, (ctx) => {
          user.portfolio = ctx.message.text;
          ctx.reply(
            "отправить анкету на модерацию?",
            Markup.inlineKeyboard([
              Markup.button.callback("Отправить", "registration_finish"),
              Markup.button.callback("Отмена", "registration_aborted"),
            ])
          );
        });

        bot.hears(/http:/gm, (ctx) => {
          ctx.reply(
            "Вы отправляете ссылку с протоколом HTTP. убедитесь, что сайт, на который вы ссылаетесь, защищен протоколом SSL."
          );
        });
      });
    });
  });

  bot.action("registration_finish", (ctx) => {
    user.onModeration = true;
    db.setUserData(user);
    ctx.reply("Анкета успешно отправлена на проверку");
  });

  bot.action("registration_aborted", (ctx) => {
    user.onModeration = aborted;
    db.setUserData(user);
    ctx.reply("Регистрация прервана");
  });

  utils.handleButtonCallback(bot, "bot_about", "о проекте");
}

module.exports.registerAccount = registerAccount;
