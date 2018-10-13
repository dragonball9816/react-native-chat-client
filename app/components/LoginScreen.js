import React from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableHighlight, Alert } from 'react-native';
import { connect } from 'react-redux';

import WebSocketService from '../services/WebSocketService';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
  },
  description: {
    fontSize: 20,
    marginTop: 20,
  },
  username: {
    width: '80%',
    fontSize: 20,
    borderBottomColor: 'steelblue',
    borderBottomWidth: 1,
    textAlign: 'center',
    marginTop: 20,
  },
});

class LoginScreen extends React.Component {

  static navigationOptions = {
    headerMode: 'none',
    drawerLockMode: 'locked-closed',
    drawerLabel: () => null, // Remove the menu item from drawer menu
  };

  constructor(props) {
    super(props);

    // owner props
    this.state = {
      username: '',
      password: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../assets/images/Chat-Icon-128.png')} />
        <Text style={styles.title}>Sign in</Text>
        <Text style={styles.description}>Chat name, email or phone</Text>
        <TextInput
            style={styles.username}
            placeholder='Username'
            placeholderTextColor='steelblue'
            onChangeText={(username) => this.setState({username})} />
        <TextInput
            secureTextEntry={true}
            style={styles.username}
            placeholder='Password'
            placeholderTextColor='steelblue'
            onChangeText={(password) => this.setState({password})} />
        <TouchableHighlight
            underlayColor='transparent'
            onPress={this.handleLogin}
            style={{ marginTop: 20 }}>
          <Image source={require('../../assets/images/Button-Next-icon-64x64.png')} />
        </TouchableHighlight>
      </View>
    );
  }

  handleLogin = () => {
    if (this.state.username == '') {
      Alert.alert(
        'Username required',
        'Please enter your username.',
        [{ text: 'OK' }]
      );
      return;
    }
    WebSocketService.send({
      cmd: 'request-login',
      username: this.state.username,
      password: this.state.password,
    });
    // this.props.navigation.navigate('Contacts');
  }

}

const mapStateToProps = (state, ownProps) => {
  // In combineReducers, app => appReducer was defined
  return {
    connecting: state.app.connecting,
  };
}

export default connect(mapStateToProps)(LoginScreen);
