import React, { Component } from 'react';
import { ScrollView, View, Text, TextInput } from 'react-native';
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
    axios.get(`http://localhost:3000/checkins?username=${username}`)
    .then(response => {
      console.log(response.data);
      this.setState({checkins: response.data});
    })
    .catch(error => {
      console.log(error);
    });
  }

  renderCheckins() {
    console.log(this.state.checkins);
    return this.state.checkins.map(checkin => <CheckinView
      key={checkin.id}
      checkin={checkin}
    />);
  }

  render() {
    return (
      <View>
        <Header headerText='thrive' />
        <Text>Your Checkins:</Text>
        {this.renderCheckins()}
      </View>
    );
  }
}

const styles = {

}

const username = 'me'

export default Dashboard;
