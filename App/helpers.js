import React from 'react';
import PropTypes from 'prop-types';

import {
  Dimensions,
  Platform,
  View,
  ViewPropTypes as RNViewPropTypes,
  StatusBar,
} from 'react-native';

const ViewPropTypes = RNViewPropTypes || View.propTypes;

const renderNode = (Component, content, defaultProps) => {
  if (content == null || content === false) {
    return null;
  }
  if (React.isValidElement(content)) {
    return content;
  }
  if (typeof content === 'function') {
    return content();
  }
  // Just in case
  if (content === true) {
    return <Component {...defaultProps} />;
  }
  if (typeof content === 'string' || typeof content === 'number') {
    return <Component {...defaultProps}>{content}</Component>;
  }
  return <Component {...defaultProps} {...content} />;
};

const nodeType = PropTypes.oneOfType([
  PropTypes.element,
  PropTypes.object,
  PropTypes.bool,
  PropTypes.func,
]);

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const {height: W_HEIGHT, width: W_WIDTH} = Dimensions.get('window');

let isIPhoneX = false;

if (Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS) {
  isIPhoneX =
    (W_WIDTH === X_WIDTH && W_HEIGHT === X_HEIGHT) ||
    (W_WIDTH === XSMAX_WIDTH && W_HEIGHT === XSMAX_HEIGHT);
}

// const getExpoRoot = () => global.Expo || global.__expo || global.__exponent;

// const isExpo = () => getExpoRoot() !== undefined;

const getStatusBarHeight = skipAndroid =>
  Platform.select({
    ios: isIPhoneX ? 44 : 20,
    android: skipAndroid ? 0 : StatusBar.currentHeight,
    default: 0,
  });

const colors = {
  viewBG: '#19133c',
  primary: '#1292B4',
  white: '#FFF',
  lighter: '#F3F3F3',
  light: '#DAE1E7',
  dark: '#444',
  black: '#000',
  secondary: '#8F0CE8',
  grey0: '#393e42',
  grey1: '#43484d',
  grey2: '#5e6977',
  grey3: '#86939e',
  grey4: '#bdc6cf',
  grey5: '#e1e8ee',
  greyOutline: '#bbb',
  searchBg: '#303337',
  success: '#52c41a',
  error: '#ff190c',
  warning: '#faad14',
  disabled: 'hsl(208, 8%, 90%)',
};
const conditionalStyle = (condition, style) => (condition ? style : {});


export {getStatusBarHeight, nodeType, renderNode, colors,conditionalStyle};
