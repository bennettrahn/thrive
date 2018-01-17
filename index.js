import React, { Component } from 'react';
import { AppRegistry, ActivityIndicator, AsyncStorage, Text } from 'react-native';
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
              <Scene key='Dashboard'
                rightTitle='rightbutton'
                icon={() => <Text>;)</Text>}
                onRight={() => Actions.Checkin()}
                hideNavBar={false}
                component={Dashboard}
                title='Dashboard'
              />
                <Scene key='Checkin'
                  hideNavBar={true}
                  icon={() => <Text>:P</Text>}
                  component={Checkin}
                  title='Check In'
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
