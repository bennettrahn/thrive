import React, { Component } from 'react';
import { AppRegistry, ActivityIndicator, AsyncStorage } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import LoginForm from './src/screens/LoginForm';
import Checkin from './src/screens/Checkin';
import Dashboard from './src/screens/Dashboard';

class App extends Component {
  // constructor() {
  //   super();
  //   this.state = { hasToken: false, isLoaded: false };
  // }
  //
  // componentDidMount() {
  //   AsyncStorage.getItem('username').then((token) =>{
  //     this.setState({ hasToken: token !== null, isLoaded: true })
  //   });
  // }

  render() {
    return (
      <Dashboard />
    )
  }

  // render() {
  //   if (!this.state.isLoaded) {
  //     return <ActivityIndicator />
  //   } else {
  //     return (
  //       <Router>
  //         <Scene key='root'>
  //           <Scene
  //             component={LoginForm}
  //             hideNavBar={true}
  //             initial={!this.state.hasToken}
  //             key='Login'
  //             title='Login'
  //           />
  //           <Scene
  //             component={Checkin}
  //             hideNavBar={true}
  //             initial={this.state.hasToken}
  //             key='Checkin'
  //             title='Check In'
  //           />
  //         </Scene>
  //       </Router>
  //     );
  //   }
  // }
};



AppRegistry.registerComponent('thrive', () => App);
