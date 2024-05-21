const success = {
  updated: 'Объявление поднято в поиске!',
  telegram: `Объявление в канале ${process.env.NEXT_PUBLIC_APP_NAME}!`,
  deleted: 'Объявление удалено!',
  archive: 'Объявление в архиве!',
};

const errors = {
  wentWrong: 'Что-то пошло не так!',
  noCase: 'Нет таких значений',
};

enum ItemModalText {
  edit = 'Редактировать объявление?',
  delete = 'Объявление не актуально?',
  telegram = 'Опубликовать в канале?',
}

export { success, errors, ItemModalText };
