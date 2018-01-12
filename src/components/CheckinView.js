import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';


class CheckinView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: props.checkin.description,
      date: props.checkin.created_at
    };
  }

  componentWillMount() {
    let date = new Date(this.state.date);
    date = date.toString();
    this.setState({ date: date });
  }

  render() {
    console.log(this.state.date);
    return (
      <View>
        <Text>{this.state.description}</Text>
        <Text> at: {this.state.date}</Text>
      </View>
    );
  }

};

const styles = {

}

export default CheckinView;
