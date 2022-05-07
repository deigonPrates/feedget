import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import successImg from '../../assets/success.png';
import { Copyright } from '../Copyright';

import { styles } from './styles';

interface Props{
  sendAnotherFeedback: () => void;
}

export function Success({sendAnotherFeedback}: Props) {
  return (
    <View style={styles.container}>
      <Image source={successImg} style={styles.image} />
      <Text style={styles.title}>Agradecemos seu feedback</Text>
      <TouchableOpacity style={styles.button} onPress={sendAnotherFeedback}>
        <Text style={styles.buttonTitle}>Quero enviar outro</Text>
      </TouchableOpacity>
      <Copyright/>
    </View>
  );
}