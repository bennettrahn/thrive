import React, { Component } from 'react';
import { AsyncStorage, View, Text, TextInput, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';

import Button from '../components/Button';
import Header from '../components/Header';



class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null
    };

  }

  async saveItem(item, selectedValue) {
    try {
      // console.log(item);
      // console.log(selectedValue);
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
    })
    .catch(error => {
      console.log(error);
    });
  }

  userLogin() {
    axios.get(`http://localhost:3000/users/${this.state.username}`, {
      params: {
        username: this.state.username,
        password: this.state.password
      }
    }).then(response => {
      console.log(response.data);
      this.saveItem('username', response.data.username);
      Actions.main();
    });
  }




  render() {
    return (

      <View>
        <Header headerText='thrive' login={true} />
        <ImageBackground
          style={styles.BackgroundImage}
          source={require('../../succulents.jpg')}
        >
        <View style={styles.loginStyle}>
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
          <Button onPress={this.userSignup.bind(this)}>Create an Account</Button>
        </View>
        </ImageBackground>
      </View>
    );
  }
}
const styles = {
  loginStyle: {
    margin: 20,
    paddingTop: 75
  },
  BackgroundImage: {
    width: 375,
    height: 700
  },
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
