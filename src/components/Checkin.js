import React, { Component } from 'react';
import { ScrollView, View, Text, TextInput } from 'react-native';
import SearchBar from './SearchBar';
import FeelingsList from './FeelingsList';
import Button from './Button';
import CheckinDescription from './CheckinDescription';

class Checkin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkInFeelings: [],
      searchedFeelings: [],
      next: false,
      description: ''
    };

    this.setSearchedFeelings = this.setSearchedFeelings.bind(this);
    this.handleFeelingClick = this.handleFeelingClick.bind(this);
    this.nextButton = this.nextButton.bind(this);
    this.setDescription = this.setDescription.bind(this);
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

  setDescription(text) {
    this.setState({ description: text });
    console.log("Saved checkin:");
    console.log(this.state.checkInFeelings);
    console.log(this.state.description);
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

    this.state.checkInFeelings.push(feeling);
  }

  nextButton() {
    if (this.state.checkInFeelings.length > 0) {
      if (this.state.next === true) {
        return <CheckinDescription
          setDescription={this.setDescription}
        />
      } else {
        return <Button onPress={() => {this.setState({ next: true })}}>Next</Button>
      }
    }
  }


  render() {
    return (
      <View>
        <FeelingsList feelings={this.state.checkInFeelings}/>
        <View>{this.nextButton()}</View>
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
