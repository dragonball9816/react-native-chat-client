import React from 'react';
import { StyleSheet, ScrollView, View, Image, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  pictureFrame: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  perosnalName: {
    fontSize: 20,
    marginTop: 10,
  },
  menuItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: -5,
    marginBottom: -5,
    marginLeft: 15,
    marginRight: 15,
  },
  headerText: {
    margin: 16,
    fontWeight: 'bold',
    marginLeft: 32,
  },
  container: {
    flex: 1,
  },
});

export default SideMenu = (props) => (
  <ScrollView>
    <View style={styles.pictureFrame}>
      <Image source={require('../../assets/images/if-personal-6628.png')} />
      <Text style={styles.perosnalName}>Persnal</Text>
    </View>
    <View style={styles.menuItem}>
      <Icon name={'power'} />
      <Text style={styles.headerText}>Connected</Text>
    </View>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);
