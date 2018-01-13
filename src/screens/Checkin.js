import React, { Component } from 'react';
import { AsyncStorage, ScrollView, View, Text, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';
import SearchBar from '../components/SearchBar';
import FeelingsList from '../components/FeelingsList';
import Button from '../components/Button';
import Header from '../components/Header';
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

    AsyncStorage.getItem('username').then((username) => {
      axios.post('http://localhost:3000/checkins/', {
        username: username,
        description: text,
        feelings: feelingsArr
      })
      .then(response => {
        console.log('Successfully posted:');
        console.log(response.data);
        Actions.Dashboard();
      })
      .catch(error => {
        console.log(error);
      });
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

  async userLogout() {
    try {
      await AsyncStorage.removeItem('username');
      Actions.Login();
    } catch (error) {
      console.log('AsyncStorage error' + error.message);
    }
  }

  render() {
    return (
      <View>
        <Header headerText='thrive' />
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

        <Button onPress={this.userLogout}>Log out</Button>
      </View>
    );
  }
}

const styles = {

}

export default Checkin;
