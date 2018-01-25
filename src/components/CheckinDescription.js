import React, { Component } from 'react';
import { TextInput, View } from 'react-native';
import Button from './Button';


class CheckinDescription extends Component {
  state = {
    text: ''
  }

  render() {
    return (
      <View>
        <TextInput
          onChangeText={(text) => this.setState({ text: text })}
          value={this.state.text}
          autoCapitalize='none'
          style={styles.textBoxStyle}
          multiline={true}
        />
        <Button onPress={() => {this.props.saveCheckin(this.state.text)}}>Next</Button>
      </View>
    );
  }
}

const styles = {
  textBoxStyle: {
    height: 100,
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

export default CheckinDescription;
