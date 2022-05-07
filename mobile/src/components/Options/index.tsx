import React from 'react';
import { Text, View } from 'react-native';
import { Copyright } from '../Copyright';
import { Option } from '../Option';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { styles } from './styles';
import { feedbackType } from '../Widget';

interface Props {
  onFeedbackTypeChange: (feedbackType : feedbackType) => void;
}

export function Options({ onFeedbackTypeChange }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Deixe o seu feedback
      </Text>
      <View style={styles.options}>
        {
          Object.entries(feedbackTypes).map(([key, value]) => (
            <Option 
                key={key} 
                title={ value.title} 
                image={value.image}
                onPress={() => onFeedbackTypeChange(key as feedbackType)}
             />
          ))
        }
      </View>
      <Copyright/>
    </View>
  );
}