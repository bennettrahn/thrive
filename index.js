import React from 'react';
import { Text, View, AppRegistry } from 'react-native';
import Header from './src/components/Header';
import Checkin from './src/components/Checkin';

const App = () => {
  return (
    <View style={styles.appBackgroundStyle}>
      <Header headerText={'thrive'} />
      <Checkin />
    </View>
  );
};

const styles = {
  appBackgroundStyle: {
    // backgroundColor: 'rgb(79, 156, 246)',
  }
}

AppRegistry.registerComponent('thrive', () => App);
