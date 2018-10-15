import React from 'react';
import { StyleSheet, View, FlatList, Image, Text, TextInput, TouchableHighlight, Alert } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import WebSocketService from '../services/WebSocketService';
import { sendText } from '../actions/app';
import { getHumanDateTimeString } from '../util/HumanDateTimeFormat';

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
          ref='msgList'
          data={this.props.messages}
          renderItem={(msg) => this.renderMessage(msg)}
        />
        <View style={styles.footer}>
          <TextInput
              style={styles.editor}
              placeholder='Type a message here.'
              placeholderTextColor='lightgray'
              onChangeText={(message) => this.setState({message})}
              value={this.state.message} />
          <TouchableHighlight
              underlayColor='transparent'
              onPress={this.handleSend}
              style={{ justifyContent: 'center' }}>
            <Icon name='telegram' type='font-awesome' color='lightblue' size={36} />
          </TouchableHighlight>
        </View>
      </View>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    this.refs.msgList.scrollToEnd({
      animated: true
    });
  }

  renderMessage = (msg) => {
    /**
     * The ListItem of native-base is difficult to control flex style.
     * So I use the general View, not ListItem, Left, Body and Right.
     */
    if (msg.item.sender && msg.item.sender == this.props.partnerId) {
      // Receiving
      return (
        <View style={styles.listItem}>
          <Icon name='public' color='mediumblue' style={styles.edgeItem} />
          <View style={styles.centerItem}>
            <Text style={styles.msgText}>{msg.item.text}</Text>
            <Text style={styles.msgTime}>{getHumanDateTimeString(msg.item.time)}</Text>
          </View>
        </View>
      );
    }
    if (msg.item.receiver && msg.item.receiver == this.props.partnerId) {
      // Sneding
      return (
        <View style={styles.listItem}>
          <View style={styles.centerItem}>
            <Text style={[styles.msgText, { textAlign: 'right' }]}>{msg.item.text}</Text>
            <Text style={[styles.msgTime, { textAlign: 'right' }]}>{getHumanDateTimeString(msg.item.time)}</Text>
          </View>
          <Icon name='person' color='mediumblue' style={styles.edgeItem} />
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
      text: this.state.message,
    });
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
    marginLeft: 15,
    marginRight: 15,
  },
  edgeItem: {
    marginLeft: 15,
    marginRight: 15,
  },
  centerItem: {
    flex: 1,
    justifyContent: 'center',
    margin: 10,
  },
  msgText: {
    fontSize: 18,
  },
  msgTime: {
    color: 'gray',
  },
  footer: {
    flexDirection: 'row',
    borderTopColor: 'lightblue',
    borderTopWidth: 1,
    marginLeft: 5,
    marginRight: 5,
  },
  editor: {
    flex: 1,
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

export default connect(mapStateToProps)(MessagesScreen);
