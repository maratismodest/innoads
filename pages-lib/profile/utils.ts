import { messages } from '@/utils/messages';
import { TelegramUser } from 'telegram-login-button';

const userTemplate: TelegramUser = JSON.parse(process.env.NEXT_PUBLIC_TELEGRAM_USER);
const ERROR_ALIAS_MESSAGE = 'Добавьте алиас у себя в аккаунте!';
const ERROR_TOKEN_MESSAGE = messages.somethingWentWrong + ': перезагрузите страницу!';

export { userTemplate, ERROR_ALIAS_MESSAGE, ERROR_TOKEN_MESSAGE };
