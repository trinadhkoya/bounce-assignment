import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../helpers';
import PropTypes from 'prop-types';

const HeaderText = props => {
  return (
    <View>
      <Text style={[styles.titleTV, props.style]}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleTV: {
    fontSize: 20,
    color: colors.white,
  },
});

const propTypes = {
  title: PropTypes.string.isRequired,
  style: PropTypes.node,
};
const defaultProps = {
  title: null,
  style: {} || undefined,
};

export default HeaderText;
