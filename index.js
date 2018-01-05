import React from 'react';
import { Text, View, AppRegistry } from 'react-native';
import Header from './src/components/Header';
import SearchBar from './src/components/SearchBar';

const App = () => {
  return (
    <View>
      <Header headerText={'thrive'} />
      <Text>"I'm feeling ..."</Text>
      <SearchBar />
    </View>
  );
};

AppRegistry.registerComponent('thrive', () => App);
