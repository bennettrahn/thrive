import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import axios from 'axios';
import Feeling from './Feeling';

class FeelingsList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      feelings: this.props.feelings ? this.props.feelings : []
    };

    this.handleFeelingClick = this.handleFeelingClick.bind(this);
  }


  handleFeelingClick(feeling) {
    let feelings = this.state.feelings;
    const index = feelings.indexOf(feeling);
    if ( index !== -1 ) {
      feelings.splice(index, 1);
    }
    this.setState(
      { feelings: feelings }
    );
    this.props.setCheckInFeelings(feeling)
  }
  // shouldComponentUpdate
  componentWillReceiveProps(nextProps) {
    if (nextProps.query) {
      axios.get(`http://localhost:3000/feelings?query=${nextProps.query}`).then(response => this.setState({ feelings: response.data }));
    }
  }

  renderFeelings() {
    return this.state.feelings.map(feeling => <Feeling
      key={feeling.id}
      onClick={this.handleFeelingClick}
      feeling={feeling}
    />);
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
