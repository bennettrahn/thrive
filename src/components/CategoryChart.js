import React, { Component } from 'react';
import { View } from 'react-native';

import { PieChart } from 'react-native-svg-charts';
import { Circle, G, Line, Rect, Text } from 'react-native-svg';



class CategoryChart extends Component {
  // constructor(props) {
  //   super(props);
    // this.figurePercent = this.figurePercent.bind(this);
  // }

  // componentWillReceiveProps(nextProps) {
  //   // if (nextProps.categories.length > 0) {
  //     total = 0
  //     nextProps.categories.forEach(category => {
  //       total += category[1];
  //     });
  //     this.setState({total: total})
  //
  //     let other = 0
  //     nextProps.categories.forEach(category => {
  //       percent = parseInt((parseFloat(category[1]) / total) * 100)
  //
  //       if (percent <= 5) {
  //         other += percent;
  //       } else {
  //         category.push(percent);
  //       }
  //     });
  //     this.setState({
  //       other: other,
  //     });
  //   // }
  // }

  // figurePercent(n, total) {
  //   return parseInt((parseFloat(n) / total) * 100)
  // }

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
    console.log(this.props.categories);
      const data = [];
      const names = [];
      this.props.categories.forEach(category => {
          data.push(category[1]);
          names.push(category[0]);
      });

      const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)

      const pieData = data
          .map((value, index) => ({
              value,
              color: randomColor(),
              key: names[index],
          }))


      return (
          <PieChart
              style={ { height: 400 } }
              data={ pieData }
              innerRadius={ 5 }
              outerRadius={ 55 }
              labelRadius={ 80 }


              renderDecorator={ ({ item, pieCentroid, labelCentroid, index }) => (
                  <G key={ index }>
                      <Line
                          x1={ labelCentroid[ 0 ]}
                          y1={ labelCentroid[ 1 ] }
                          x2={ pieCentroid[ 0 ] }
                          y2={ pieCentroid[ 1 ] }
                          stroke={ item.color }
                      />


                        <Rect
                            height={ 25 }
                            width={ item.key.length * 6 + 25 }
                            fill={ item.color }
                            rx={ 5 }
                            ry={ 5 }
                            y={ labelCentroid[1] > 0 ? (labelCentroid[1]) : (labelCentroid[1] - 25)  }
                            x={ labelCentroid[0] > 0 ? (labelCentroid[0]) : (labelCentroid[0] - (item.key.length * 6 + 25)) }
                        />
                          <Text
                              x={ labelCentroid[0] > 0 ? (labelCentroid[0]) : (labelCentroid[0] - (item.key.length * 6 + 25)) }
                              textAnchor={ 'start' }
                              y={ labelCentroid[1] > 0 ? (labelCentroid[1]) : (labelCentroid[1] - 25) }
                          >  { item.key }</Text>

                  </G>
              ) }

          />
      )
  }

};

const styles = {

}

export default CategoryChart;
