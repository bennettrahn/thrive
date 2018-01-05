import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';

export class Input extends Component {

  state = { text: 'a' };

  render() {
    return (
      <View>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <Text>{this.state.text}</Text>
      </View>
    );
  }
}

export default Input;
