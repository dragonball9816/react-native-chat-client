import { NavigationActions } from 'react-navigation';

import { store } from '../root';
import {
  loginSuceeded,
  loginFailed,
  someoneEntered,
  someoneLeft,
  someoneRenamed,
  clientsArrived,
  sendText,
  receiveText,
} from '../actions/app';

class WebSocketService {

  static instance = null;

  static getInstance() {
    if (!WebSocketService.instance)
      WebSocketService.instance = new WebSocketService();
    return WebSocketService.instance;
  }

  constructor() {
    this.ws = new WebSocket('ws://192.168.1.107:8080');

    this.ws.onopen = (arg) => {
      // connection opended
      console.log('arg', arg);
    };

    this.ws.onmessage = (e) => {
      // a message was received
      console.log('onmessage', e);
      const msg = JSON.parse(e.data);

      switch (msg.cmd) {
        case 'login-suceeded':
          store.dispatch(loginSuceeded(msg.sessionId));
          var navAction = NavigationActions.navigate({
            routeName: 'Contacts',
          });
          store.dispatch(navAction);
          break;
        case 'login-failed':
          store.dispatch(loginFailed());
          break;
        case 'someone-entered':
          store.dispatch(someoneEntered(msg.sessionId, msg.username));
          break;
        case 'someone-left':
          store.dispatch(someoneLeft(msg.sessionId));
          break;
        case 'someone-renamed':
          store.dispatch(someoneRenamed(msg.sessionId, msg.username));
          break;
        case 'clients-arrived':
          store.dispatch(clientsArrived(msg.clients));
          break;
        case 'send-text':
          store.dispatch(sendText(msg.receiver, msg.text, msg.time));
          break;
        case 'receive-text':
          store.dispatch(receiveText(msg.sender, msg.text, msg.time));
          break;
      }
    };

    this.ws.onerror = (e) => {
      // an error occurred
      console.log(e.message);
    }

    this.ws.onclose = this.logout;
  }

  logout(e) {
    // connection closed
    console.log('onclose', e.code, e.reason);
    this.send({
      cmd: 'request-logout',
    });
  }

  /**
   * Called in UI components also
   */
  send(data = {}) {
    console.log('send', data);
    this.ws.send(JSON.stringify(data));
  }

}

export default WebSocketService.getInstance();
