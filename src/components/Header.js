import React, { Component } from 'react';
import { AsyncStorage, Text, View, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

class Header extends Component {
  constructor(props) {
    super(props);

    this.renderRight = this.renderRight.bind(this);
  }

  async userLogout() {
    try {
      await AsyncStorage.removeItem('username');
      Actions.Login();
    } catch (error) {
      console.log('AsyncStorage error' + error.message);
    }
  }

  renderRight() {
    if (this.props.login) {
      return <Text style={styles.navStyle}>Welcome</Text>
    } else {
      return (
        <TouchableOpacity onPress={this.userLogout} style={styles.navTouchStyle}>
          <Text style={styles.navTextStyle}>Logout </Text>
          </TouchableOpacity>
      );
    }
  }

  render () {
    const { textStyle, viewStyle, iconStyle, navStyle } = styles;

    return (
      <View style={viewStyle}>
        <Text style={textStyle}>{this.props.headerText}</Text>
        <Image
          style={iconStyle}
          source={require('../../icon.png')}
        />
        {this.renderRight()}
      </View>
    );
  }
};
// source={{ uri: 'https://d30y9cdsu7xlg0.cloudfront.net/png/152571-200.png' }}

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
    borderBottomColor: 'rgb(165, 165, 165)',
    borderBottomWidth: 1,
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
  navStyle:{
    padding: 5,
    width: '30%',
    textAlign: 'right',
    fontSize: 16,
  },
  navTouchStyle: {
    padding: 5,
    width: '30%',
  },
  navTextStyle:{
    textAlign: 'right',
    fontSize: 16,
  },
  iconStyle: {
    height: 40,
    width: 40,
  },
};

export default Header;
