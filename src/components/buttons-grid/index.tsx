import { View, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { TouchableFeedback } from './touchable-feedback';

const buttonItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, 'backspace'] as const;

type ButtonItem = (typeof buttonItems)[number];
type ButtonsGridProps = {
  onButtonPressed: (item: ButtonItem) => void;
};

export const ButtonsGrid = ({ onButtonPressed }: ButtonsGridProps) => {
  return (
    <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
      {buttonItems.map((item, index) => (
        <View
          key={index}
          style={{
            width: '33.33%',
            height: '25%',
            padding: 5,
            paddingHorizontal: 15,
            paddingVertical: 15,
          }}>
          <TouchableFeedback
            onPress={() => {
              return onButtonPressed(item);
            }}
            disabled={item === null}
            style={{
              flex: 1,
              borderRadius: 20,
              borderCurve: 'continuous',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {typeof item === 'number' && (
              <Text
                style={{
                  fontSize: 30,
                  color: 'white',
                  fontFamily: 'SF-Pro-Rounded-Bold',
                }}>
                {item}
              </Text>
            )}
            {item === 'backspace' && (
              <FontAwesome5 name="backspace" size={24} color="#fff" />
            )}
          </TouchableFeedback>
        </View>
      ))}
    </View>
  );
};
