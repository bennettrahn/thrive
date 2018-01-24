import React, { Component } from 'react';
import { AsyncStorage, ScrollView, View, Text } from 'react-native';
// import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { LineChart, XAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

import Header from '../components/Header';
import SectionHeader from '../components/SectionHeader';
import CheckinList from '../components/CheckinList';
import RatingLineChart from '../components/RatingLineChart';
import CategoryChart from '../components/CategoryChart';


class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkins: [],
      day_averages: [],
      categories: [],
    };
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

  render() {

    return (
      <View>
      <Header headerText='thrive' />
      <ScrollView>

        <View style={styles.gapStyle}></View>
        <SectionHeader headerText="This Week In Review" />
        <RatingLineChart day_averages={this.state.day_averages}/>

        <SectionHeader headerText="Most Common Categories" />
        <CategoryChart categories={this.state.categories} />

        <SectionHeader headerText="Your Checkins" />
        <CheckinList checkins={this.state.checkins}/>
      </ScrollView>
      </View>
    );
  }
}

const styles = {
  gapStyle: {
    height: 10,
  }
}

export default Dashboard;
