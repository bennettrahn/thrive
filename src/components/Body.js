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
      checkinComplete: false,
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
  },
  doneStyle: {
    color: 'blue',
    fontSize: 40,
    padding: 5,
    textAlign: 'center',
  }
}

export default Body;
