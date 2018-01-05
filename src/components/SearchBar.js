import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import axios from 'axios';
import FeelingsList from './FeelingsList';

class Input extends Component {

  state = { text: '' };

  render() {
    return (
      <View>
        <TextInput
          style={styles.searchBarStyle}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          autoCapitalize='none'
        />
        <FeelingsList query={this.state.text}/>
      </View>
    );
  }
}

const styles = {
  searchBarStyle: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  }
}

export default Input;
