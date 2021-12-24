import { Store } from "redux";
import type { TWsOrdersListActions } from "../actions/orders-user";
import type { TWsOrdersActions } from "../actions/orders-user";
import { getCookie } from "../../utils/helpers";

export const socketMiddleware = (wsUrl: string, wsActions: {[key: string]: TWsOrdersListActions} ) => {
  return (store: any) => {
    let socket: WebSocket | null = null;

    return (next: any) => (action: TWsOrdersActions) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
      const token = getCookie('accessToken')
      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}?token=${token}`);
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen });
        };

        socket.onerror = event => {
          dispatch({ type: onError });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = event => {
          dispatch({ type: onClose });
        };
      }

      next(action);
    };
  };
};