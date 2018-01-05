import React from 'react';
import { View, AppRegistry } from 'react-native';
import Header from './src/components/Header';
import FeelingsList from './src/components/FeelingsList';
import SearchBar from './src/components/SearchBar';

const App = () => {
  return (
    <View>
      <Header headerText={'thrive'} />
      <SearchBar />
      <FeelingsList />
    </View>
  );
};

AppRegistry.registerComponent('thrive', () => App);
