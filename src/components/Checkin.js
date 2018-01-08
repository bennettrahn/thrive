import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import SearchBar from './SearchBar';
import FeelingsList from './FeelingsList';

class Checkin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkInFeelings: [],
      searchedFeelings: [],
    };

    this.setSearchedFeelings = this.setSearchedFeelings.bind(this);
    this.handleFeelingClick = this.handleFeelingClick.bind(this);
  }

  setSearchedFeelings(data) {
    let searchedFeelings = data;
    // let doubles = []
    // this.state.checkInFeelings.forEach((feeling) => {
    //   data.forEach((dataFeeling) => {
    //     if (dataFeeling.name === feeling.name) {
    //       doubles.push(dataFeeling);
    //     }
    //   });
    // });
    // for (let i=0; i < doubles.length; i++) {
    //   searchedFeelings.splice(doubles[i], 1);
    // }

    this.setState({ searchedFeelings: searchedFeelings })
  }

  handleFeelingClick(feeling) {
    let feelings = this.state.searchedFeelings;
    const index = feelings.indexOf(feeling);
    if ( index !== -1 ) {
      feelings.splice(index, 1);
    }
    this.setState(
      { searchedFeelings: feelings }
    );

    this.state.checkInFeelings.push(feeling)
    //is this kosher?
  }

  render() {
    return (
      <View>
        <FeelingsList feelings={this.state.checkInFeelings}/>
        <Text>I am feeling ...</Text>
        <SearchBar
          setSearchedFeelings={this.setSearchedFeelings}
        />
        <FeelingsList
          handleFeelingClick={this.handleFeelingClick}
          feelings={this.state.searchedFeelings}
        />
      </View>
    );
  }
}

const styles = {

}

export default Checkin;
