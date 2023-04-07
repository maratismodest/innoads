export interface TelegramUser {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  photo_url: string;
  auth_date: number;
  hash: string;
}

export type UserDTO = {
  readonly id: number,
  readonly username: string
}
