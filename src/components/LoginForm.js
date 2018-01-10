import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import Button from './Button';
import axios from 'axios';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin() {
    axios.get(`http://localhost:3000/users/${this.state.username}`, {
      params: {
        username: this.state.username,
        password: this.state.password
      }
    }).then(response => {
      this.props.setUser(response.data);
      console.log(response.data);
    });
  }

  handleCreateNewUser() {
    axios.post('http://localhost:3000/users/', {
      username: this.state.username,
      password: this.state.password
    })
    .then(response => {
      console.log(response.data);
      this.props.setUser(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <View>
        <Text>username:</Text>
        <TextInput
          style={styles.formInputStyle}
          onChangeText={(text) => this.setState({username: text})}
          value={this.state.username}
          autoCapitalize='none'
        />
        <Text>password:</Text>
        <TextInput
          style={styles.formInputStyle}
          onChangeText={(text) => this.setState({password: text})}
          value={this.state.password}
          autoCapitalize='none'
        />
        <Button onPress={() => {this.handleLogin()}}>Login</Button>
        <Text>or</Text>
        <Button onPress={() => {this.handleCreateNewUser()}}>Create an Account</Button>
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

export default SearchBar;
