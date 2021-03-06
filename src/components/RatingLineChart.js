import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { LineChart, XAxis, YAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

class RatingLineChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feelingData: [],
      dateData: [],
    }

  }

  componentWillReceiveProps(nextProps) {
    let feelingData = [];
    let dateData = [];

    nextProps.day_averages.forEach((day) => {
      dateData.push(day[0]);
      feelingData.push(day[1]);
    });
    this.setState({ feelingData: feelingData });
    this.setState({ dateData: dateData });
  }

  render() {
    // console.log(LineChart);
    const data = this.state.feelingData;
    const dateData = this.state.dateData;

    return (
      <View style={styles.chartWholeStyle}>
          <LineChart
            style={ { height: 200} }
            dataPoints={ data }
            numberOfTicks={ 6 }
            fillColor={ 'purple' }
            shadowOffset={.5}
            svg={ {
              stroke: 'rgb(134, 65, 244)',
            } }
            shadowSvg={ {
              stroke: 'rgba(134, 65, 244, 0.2)',
              strokeWidth: 5,
            } }
            contentInset={ { top: 20, bottom: 20 } }
            curve={shape.curveLinear}
          />

        <XAxis
          style={ { paddingVertical: 10 } }
          values={ dateData }
          formatLabel={ (value, index) => value }
          chartType={ XAxis.Type.LINE }
          labelStyle={ { color: 'grey' } }
        />
      </View>
    );
  }
}

const styles = {
  chartWholeStyle: {
    margin: 20,
  }
}

export default RatingLineChart;
