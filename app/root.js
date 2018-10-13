/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { reduxifyNavigator, createReactNavigationReduxMiddleware, createNavigationReducer } from 'react-navigation-redux-helpers';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';

import ContactsScreen from './components/ContactsScreen';
import MessagesScreen from './components/MessagesScreen';
import LoginScreen from './components/LoginScreen';
import SideMenu from './components/SideMenu';

const AppNav = createDrawerNavigator({
  Login: LoginScreen,
  Contacts: ContactsScreen,
  Messages: MessagesScreen,
},{
  contentComponent: SideMenu,
  initialRouteName: 'Login',
});

const navReducer = createNavigationReducer(AppNav);

import appReducer from './reducers/app';

const rootReducer = combineReducers({
  nav: navReducer,
  app: appReducer, // In mapStateToProps, call state.app.xxx
});

// Note: createReactNavigationReduxMiddleware must be run before reduxifyNavigator
const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);

/**
 * Create the redux navigator for the dispatch of navigation action
 * Only if redux navigator is created, the following execution is possible:
 * store.dispatch(NavigationActions.navigate())
 */
const ReduxNav = reduxifyNavigator(AppNav, 'root');
const mapStateToProps = (state) => ({
  state: state.nav,
});
const RootNav = connect(mapStateToProps)(ReduxNav);

export const store = createStore(rootReducer, applyMiddleware(middleware));

export class Root extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <RootNav />
      </Provider>
    );
  }

}
