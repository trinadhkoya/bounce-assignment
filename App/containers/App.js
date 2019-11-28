import React from 'react';
import {View} from 'react-native';
import Header from '../components/Header';
import HeaderText from '../components/HeaderText';
import styles from '../../App.styles';
import Button from '../components/Button';
import LinearGradient from 'react-native-linear-gradient';

export default class App extends React.Component<{}> {
  render() {
    return (
      <View style={styles.root}>
        <Header
          leftComponent={
            <HeaderText title={'ZUPAY'} style={styles.leftTVStyle} />
          }
          rightComponent={
            <HeaderText title={'BACK'} style={styles.rightTVStyle} />
          }
        />

        <View style={styles.buttonView}>
          <Button
            ViewComponent={LinearGradient} // Don't forget this!
            linearGradientProps={{
              colors: ['#7347b1', '#ae63a6', '#f3819f'],
              start: {x: 0, y: 0.5},
              end: {x: 1, y: 0.5},
            }}
            title={'VIEW BALANCE'}
            titleStyle={styles.titleStyle}
            buttonStyle={styles.buttonStyle}
          />
        </View>
      </View>
    );
  }
}
