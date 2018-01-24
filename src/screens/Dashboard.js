import React, { Component } from 'react';
import { AsyncStorage, ScrollView, View, Text } from 'react-native';
// import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { LineChart, XAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

import Header from '../components/Header';
import CheckinList from '../components/CheckinList';
import RatingLineChart from '../components/RatingLineChart';
import CategoryChart from '../components/CategoryChart';


class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // username: null,
      checkins: [],
      feelingData: [],
      dateData: [],
      categories: [],
    };

    // this.renderLineChart = this.renderLineChart.bind(this);
    this.mostCommon = this.mostCommon.bind(this);
    // this.checkinList = this.checkinList.bind(this);

  }

  componentWillMount() {
    AsyncStorage.getItem('username')
    .then((username) => {
      axios.get(`http://localhost:3000/checkins?username=${username}`)
      .then(response => {
        // console.log(response.data);
        this.setState({
          checkins: response.data.all_checkins,
          day_averages: response.data.day_averages
        });
      })
      .catch(error => {
        console.log(error);
      });
    });

    AsyncStorage.getItem('username')
    .then((username) => {
      axios.get(`http://localhost:3000/checkins/categories?username=${username}`)
      .then(response => {
        this.setState({ categories: response.data });
      })
    });
  }

  mostCommon() {
    let topCat;
    if (this.state.categories) {
      topCat = this.state.categories[0][0];
    } else {
      topCat = "word"
    }
    return (
      <Text>{topCat}</Text>
    );
  }

  render() {

    return (
      <View>
      <Header headerText='thrive' />
      <ScrollView>
        <Text>This week in review:</Text>
        <RatingLineChart day_averages={this.state.day_averages}/>
        <Text>Most Common Categories:</Text>
        <CategoryChart categories={this.state.categories} />
        <Text>Your Checkins:</Text>
        <CheckinList checkins={this.state.checkins}/>
      </ScrollView>
      </View>
    );
  }
}

const styles = {
  chartWholeStyle: {
    margin: 20,
  }
}

export default Dashboard;
