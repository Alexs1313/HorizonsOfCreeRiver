import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

const AnimatedView = ({ children, friction, tension, duration }) => {
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const translateY = useRef(new Animated.Value(230)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: friction,
        tension: tension,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: duration,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        {
          transform: [{ scale: scaleAnim }, { translateY: translateY }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default AnimatedView;
