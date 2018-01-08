import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
    };

    this.handleQuery = this.handleQuery.bind(this)
  }

  // state = { text: '' };

  handleQuery(text) {
    this.setState({text});
    this.props.setQuery(text);
  }

  render() {
    return (
      <View>
        <TextInput
          style={styles.searchBarStyle}
          onChangeText={(text) => this.handleQuery(text)}
          value={this.state.text}
          autoCapitalize='none'
        />
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

export default SearchBar;
