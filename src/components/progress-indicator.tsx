import { StyleSheet, View, Text } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ReText } from 'react-native-redash';
type ProgressIndicatorProps = {
  readingTime: number;
  progress: SharedValue<number>;
  onReset?: () => void;
};

type ProgressState = 'idle' | 'expanded' | 'end';
const MIN_PROGESS_INDICATOR_WIDTH = 80;

export const ProgressIndicator = ({
  readingTime,
  progress,
  onReset = () => {},
}: ProgressIndicatorProps) => {
  const state: SharedValue<ProgressState> = useDerivedValue(() => {
    const v = Number(progress.value.toFixed(2));
    if (v === 0) return 'idle';
    if (v === 1) return 'end';
    return 'expanded';
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(
        state.value === 'expanded' ? 200 : MIN_PROGESS_INDICATOR_WIDTH,
      ),
    };
  }, [progress]);

  const rIdleViewStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(state.value === 'idle' ? 1 : 0),
    };
  }, [state]);

  const rEndViewStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(state.value === 'end' ? 1 : 0),
      pointerEvents: state.value === 'end' ? 'auto' : 'none',
    };
  }, [state]);

  const rExpandedViewStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(state.value === 'expanded' ? 1 : 0),
    };
  });

  const rExpandedProgressStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value * 100}%`,
    };
  }, [progress]);

  const progressPercentage = useDerivedValue(() => {
    return `${Math.round(progress.value * 100)}%`;
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, rStyle]}>
        <Animated.Text style={[styles.idleLabel, rIdleViewStyle]}>
          {readingTime} min
        </Animated.Text>

        <Animated.View
          onTouchEnd={() => {
            onReset();
          }}
          style={[{ position: 'absolute', zIndex: 1 }, rEndViewStyle]}>
          <AntDesign
            name="arrowup"
            size={32}
            color={'rgba(255,255,255, 0.5)'}
          />
        </Animated.View>

        <Animated.View style={[styles.expandedContainer, rExpandedViewStyle]}>
          <ReText style={styles.progressText} text={progressPercentage} />
          <View style={styles.progressBarContainer}>
            <Animated.View
              style={[styles.progressPercentage, rExpandedProgressStyle]}
            />
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: MIN_PROGESS_INDICATOR_WIDTH,
    aspectRatio: 1,
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    height: '100%',
    backgroundColor: '#2d2d2d',
    borderRadius: MIN_PROGESS_INDICATOR_WIDTH / 2,
    borderWidth: 5,
    borderColor: '#2020202',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  expandedContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  progressText: {
    color: '#9d9d9d',
    fontSize: 16,
    marginRight: 10,
  },
  progressBarContainer: {
    width: 100,
    height: 3,
    backgroundColor: '#191919',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressPercentage: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    top: 0,
    backgroundColor: '#9d9d9d',
  },
  idleLabel: {
    fontSize: 16,
    color: 'rgba(255,255,255, 0.5)',
    position: 'absolute',
  },
});
