import React, { Component } from 'react';
import { View } from 'react-native';

import { PieChart } from 'react-native-svg-charts';
import { Circle, G, Line, Rect, Text } from 'react-native-svg';



class CategoryChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      total: 1,
      // other: 0,
    };

    this.renderCategories = this.renderCategories.bind(this);
    this.figurePercent = this.figurePercent.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.categories.length > 0) {
      total = 0
      nextProps.categories.forEach(category => {
        total += category[1];
      });
      this.setState({total: total})

      let other = 0
      nextProps.categories.forEach(category => {
        percent = parseInt((parseFloat(category[1]) / total) * 100)

        if (percent <= 5) {
          other += percent;
        } else {
          category.push(percent);
        }
      });
      this.setState({
        other: other,
      });
    // }
  }

  figurePercent(n, total) {
    return parseInt((parseFloat(n) / total) * 100)
  }

  // renderCategories() {
  //   return this.props.categories.map(category => {
  //     if (category[2]) {
  //       return <Text
  //           key={category[0]}
  //         >
  //         {category[2]}% - {category[0]}
  //         </Text>
  //     }
  //   });
  // }

  // render() {
  //   return (
  //     <View>
  //       {this.renderCategories()}
  //       <Text>{this.state.other}% - other</Text>
  //     </View>
  //   );
  // }
  render() {

    const data = [];
    this.props.categories.forEach(category => {
      if (category[2]) {
        data.push(category[2]);
      }
    });
    data.push(this.state.other);

    const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)

    const pieData = data
    .filter(value => value > 0)
    .map((value, index) => ({
      value,
      color: randomColor(),
      key: `pie-${index}`,
    }))

    return (
      <PieChart
        style={ { height: 200 } }
        data={ pieData }
        innerRadius={ 5 }
        outerRadius={ 55 }
        labelRadius={ 80 }
        renderDecorator={ ({ item, pieCentroid, labelCentroid, index }) => (
          <G key={ index }>
            <Line
              x1={ labelCentroid[ 0 ] }
              y1={ labelCentroid[ 1 ] }
              x2={ pieCentroid[ 0 ] }
              y2={ pieCentroid[ 1 ] }
              stroke={ item.color }
            />
            <Circle
              cx={ labelCentroid[ 0 ] }
              cy={ labelCentroid[ 1 ] }
              r={ 15 }
              fill={ item.color }
            />

          </G>
        ) }
      />
    )
  }

};

const styles = {

}

export default CategoryChart;
