import React, { useRef, useEffect } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';

const AnimatedPopup = ({ visible, onClose, children, duration = 700 }) => {
  const scaleAnim = useRef(new Animated.Value(0.7)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const isAnimating = useRef(false);
  const lastVisible = useRef(visible);

  useEffect(() => {
    if (visible && !lastVisible.current) {
      scaleAnim.setValue(0.7);
      opacityAnim.setValue(0);

      isAnimating.current = true;
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 6,
          tension: 100,
          useNativeDriver: true,
        }),
      ]).start(() => {
        isAnimating.current = false;
      });
    } else if (!visible && lastVisible.current) {
      isAnimating.current = true;
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: duration / 2,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.7,
          duration: duration / 2,
          useNativeDriver: true,
        }),
      ]).start(() => {
        isAnimating.current = false;
      });
    }
    lastVisible.current = visible;
  }, [visible, duration, scaleAnim, opacityAnim]);

  return (
    <View style={styles.absoluteFill} pointerEvents={visible ? 'auto' : 'none'}>
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={[styles.overlay, { opacity: opacityAnim }]} />
      </TouchableWithoutFeedback>
      <View style={styles.center}>
        <Animated.View
          style={[
            styles.content,
            {
              opacity: opacityAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Image source={require('../assets/images/popUp.png')} />
          {children}
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  absoluteFill: {
    position: 'absolute',
    left: 50,
    right: 50,
    top: 80,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    backgroundColor: '#3C3D3F',
    borderRadius: 34,
    padding: 24,
    minWidth: 270,
    minHeight: 109,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.7,
    shadowOffset: { width: 0, height: 17 },
    shadowRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});

export default AnimatedPopup;
