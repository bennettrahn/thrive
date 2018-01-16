import React, { Component } from 'react';
import { AsyncStorage, View, Text, TextInput } from 'react-native';
import Button from '../components/Button';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { LineChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape'

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null
    };

    // this.handleLogin = this.handleLogin.bind(this)
  }

  async saveItem(item, selectedValue) {
    try {
      console.log(item);
      console.log(selectedValue);
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    }
  }

  userSignup() {
    axios.post('http://localhost:3000/users/', {
      username: this.state.username,
      password: this.state.password
    })
    .then(response => {
      console.log(response.data);
      this.saveItem('username', response.data.username);
      Actions.Checkin();
      // this.props.setUser(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }
  // handleCreateNewUser() {
  // }

  userLogin() {
    axios.get(`http://localhost:3000/users/${this.state.username}`, {
      params: {
        username: this.state.username,
        password: this.state.password
      }
    }).then(response => {
      // this.props.setUser(response.data);
      console.log(response.data);
      this.saveItem('username', response.data.username);
      Actions.Checkin();
    });
  }

  // handleLogin() {
  // }



  render() {

    const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

    return (

      <View>
        <LineChart
              style={ { height: 200 } }
              dataPoints={ data }
              fillColor={ 'purple' }
              shadowOffset={3}
              svg={ {
                  stroke: 'rgb(134, 65, 244)',
              } }
              shadowSvg={ {
                  stroke: 'rgba(134, 65, 244, 0.2)',
                  strokeWidth: 5,
              } }
              contentInset={ { top: 20, bottom: 20 } }
              curve={shape.curveLinear}
          />
        <Text>username:</Text>
        <TextInput
          editable={true}
          onChangeText={(text) => this.setState({username: text})}
          placeholder='Username'
          ref='username'
          returnKeyType='next'
          style={styles.formInputStyle}
          value={this.state.username}
          autoCapitalize='none'
        />
        <Text>password:</Text>
        <TextInput
          editable={true}
          onChangeText={(text) => this.setState({password: text})}
          placeholder='Password'
          ref='password'
          returnKeyType='next'
          secureTextEntry={true}
          style={styles.formInputStyle}
          value={this.state.password}
          autoCapitalize='none'
        />

        <Button onPress={this.userLogin.bind(this)}>Login</Button>
        <Text>or</Text>
        <Button onPress={this.userSignup.bind(this)}>Create an Account</Button>

      </View>
    );
  }
}
// onPress={() => {this.props.setDescription(this.state.text)}}
const styles = {
  formInputStyle: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  }
}

export default LoginForm;
