import React, { Component } from 'react';
import { AppRegistry, ActivityIndicator, AsyncStorage, Text, View, Image } from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';
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
              <Scene key='tabbar'
                tabs={true}
                tabbarStyle={{ backgroundColor: 'green' }}
              >
                <Scene key='Checkin'
                  hideNavBar={true}
                  icon={() => <Image style={{height: 30, width: 30}} source={require('./feel_icon.png')}/>}
                  component={Checkin}
                  title='Checkin'
                />
                <Scene key='Dashboard'
                  icon={() => <Image style={{height: 30, width: 30}} source={require('./dashboard_icon.png')}/>}
                  hideNavBar={true}
                  component={Dashboard}
                  title='Dashboard'
                />
              </Scene>
            </Scene>
          </Scene>
        </Router>
      );
    }
  }
};

// AppRegistry.registerComponent('thrive', () => ExtrasExample);
AppRegistry.registerComponent('thrive', () => App);
