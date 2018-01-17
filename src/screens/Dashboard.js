import React, { Component } from 'react';
import { AsyncStorage, ScrollView, View, Text, TextInput } from 'react-native';
// import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { LineChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

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
    this.renderCheckins = this.renderCheckins.bind(this);

  }

  componentWillMount() {
    AsyncStorage.getItem('username').then((username) => {
      axios.get(`http://localhost:3000/checkins?username=${username}`)
      .then(response => {
        this.setState({checkins: response.data});
        // console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    });
  }

  getCheckinData() {
    let data = []
    this.state.checkins.forEach((checkin) => {
      checkin.feelings.forEach((feeling) => {
        data.push(feeling.rating);
      });
    });
    return data
  }

  renderCheckins() {
    const data = this.getCheckinData();
    //

    return (
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
    );
    // return this.state.checkins.map(checkin => <CheckinView
    //   key={checkin.id}
    //   checkin={checkin}
    // />);
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
