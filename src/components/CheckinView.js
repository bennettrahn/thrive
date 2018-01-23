import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import FeelingsList from './FeelingsList'


class CheckinView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: props.checkin.description,
      date: props.checkin.created_at,
      feelings: [],
    };

    this.renderFeelings = this.renderFeelings.bind(this);
  }

  formatTime(d) {
    var hr = d.getHours();
    var min = d.getMinutes();
    if (min < 10) {
      min = "0" + min;
    }
    var ampm = "am";
    if( hr > 12 ) {
      hr -= 12;
      ampm = "pm";
    }
    return hr + ":" + min + ampm;
  }

  formatDate(d) {
    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    let day;
    const dnow = new Date();
    if (d.getDate() === dnow.getDate()) {
      day = 'Today'
    } else if (d.getDate() === (dnow.getDate() - 1)) {
      day = 'Yesterday'
    } else {
      day = days[d.getDay()]
    }
    // console.log(day);
    // return `${d.getMonth() + 1}/${d.getDate()}`;
    return day;
  }

  componentWillMount() {
    const date = new Date(this.state.date);
    const dateString = this.formatDate(date);
    const timeString = this.formatTime(date);

    let feelings = this.props.checkin.feelings;
    let lineTwoFeels = [];

    if (feelings.length > 2) {
      lineTwoFeels = feelings.slice(2, (feelings.length));
      feelings = feelings.slice(0, 2);
    }


    this.setState({
      date: dateString,
      time: timeString,
      feelings: feelings,
      lineTwoFeels: lineTwoFeels
    });
  }

  renderFeelings() {
    let feelings = '';
    this.state.feelings.forEach(feeling => {
        feelings += `${feeling.name} | `;
    });
    feelings = feelings.slice(0, -3);
    return <Text style={styles.feelTextStyle}>{feelings}</Text>
  }

  renderDescription() {
    const { iconStyle, inlineStyle, caretStyle, descriptionStyle } = styles;
    let moreFeels;
    if (this.state.lineTwoFeels.length > 0) {

      let feelingText = '';
      this.state.lineTwoFeels.forEach(feeling => {
        if (feelingText.length < 25) {
          feelingText += `${feeling.name} | `;
        } else {
          feelingText = feelingText.slice(0, -3);
          feelingText += `
${feeling.name} | `;
        }
      });
      feelingText = feelingText.slice(0, -3);

      moreFeels = <Text style={{fontWeight: 'bold'}}>{feelingText}</Text>
    }

    if (!this.state.expanded) {
      return (
        <TouchableOpacity
          onPress={() => {this.setState({expanded: true})}}
        >
          <Text style={iconStyle}>...</Text>
        </TouchableOpacity>
      );
    } else {
      return(
        <View style={inlineStyle}>
          <TouchableOpacity
            onPress={() => {this.setState({expanded: false})}}
            style={caretStyle}
          >
            <Text style={iconStyle}> ^ </Text>
          </TouchableOpacity>
          <View>
            {moreFeels}
            <Text style={descriptionStyle}>{this.state.description}</Text>
          </View>
        </View>
      );
    }
  }

  render() {
    // console.log(this.props.checkin);
    const { listItemStyle, inlineStyle, dateStyle } = styles
    return (
      <View style={listItemStyle}>
        <View style={inlineStyle}>
          {this.renderFeelings()}
          <Text style={dateStyle}>{this.state.date}</Text>
        </View>
        <View style={inlineStyle}>
          {this.renderDescription()}
          <Text style={dateStyle}>{this.state.time}</Text>
        </View>
      </View>
    );
  }

};

const styles = {
  listItemStyle: {
    marginLeft: 25,
    marginRight: 25,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey'
  },
  inlineStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  feelTextStyle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconStyle: {
    color: 'darkgrey',
    fontSize: 18,
  },
  dateStyle: {
    color: 'darkgrey',
  },
  caretStyle: {
    // flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingRight: 10,
  },
  descriptionStyle: {
    paddingLeft: 5,
    marginTop: 10,
  }
}

export default CheckinView;
