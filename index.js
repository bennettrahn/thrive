import React from 'react';
import { Text, View, AppRegistry } from 'react-native';
import {Router, Scene} from 'react-native-router-flux';
// import Header from './src/components/Header';
// import Body from './src/components/Body';
import LoginForm from './src/components/LoginForm';
import Checkin from './src/components/Checkin';

const App = () => {
  return (
    <Router>
      <Scene key='root'>
        <Scene
          component={LoginForm}
          hideNavBar={true}
          initial={true}
          key='Login'
          title='Login'
        />
        <Scene
          component={Checkin}
          hideNavBar={true}
          key='Checkin'
          title='Check In'
        />
      </Scene>
    </Router>
  );
};



AppRegistry.registerComponent('thrive', () => App);
