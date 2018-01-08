import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import Feeling from './Feeling';

class FeelingsList extends Component {
  renderFeelings() {
    return this.props.feelings.map(feeling => <Feeling
      key={feeling.id}
      onClick={this.props.handleFeelingClick}
      feeling={feeling}
    />);
  }

  render() {
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
