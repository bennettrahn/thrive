import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Checkin from './Checkin';
import LoginForm from './LoginForm';

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      errorText: '',
    };

    this.renderBody = this.renderBody.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  setUser(data) {
    this.setState({ errorText: '' });

    if (data.id) {
      this.setState({
        loggedIn: true,
        userId: data.id,
        username: data.username
      })
    } else  {
      this.setState({ errorText: 'invalid username or password' })
    }
  }

  renderBody() {
    if (!this.state.loggedIn) {
      return <LoginForm setUser={this.setUser}/>
    } else {
      return <Checkin
        userId={this.state.userId}
        username={this.state.username}
      />
    }
  }

  render() {
    return (
      <View>
        <Text style={styles.errorTextStyle}>{this.state.errorText}</Text>
        {this.renderBody()}
      </View>
    );
  }
}

const styles = {
  errorTextStyle: {
    color: 'red',
    fontSize: 20,
    padding: 5,
    textAlign: 'center',
  }
}

export default Body;
