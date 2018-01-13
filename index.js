import React, { Component } from 'react';
import { AppRegistry, ActivityIndicator, AsyncStorage } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import LoginForm from './src/screens/LoginForm';
import Checkin from './src/screens/Checkin';
import Dashboard from './src/screens/Dashboard';

class App extends Component {
  constructor() {
    super();
    this.state = { hasToken: false, isLoaded: false };
  }

  componentDidMount() {
    AsyncStorage.getItem('username').then((token) =>{
      this.setState({ hasToken: token !== null, isLoaded: true })
    });
  }

  render() {
    if (!this.state.isLoaded) {
      return <ActivityIndicator />
    } else {
      return (
        <Router>
          <Scene key='root'>
            <Scene key='Login'
              component={LoginForm}
              hideNavBar={true}
              initial={!this.state.hasToken}
              title='Login'
            />
            <Scene
              key='main'
              hideNavBar={true}
              initial={this.state.hasToken}
            >
              <Scene key='Dashboard'
                hideNavBar={false}
                component={Dashboard}
                title='Dashboard'
              />
              <Scene key='Checkin'
                component={Checkin}
                title='Check In'
              />
            </Scene>
          </Scene>
        </Router>
      );
    }
  }
};

// <Scene key='main'>
//   <Scene key='Checkin'
//     component={Checkin}
//     hideNavBar={true}
//     initial={this.state.hasToken}
//     title='Check In'
//   />
//   <Scene key='Dashboard'
//     component={Dashboard}
//     title='Dashboard'
//   />
// </Scene>

AppRegistry.registerComponent('thrive', () => App);
