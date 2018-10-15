import * as actionTypes from '../actions/types';

const initialState = {
  connecting: false,
  disconnecting: false,
  connected: false,
  sessionId: '',
  username: '',
  clients: [],
  partnerId: '',
  partnerName: '',
  messages: [],
};

export default appReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.SERVER_CONNECTING:
      return {
        ...state,
        connecting: true,
      };
    case actionTypes.SERVER_CONNECTED:
      return {
        ...state,
        connecting: false,
        connected: true,
      };
    case actionTypes.SERVER_DISCONNECTING:
      return {
        ...state,
        disconnecting: true,
      };
    case actionTypes.SERVER_DISCONNECTED:
      return {
        ...state,
        disconnecting: false,
        connected: false,
      };
    case actionTypes.LOGIN_SUCEEDED:
      return {
        ...state,
        sessionId: action.payload,
      };
    case actionTypes.SOMEONE_ENTERED:
      return {
        ...state,
        clients: [
          ...state.clients, {
            sessionId: action.payload.sessionId,
            username: action.payload.username,
          }
        ],
      };
    case actionTypes.SOMEONE_LEFT:
      return {
        ...state,
        clients: state.clients.filter(client => client.sessionId != action.payload),
      };
    case actionTypes.SOMEONE_RENAMED:
      var i = state.clients.findIndex(client => client.sessionId == action.payload.sessionId);
      if (i == -1)
        return state;
      return {
        ...state,
        clients: [
          state.clients.slice(0, i), {
            sessionId: state.clients[i].sessionId,
            username: action.payload.username,
          },
          state.clients.slice(i + 1),
        ],
      };
    case actionTypes.CLIENTS_ARRIVED:
      return {
        ...state,
        clients: action.payload,
      };
    case actionTypes.ENTER_ROOM:
      return {
        ...state,
        partnerId: action.payload.partnerId,
        partnerName: action.payload.partnerName,
      };
    case actionTypes.SEND_TEXT:
      return {
        ...state,
        messages: [
          ...state.messages, {
            receiver: action.payload.receiver,
            text: action.payload.text,
            time: action.payload.time,
          },
        ],
      };
    case actionTypes.RECEIVE_TEXT:
      return {
        ...state,
        messages: [
          ...state.messages, {
            sender: action.payload.sender,
            text: action.payload.text,
            time: action.payload.time,
          },
        ],
      };
    default:
      return state;
  }
};
