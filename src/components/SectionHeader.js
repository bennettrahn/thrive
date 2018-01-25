import React, { Component } from 'react';
import { Text, View, Image, TouchableHighlight } from 'react-native';


class SeactionHeader extends Component {

  render () {
    const { textStyle, viewStyle, iconStyle, navStyle } = styles;

    return (
      <View style={viewStyle}>
        <Text style={textStyle}>{this.props.headerText}</Text>
      </View>
    );
  }
};

const styles = {
  viewStyle: {
    backgroundColor: 'rgb(171, 192, 228)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 45,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative',
  },
  textStyle: {
    fontSize: 20,
    padding: 5,
    color: 'rgb(45, 122, 43)',
    fontFamily: 'Helvetica',
  },
  iconStyle: {
    height: 40,
    width: 40,
  },
};

export default SeactionHeader;
