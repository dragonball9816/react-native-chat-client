import { bool, object } from 'prop-types';

import * as actionTypes from './types';

export const serverConnecting = () => {
  return {
    type: actionTypes.SERVER_CONNECTING,
  };
}

export const serverConnected = () => {
  return {
    type: actionTypes.SERVER_CONNECTED,
  };
}

export const serverDisconnecting = () => {
  return {
    type: actionTypes.SERVER_DISCONNECTING,
  };
}

export const serverDisconnected = () => {
  return {
    type: actionTypes.SERVER_DISCONNECTED,
  };
}

export function loginSuceeded(sessionId: string) {
  return {
    type: actionTypes.LOGIN_SUCEEDED,
    payload: sessionId,
  };
}

export function loginFailed() {
  return {
    type: actionTypes.LOGIN_FAILED,
  };
}

export function someoneEntered(sessionId: string, username: string) {
  return {
    type: actionTypes.SOMEONE_ENTERED,
    payload: {
      sessionId: sessionId,
      username: username,
    },
  };
}

export function someoneLeft(sessionId: string) {
  return {
    type: actionTypes.SOMEONE_LEFT,
    payload: sessionId,
  };
}

export function someoneRenamed(sessionId: string, username: string) {
  return {
    type: actionTypes.SOMEONE_RENAMED,
    payload: {
      sessionId: sessionId,
      username: username,
    },
  };
}

export const clientsArrived = (clients: object) => {
  return {
    type: actionTypes.CLIENTS_ARRIVED,
    payload: clients,
  };
}

export const enterRoom = (partnerId: string, partnerName: string) => {
  return {
    type: actionTypes.ENTER_ROOM,
    payload: {
      partnerId: partnerId,
      partnerName: partnerName,
    },
  };
}

export function sendText(receiver: string, text: string, time: number) {
  return {
    type: actionTypes.SEND_TEXT,
    payload: {
      receiver: receiver,
      text: text,
      time: time,
    },
  };
}

export function receiveText(sender: string, text: string, time: number) {
  return {
    type: actionTypes.RECEIVE_TEXT,
    payload: {
      sender: sender,
      text: text,
      time: time,
    },
  };
}
