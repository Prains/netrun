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

module.exports.handleButtonCallback = handleButtonCallback;

module.exports.removeInlineKeyboard = removeInlineKeyboard;
