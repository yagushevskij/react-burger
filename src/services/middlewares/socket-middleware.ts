import type { TWsObjActions, IWsConnectionStart } from '../actions/websockets'
import { MiddlewareAPI, Middleware } from 'redux'
import { TRootState } from '../store'
import { TAppDispatch } from '../custom-hooks/redux-hooks'

export const socketMiddleware = (wsActions: TWsObjActions): Middleware => {
  return (store: MiddlewareAPI<TAppDispatch, TRootState>) => {
    let socket: WebSocket | null = null

    return next => action => {
      const { dispatch } = store
      const { type } = action
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions
      if (type === wsInit('someUrl').type) {
        const { payload } = action as IWsConnectionStart
        socket = new WebSocket(payload.url)
      }
      if (socket?.readyState === 1 && type === onClose.type) {
        socket?.close()
      }
      if (socket) {
        socket.onopen = () => {
          dispatch(onOpen)
        }

        socket.onerror = () => {
          dispatch(onError)
        }

        socket.onmessage = event => {
          const { data } = event
          const parsedData = JSON.parse(data)
          const { success, ...restParsedData } = parsedData
          dispatch(onMessage(restParsedData))
        }

        socket.onclose = event => {
          dispatch(onClose)
          if (event.wasClean) {
            console.log(`WS cоединение закрыто корректно. Код ${event.code}`)
          } else {
            console.log(`Код закрытия - ${event.code}`)
          }
        }
      }

      next(action)
    }
  }
}
