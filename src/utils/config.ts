export const API_URL = 'https://norma.nomoreparties.space/api/'
export const wsUrl = 'wss://norma.nomoreparties.space/orders'

export enum orderStatus {
  created = 'Создан',
  pending = 'Готовится',
  done = 'Выполнен',
}
