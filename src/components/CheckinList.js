import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import axios from 'axios';

import CheckinView from './CheckinView'

class CheckinList extends Component {
  constructor(props) {
    super(props);



    this.renderCheckins = this.renderCheckins.bind(this);
  }

  renderCheckins() {
    return this.props.checkins.map(checkin => <CheckinView
      key={checkin.id}
      checkin={checkin}
    />);
  }

  render() {
    // console.log(this.state.checkins);
    return (
      <View>
        {this.renderCheckins()}
      </View>
    );
  }

};

const styles = {

}

export default CheckinList;
