import React, { Component } from 'react';
import { AsyncStorage, ScrollView, View, Text, TextInput } from 'react-native';
// import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { LineChart, XAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

import Header from '../components/Header';
import CheckinView from '../components/CheckinView';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // username: null,
      checkins: [],
      feelingData: [],
      dateData: []

    };

    this.renderCheckins = this.renderCheckins.bind(this);
    this.renderCheckins = this.renderCheckins.bind(this);

  }

  componentWillMount() {
    AsyncStorage.getItem('username').then((username) => {
      axios.get(`http://localhost:3000/checkins?username=${username}`)
      .then(response => {
        this.setState({checkins: response.data});

        let feelingData = []
        let dateData = []
        response.data.forEach((checkin) => {
          let feelingTotal = 0
          checkin.feelings.forEach((feeling) => {
            feelingTotal += feeling.rating;
          });
          const feelingAvg = feelingTotal / checkin.feelings.length;
          feelingData.push(feelingAvg);

          let date = new Date(checkin.created_at);
          date = date.getDate();
          dateData.push(date)
        });
        this.setState({ feelingData: feelingData })
        this.setState({ dateData: dateData })
      })
      .catch(error => {
        console.log(error);
      });
    });
  }

  // getCheckinData() {
  //   let data = []
  //   let datesData = []
  //   this.state.checkins.forEach((checkin) => {
  //     let feelingTotal = 0
  //     checkin.feelings.forEach((feeling) => {
  //       feelingTotal += feeling.rating;
  //     });
  //     const feelingAvg = feelingTotal / checkin.feelings.length;
  //     data.push(feelingAvg);
  //
  //     const date = new Date(checkin.created_at);
  //     datesData.push(date)
  //   });
  //   console.log(datesData);
  //   return data
  // }

  renderCheckins() {
    // const data = this.getCheckinData();
    const data = this.state.feelingData;
    const dateData = this.state.dateData;
    console.log(dateData);

    return (
      <View>
        <LineChart
          style={ { height: 200 } }
          dataPoints={ data }
          numberOfTicks={5}
          fillColor={ 'purple' }
          shadowOffset={.5}
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
        <XAxis
          style={ { paddingVertical: 10 } }
          values={ dateData }
          formatLabel={ (value, index) => value }
          chartType={ XAxis.Type.LINE }
          labelStyle={ { color: 'grey' } }
        />
      </View>
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
