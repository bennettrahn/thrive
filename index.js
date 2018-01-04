import React from 'react';
import { View, AppRegistry } from 'react-native';
import Header from './src/components/Header';
import FeelingsList from './src/components/FeelingsList';

const App = () => {
  return (
    <View>
      <Header headerText={'thrive'} />
      <FeelingsList />
    </View>
  );
};

AppRegistry.registerComponent('thrive', () => App);
