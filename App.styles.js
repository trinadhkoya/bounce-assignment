import {StyleSheet} from 'react-native';
import {colors} from './App/helpers';

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.viewBG,
    flex: 1,
  },
  leftTVStyle: {
    fontSize: 22,
    color: colors.white,
    fontWeight: 'bold',
  },
  rightTVStyle: {
    fontSize: 12,
    color: colors.white,
  },
  buttonStyle: {
    height: 50,
  },
  titleStyle: {
    fontSize: 16,
    fontWeight: '500',
  },
  buttonView: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    marginHorizontal: 20,
  },
});
export default styles;
