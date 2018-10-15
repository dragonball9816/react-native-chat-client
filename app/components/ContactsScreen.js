import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Header, Icon, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';

import WebSocketService from '../services/WebSocketService';
import { enterRoom } from '../actions/app';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
});

class ContactsScreen extends React.Component {

  static navigationOptions = {
    drawerLabel: 'Contacts',
    drawerIcon: (
      <Icon name={'people'} onPress={() => this.props.navigation.toggleDrawer()} />
    ),
    header: null,
  };

  componentDidMount() {
    WebSocketService.send({
      cmd: 'fetch-clients',
      sessionId: this.props.sessionId,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={<Icon name={'menu'} color={'white'} onPress={() => this.props.navigation.toggleDrawer()} />}
          centerComponent={{ text: 'Contacts', style: { color: 'white', fontSize: 20 } }}
          rightComponent={{ icon: 'home', color: 'white' }}
        />
        <FlatList
          data={this.props.clients}
          renderItem={(client) => this.renderPerson(client)}
        />
      </View>
    );
  }

  renderPerson = (client) => {
    var lastText = '';
    this.props.messages.forEach(msg => {
      if (msg.sender && msg.sender == client.item.sessionId) {
        lastText = msg.text;
        return;
      }
      if (msg.receiver && msg.receiver == client.item.sessionId) {
        lastText = msg.text;
        return;
      }
    });
    if (lastText == '') {
      return (
        <ListItem
          key={client.item.sessionId}
          roundAvatar
          title={client.item.username}
          avatar={require('../../assets/images/man-32x32.png')}
          onPress={() => this.pressPerson(client.item.sessionId, client.item.username)}
        />
      );
    } else {
      return (
        <ListItem
          key={client.item.sessionId}
          roundAvatar
          title={client.item.username}
          subtitle={lastText}
          avatar={require('../../assets/images/man-32x32.png')}
          onPress={() => this.pressPerson(client.item.sessionId, client.item.username)}
        />
      );
    }
  }

  pressPerson = (partnerId, partnerName) => {
    this.props.onEnterRoom(partnerId, partnerName);
    this.props.navigation.navigate('Messages');
  }

}

const mapStateToProps = (state, ownProps) => {
  // In combineReducers, app => appReducer was defined
  return {
    connecting: state.app.connecting,
    sessionId: state.app.sessionId,
    username: state.app.username,
    clients: state.app.clients,
    messages: state.app.messages,
  };
}

const mapDispatchToProps = dispatch => ({
  onEnterRoom: (partnerId, partnerName) => {
    dispatch(enterRoom(partnerId, partnerName));
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ContactsScreen);
