import React, { Component } from 'react';
import { AsyncStorage, ScrollView, View, Text, TextInput } from 'react-native';
// import { Actions } from 'react-native-router-flux';
import axios from 'axios';

import Header from '../components/Header';
import CheckinView from '../components/CheckinView';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // username: null,
      checkins: [],
    };

    this.renderCheckins = this.renderCheckins.bind(this);

  }

  componentWillMount() {
    AsyncStorage.getItem('username').then((username) => {
      axios.get(`http://localhost:3000/checkins?username=${username}`)
      .then(response => {
        this.setState({checkins: response.data});
      })
      .catch(error => {
        console.log(error);
      });
    });
  }

  renderCheckins() {
    return this.state.checkins.map(checkin => <CheckinView
      key={checkin.id}
      checkin={checkin}
    />);
  }

  render() {
    return (
      <ScrollView>
        <Text>Your Checkins:</Text>
        {this.renderCheckins()}
      </ScrollView>
    );
  }
}

const styles = {

}

export default Dashboard;
