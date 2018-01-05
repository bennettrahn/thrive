import React from 'react';
import { View, Text } from 'react-native';

const Feeling = (props) => {
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.textStyle}>{props.children}</Text>
    </View>
  );
};

const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
  },
  textStyle: {

  }
}

export default Feeling;
