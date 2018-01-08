import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';


const Feeling = (props) => {
  return (
    <TouchableOpacity
      onPress={() => props.onClick(props.feeling)} style={styles.containerStyle}
    >
      <Text style={styles.textStyle}>{props.feeling.name}</Text>
    </TouchableOpacity>
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
// const styles = {
//   textStyle: {
//     alignSelf: 'center',
//     color: '#007aff',
//     fontSize: 16,
//     fontWeight: '600',
//     paddingTop: 10,
//     paddingBottom: 10,
//   },
//
//   buttonStyle: {
//     flex: 1,  //this means I want this content to fill up as much space as it possibly can.
//     alignSelf: 'stretch',
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: '#007aff',
//     marginLeft: 5,
//     marginRight: 5,
//   }
// }

export default Feeling;
