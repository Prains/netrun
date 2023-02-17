const professions = [
  {
    name: "Программирование",
    module: "part_development",
    jobs: [
      {
        name: "1с Программирование",
        module: "profession_oneC",
      },
      {
        name: "Веб-разработка",
        module: "profession_webDev",
      },
      {
        name: "Геймдев-разработка",
        module: "profession_gameDev",
      },
    ],
  },
  {
    name: "Дизайн",
    module: "part_design",
    jobs: [
      {
        name: "Моушн-дизайн",
        module: "profession_motionDesigner",
      },
      {
        name: "3D - дизайн",
        module: "profession_threeDDesigner",
      },
      {
        name: "Графический дизайн",
        module: "profession_graphicDesigner",
      },
    ],
  },
  {
    name: "Работа с текстом",
    module: "part_text",
    jobs: [
      {
        name: "Копирайт",
        module: "profession_copyright",
      },
      {
        name: "СММ",
        module: "profession_smm",
      },
      {
        name: "Перевод",
        module: "profession_translator",
      },
    ],
  },
  {
    name: "Композиция музыки",
    module: "part_music",
    jobs: [{ name: "Композитор музыки", module: "profession_composer" }],
  },
];

const jobExperienses = [
  {
    name: "<1m",
    module: "experience_month",
  },
  {
    name: "<5m",
    module: "experience_five_month",
  },
  {
    name: "<1y",
    module: "experience_one_year",
  },
  {
    name: "<5y",
    module: "experience_five_years",
  },
];

module.exports.profession = professions;

module.exports.jobExperienses = jobExperienses;
