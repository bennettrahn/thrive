import React, { Component } from 'react';
import { View, Text } from 'react-native';

// import CheckinView from './CheckinView'

class CheckinList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      total: 1

    };

    this.renderCategories = this.renderCategories.bind(this);
    this.figurePercent = this.figurePercent.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.categories.length > 0) {
      total = 0
      nextProps.categories.forEach(category => {
        total += category[1];
      });
      this.setState({total: total})



    }
  }

  figurePercent(n) {
    const percent = parseInt((parseFloat(n) / this.state.total) * 100)
      // if (percent <= 5) {
      //   const other = this.state.other + percent;
        // this.setState({
        //   other: other,
        // });
      // } else {
        return percent;
      // }
  }

  renderCategories() {
    return this.props.categories.map(category => {
      const percent = this.figurePercent(category[1])
      if (category[1] === 1) {
        console.log('haha');
      }
      return <Text
          key={category[0]}
        >
        {percent}% - {category[0]}
        </Text>
    });
  }

  render() {
    // console.log(this.props.);
    return (
      <View>
        {this.renderCategories()}
      </View>
    );
  }

};

const styles = {

}

export default CheckinList;
