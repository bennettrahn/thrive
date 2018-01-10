import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Checkin from './Checkin';
import LoginForm from './LoginForm';

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      errorMessages: {},
      checkinComplete: false,
    };

    this.renderBody = this.renderBody.bind(this);
    this.setUser = this.setUser.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  setUser(data) {
    this.setState({ errorMessages: {} });

    if (data.id) {
      this.setState({
        loggedIn: true,
        userId: data.id,
        username: data.username
      })
    } else  {
      this.setState({ errorMessages: data.errors })
    }
  }

  renderBody() {
    if (!this.state.loggedIn) {
      return <LoginForm setUser={this.setUser}/>
    } else if (this.state.checkinComplete) {
      return <Text style={styles.doneStyle}>Checkin complete!</Text>
    } else {
      return <Checkin
        userId={this.state.userId}
        username={this.state.username}
        checkinComplete={() => {this.setState({checkinComplete: true})}}
      />
    }
  }

  renderErrors() {
    const errorMessages = this.state.errorMessages
    for (let type in errorMessages) {
      for (let message of errorMessages[type]) {
        return <Text>{`${type}: ${message}`}</Text>
      }
    }
  }

  render() {
    return (
      <View>
        <Text style={styles.errorMessagesStyle}>{this.renderErrors()}</Text>
        {this.renderBody()}
      </View>
    );
  }
}

const styles = {
  errorMessagesStyle: {
    color: 'red',
    fontSize: 20,
    padding: 5,
    textAlign: 'center',
  },
  doneStyle: {
    color: 'blue',
    fontSize: 40,
    padding: 5,
    textAlign: 'center',
  }
}

export default Body;
