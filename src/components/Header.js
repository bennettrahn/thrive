import React from 'react';
import { Text, View, Image } from 'react-native';

const Header = (props) => {
  const { textStyle, viewStyle, iconStyle, navStyle } = styles;

  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.headerText}</Text>
      <Image
        style={iconStyle}
        source={{ uri: 'https://d30y9cdsu7xlg0.cloudfront.net/png/152571-200.png' }}
      />
      <Text style={navStyle}>nav</Text>
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: 'rgb(171, 192, 228)',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: 60,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative',
  },
  textStyle: {
    fontSize: 20,
    padding: 5,
    width: '30%',
    color: 'rgb(45, 122, 43)',
    fontFamily: 'Helvetica',
  },
  navStyle: {
    fontSize: 20,
    padding: 5,
    width: '30%',
    textAlign: 'right',
  },
  iconStyle: {
    height: 20,
    width: 20,
  },
};

export default Header;
