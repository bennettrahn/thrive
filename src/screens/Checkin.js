import React, { Component } from 'react';
import { ScrollView, View, Text, TextInput } from 'react-native';
import SearchBar from '../components/SearchBar';
import FeelingsList from '../components/FeelingsList';
import Button from '../components/Button';
import CheckinDescription from '../components/CheckinDescription';
import axios from 'axios';

class Checkin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkInFeelings: [],
      searchedFeelings: [],
      next: false,
    };

    this.setSearchedFeelings = this.setSearchedFeelings.bind(this);
    this.handleFeelingClick = this.handleFeelingClick.bind(this);
    this.nextButton = this.nextButton.bind(this);
    this.saveCheckin = this.saveCheckin.bind(this);
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

  saveCheckin(text) {
    this.setState({ description: text });

    let feelingsArr = [];
    this.state.checkInFeelings.forEach(feeling => {
      feelingsArr.push(feeling.id)
    });
    console.log(feelingsArr);

    axios.post('http://localhost:3000/checkins/', {
      user_id: this.props.userId,
      description: text,
      feelings: feelingsArr
      //come back and fix this when the array thing works
    })
    .then(response => {
      console.log('Successfully posted:');
      console.log(response.data);
      this.props.checkinComplete();
    })
    .catch(error => {
      console.log(error);
    });
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
          saveCheckin={this.saveCheckin}
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
