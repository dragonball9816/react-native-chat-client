import React from 'react';
import { StyleSheet, View, FlatList, Image, Text, TextInput, TouchableHighlight, Alert } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import WebSocketService from '../services/WebSocketService';
import { sendText } from '../actions/app';

class MessagesScreen extends React.Component {

  static navigationOptions = {
    drawerLabel: () => null,
  };

  constructor(props) {
    super(props);

    // owner props
    this.state = {
      message: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={<Icon name={'arrow-back'} color={'white'} onPress={() => this.props.navigation.navigate('Contacts')} />}
          centerComponent={<Text style={{ color: 'white', fontSize: 20 }}>{this.props.partnerName}</Text>}
          rightComponent={{ icon: 'home', color: 'white' }}
        />
        <FlatList
          data={this.props.messages}
          renderItem={(msg) => this.renderMessage(msg)}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TextInput
              style={styles.editor}
              placeholder='Please enter your text.'
              placeholderTextColor='steelblue'
              onChangeText={(message) => this.setState({message})}
              value={this.state.message} />
          <TouchableHighlight
              underlayColor='transparent'
              onPress={this.handleSend}>
            <Icon name='sc-telegram' type='evilicon' color='lightblue' size={48} />
          </TouchableHighlight>
        </View>
      </View>
    )
  }

  renderMessage = (msg) => {
    /**
     * The ListItem of native-base is difficult to control flex style.
     * So I use the general View, not ListItem, Left, Body and Right.
     */
    if (msg.item.sender && msg.item.sender == this.props.partnerId) {
      return (
        <View style={styles.listItem}>
          <Image source={require('../../assets/images/man-32x32.png')} style={styles.edgeItem} />
          <View style={styles.centerItem}>
            <Text style={{ fontSize: 18 }}>{msg.item.text}</Text>
          </View>
        </View>
      );
    }
    if (msg.item.receiver && msg.item.receiver == this.props.partnerId) {
      return (
        <View style={styles.listItem}>
          <View style={styles.centerItem}>
            <Text style={{ textAlign: 'right', fontSize: 18 }}>{msg.item.text}</Text>
          </View>
          <Image source={require('../../assets/images/man-32x32.png')} style={styles.edgeItem} />
        </View>
      );
    }
  }

  handleSend = () => {
    if (this.state.message == '') {
      Alert.alert(
        'Text required',
        'Please enter your message.',
        [{ text: 'OK' }]
      );
      return;
    }
    WebSocketService.send({
      cmd: 'send-text',
      sessionId: this.props.sessionId,
      receiver: this.props.partnerId,
      message: this.state.message,
    });
    this.props.onSendText(this.props.partnerId, this.state.message);
    this.setState({
      message: ''
    });
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  listItem: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  edgeItem: {
    margin: 15,
  },
  centerItem: {
    flex: 1,
    justifyContent: 'center',
    margin: 10,
  },
  editor: {
    flex: 1,
    color: 'darkblue',
    fontSize: 18,
  },
});

const mapStateToProps = (state, ownProps) => {
  // In combineReducers, app => appReducer was defined
  return {
    connecting: state.app.connecting,
    sessionId: state.app.sessionId,
    partnerId: state.app.partnerId,
    partnerName: state.app.partnerName,
    messages: state.app.messages,
  };
}

const mapDispatchToProps = dispatch => ({
  onSendText: (receiver, text) => {
    dispatch(sendText(receiver, text));
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(MessagesScreen);
