import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors, conditionalStyle, nodeType, renderNode} from '../helpers';
import ViewPropTypes from '../config';
import LinearGradient from 'react-native-linear-gradient';

import Color from 'color';

// import Icon from '../icons/Icon';

const defaultLoadingProps = type => ({
  color: type === 'solid' ? 'white' : colors.primary,
  size: 'small',
});

class Button extends Component {
  componentDidMount() {
    const {linearGradientProps, ViewComponent} = this.props;
    if (linearGradientProps && !global.Expo && !ViewComponent) {
      console.error(
        "You need to pass a ViewComponent to use linearGradientProps !\nExample: ViewComponent={require('react-native-linear-gradient')}",
      );
    }
  }

  handleOnPress = () => {
    const {loading, onPress} = this.props;

    if (!loading) {
      onPress();
    }
  };

  render() {
    const {
      TouchableComponent,
      containerStyle,
      onPress,
      buttonStyle,
      type,
      loading,
      loadingStyle,
      loadingProps: passedLoadingProps,
      title,
      titleProps,
      titleStyle: passedTitleStyle,
      icon,
      iconContainerStyle,
      iconRight,
      disabled,
      disabledStyle,
      disabledTitleStyle,
      raised,
      linearGradientProps,
      ViewComponent = !disabled && linearGradientProps ? LinearGradient : View,
      ...attributes
    } = this.props;

    const titleStyle = StyleSheet.flatten([
      styles.title(type),
      passedTitleStyle,
      disabled && styles.disabledTitle(),
      disabled && disabledTitleStyle,
    ]);

    const background =
      Platform.OS === 'android' && Platform.Version >= 21
        ? TouchableNativeFeedback.Ripple(
            Color(titleStyle.color)
              .alpha(0.32)
              .rgb()
              .string(),
            false,
          )
        : undefined;

    const loadingProps = {
      ...defaultLoadingProps(type),
      ...passedLoadingProps,
    };

    const accessibilityStates = [
      ...(disabled ? ['disabled'] : []),
      ...(loading ? ['busy'] : []),
    ];

    return (
      <View
        style={StyleSheet.flatten([
          styles.container,
          {
            borderRadius:
              buttonStyle.borderRadius || styles.container.borderRadius,
          },
          containerStyle,
          raised && !disabled && styles.raised(type),
        ])}>
        <TouchableComponent
          onPress={this.handleOnPress}
          delayPressIn={0}
          activeOpacity={0.3}
          accessibilityRole="button"
          accessibilityStates={accessibilityStates}
          disabled={disabled}
          background={background}
          {...attributes}>
          <ViewComponent
            {...linearGradientProps}
            style={StyleSheet.flatten([
              styles.button(type),
              buttonStyle,
              disabled && styles.disabled(type),
              disabled && disabledStyle,
            ])}>
            {/*{loading && (*/}
            {/*  <ActivityIndicator*/}
            {/*    style={StyleSheet.flatten([styles.loading, loadingStyle])}*/}
            {/*    color={loadingProps.color}*/}
            {/*    size={loadingProps.size}*/}
            {/*    {...loadingProps}*/}
            {/*  />*/}
            {/*)}*/}

            {/*{!loading &&*/}
            {/*  icon &&*/}
            {/*  !iconRight &&*/}
            {/*  renderNode(Icon, icon, {*/}
            {/*    containerStyle: StyleSheet.flatten([*/}
            {/*      styles.iconContainer,*/}
            {/*      iconContainerStyle,*/}
            {/*    ]),*/}
            {/*  })}*/}

            {!loading && !!title && (
              <Text style={titleStyle} {...titleProps}>
                {title}
              </Text>
            )}

            {/*{!loading &&*/}
            {/*  icon &&*/}
            {/*  iconRight &&*/}
            {/*  renderNode(Icon, icon, {*/}
            {/*    containerStyle: StyleSheet.flatten([*/}
            {/*      styles.iconContainer,*/}
            {/*      iconContainerStyle,*/}
            {/*    ]),*/}
            {/*  })}*/}
          </ViewComponent>
        </TouchableComponent>
      </View>
    );
  }
}

Button.propTypes = {
  title: PropTypes.string,
  titleStyle: Text.propTypes.style,
  titleProps: PropTypes.object,
  buttonStyle: ViewPropTypes.style,
  type: PropTypes.oneOf(['solid', 'clear', 'outline']),
  loading: PropTypes.bool,
  loadingStyle: ViewPropTypes.style,
  loadingProps: PropTypes.object,
  onPress: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  icon: nodeType,
  iconContainerStyle: ViewPropTypes.style,
  iconRight: PropTypes.bool,
  linearGradientProps: PropTypes.object,
  TouchableComponent: PropTypes.elementType,
  ViewComponent: PropTypes.elementType,
  disabled: PropTypes.bool,
  disabledStyle: ViewPropTypes.style,
  disabledTitleStyle: Text.propTypes.style,
  raised: PropTypes.bool,
};

Button.defaultProps = {
  title: '',
  iconRight: false,
  TouchableComponent: Platform.select({
    android: TouchableNativeFeedback,
    default: TouchableOpacity,
  }),
  onPress: () => console.log('Please attach a method to this component'),
  type: 'solid',
  buttonStyle: {
    borderRadius: 3,
  },
  disabled: false,
  raised: false,
  loading: false,
};

const styles = {
  button: type => ({
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    backgroundColor: type === 'solid' ? colors.primary : 'transparent',
    padding: 8,
    borderWidth: type === 'outline' ? StyleSheet.hairlineWidth : 0,
    borderColor: colors.primary,
  }),
  container: {
    overflow: 'hidden',
    borderRadius: 3,
  },
  disabled: (type, theme) => ({
    ...conditionalStyle(type === 'solid', {
      backgroundColor: colors.disabled,
    }),
    ...conditionalStyle(type === 'outline', {
      color: colors.disabled.darken(0.3),
    }),
  }),
  disabledTitle: () => ({
    color: colors.disabled.darken(0.3),
  }),
  title: type => ({
    color: type === 'solid' ? 'white' : colors.primary,
    fontSize: 16,
    textAlign: 'center',
    paddingTop: 2,
    paddingBottom: 1,
    ...Platform.select({
      android: {
        fontFamily: 'sans-serif-medium',
      },
      default: {
        fontSize: 18,
      },
    }),
  }),
  iconContainer: {
    marginHorizontal: 5,
  },
  raised: type =>
    type !== 'clear' && {
      backgroundColor: '#fff',
      ...Platform.select({
        android: {
          elevation: 4,
        },
        default: {
          shadowColor: 'rgba(0,0,0, .4)',
          shadowOffset: {height: 1, width: 1},
          shadowOpacity: 1,
          shadowRadius: 1,
        },
      }),
    },
  loading: {
    marginVertical: 2,
  },
};

export default Button;
