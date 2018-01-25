import React, { Component } from 'react';
import { View } from 'react-native';

import { PieChart } from 'react-native-svg-charts';
import { Circle, G, Line, Rect, Text } from 'react-native-svg';



class CategoryChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colorCodes: ["#90AFC5", "#336B87", "#2A3132", "#A43820", "#505160", "#68829E", "#AEBD38", "#598234", "#003B46", "#07575B", "#66A5AD", "#C4DFE6", "#2F4406", "#48690F", "#A2C523", "#726A95", "#351F39", "#757081"]
    };
  }

  randomColor() {
    colorCodes = this.state.colorCodes
    const index = Math.floor(Math.random() * colorCodes.length)
    const color = colorCodes.splice(index, 1)
    this.setState({colorCodes: colorCodes})
    return color
  }

  render() {
    const data = [];
    const names = [];
    this.props.categories.forEach(category => {
      data.push(category[1]);
      names.push(category[0]);
    });

    const colorCodes = ["#336B87", "#A43820", "#90AFC5", "#351F39", "#68829E", "#AEBD38", "#598234", "#003B46", "#07575B", "#66A5AD", "#C4DFE6", "#2F4406", "#505160", "#48690F","#2A3132", "#A2C523", "#726A95", "#757081"]
    const pickRandomColor = () => (this.randomColor())

    const pieData = data
    .map((value, index) => ({
      value,
      color: colorCodes[index],
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
              fill='white'
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
