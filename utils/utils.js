const { Markup } = require("telegraf");

function handleButtonCallback(bot, buttonId, buttonText) {
  bot.action(buttonId, async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.reply(buttonText);
  });
}

function removeInlineKeyboard(ctx) {
  ctx.answerCbQuery();
  ctx.editMessageReplyMarkup();
}

function createButtons(data) {
  const buttonsData = [];
  for (let i = 0; i < data.length; i++) {
    buttonsData.push([Markup.button.callback(data[i].name, data[i].module)]);
  }
  return buttonsData;
}

function confirmChosenOption(name, back) {
  return [
    Markup.button.callback("Подтвердить", `chosen_${name}`),
    Markup.button.callback("Назад", back),
  ];
}

module.exports.handleButtonCallback = handleButtonCallback;

module.exports.removeInlineKeyboard = removeInlineKeyboard;

module.exports.createButtons = createButtons;

module.exports.confirmChosenOption = confirmChosenOption;
