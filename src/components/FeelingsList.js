import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import axios from 'axios';
import Feeling from './Feeling';

class FeelingsList extends Component {
  state = { feelings: [] };

  componentWillMount() {
    axios.get('http://localhost:3000/feelings').then(response => this.setState({ feelings: response.data }));
  }

  renderFeelings() {
    return this.state.feelings.map(feeling => <Feeling key={feeling.id}>{feeling.name}</Feeling>);
  }

  render() {
    console.log(this.state.feelings);
    return (
      <ScrollView>
        {this.renderFeelings()}
      </ScrollView>
    );
  }
}

export default FeelingsList;
