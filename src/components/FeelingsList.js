import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import axios from 'axios';
import Feeling from './Feeling';

class FeelingsList extends Component {
  state = {
    feelings: []
  };
  // shouldComponentUpdate
  componentWillReceiveProps(nextProps) {
    if (nextProps.query) {
      axios.get(`http://localhost:3000/feelings?query=${nextProps.query}`).then(response => this.setState({ feelings: response.data }));
    }
  }

  renderFeelings() {
    return this.state.feelings.map(feeling => <Feeling key={feeling.id}>{feeling.name}</Feeling>);
  }

  render() {
    // console.log(this.props.query);
    // console.log(this.state.feelings);
    return (
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <View style={styles.listContainerStyle}>
          {this.renderFeelings()}
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  scrollViewStyle: {
    // justifyContent: 'center'
  },
  listContainerStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    position: 'relative',
  }

}

export default FeelingsList;
