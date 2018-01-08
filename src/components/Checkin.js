import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import SearchBar from './SearchBar';
import FeelingsList from './FeelingsList';

class Checkin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkInFeelings: [],
      // searchedFeelings: [],
      query: ''
    };

    this.setQuery = this.setQuery.bind(this);
    this.setCheckInFeelings = this.setCheckInFeelings.bind(this);
  }

  setQuery(query) {
    this.setState({ query: query })
  }

  setCheckInFeelings(feeling) {
    let feelings = this.state.checkInFeelings
    feelings.push(feeling)
    this.setState({ checkInFeelings: feelings})
  }

  render() {
    return (
      <View>
        <FeelingsList feelings={this.state.checkInFeelings}/>
        <Text>"I'm feeling ..."</Text>
        <SearchBar
          setQuery={this.setQuery}
        />
        <FeelingsList
          query={this.state.query}
          setCheckInFeelings={this.setCheckInFeelings}
        />
      </View>
    );
  }
}

const styles = {

}

export default Checkin;
