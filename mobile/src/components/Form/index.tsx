
import React, { useState } from 'react';
import { ArrowLeft } from 'phosphor-react-native';
import { 
    View,
    TextInput,
    Image,
    Text,
    TouchableOpacity
 } from 'react-native';
import { theme } from '../../theme';
import { styles } from './styles';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { feedbackType } from '../Widget';
import {ScreenshotButton } from '../ScreenshotButton';
import { Button } from '../Button'
import { captureScreen } from 'react-native-view-shot';
import { api } from '../libs/api';
import * as FileSystem from 'expo-file-system';


interface Props{
    feedbackType: feedbackType,
    onFeedbackTypeCanceled: ()=>void;
    onFeedbackTypeSend: ()=>void;
}

export function Form({ feedbackType, onFeedbackTypeCanceled, onFeedbackTypeSend }: Props) {
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [isSendFeedback, setIsSendFeedback] = useState(false);
    const [comment, setComment] = useState("");
    
    const feedbackTypeInfo = feedbackTypes[feedbackType];

    function handleScreenshot(){
        captureScreen({
            format: 'jpg',
            quality: 0.8
        })
        .then((uri) => setScreenshot(uri))
        .catch((error) => console.log(error));
    }

    function handleScreenshotRemove(){
        setScreenshot(null);
    }

   async function handleSendFeedback() {
       if(isSendFeedback){
           return;
       }

       setIsSendFeedback(true);
       const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64'});
       
       try {
            
         await api.post('feedback', {
             type: feedbackType,
             screenshot: `data:image/png;base64, ${screenshotBase64}`,
             comment
         });
         
         onFeedbackTypeSend();

       } catch (error) {
          console.log(error);
          setIsSendFeedback(false);
       }
   }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={onFeedbackTypeCanceled}>
                <ArrowLeft 
                    size={24}
                    weight="bold"
                    color={theme.colors.text_secondary}/>
            </TouchableOpacity>
            <View style={styles.titleContainer}>
                <Image 
                    source={feedbackTypeInfo.image} 
                    style={styles.image} >
                </Image>
                <Text style={styles.titleText} >
                        {feedbackTypeInfo.title} 
                </Text>
            </View>
        </View>
        <TextInput
            multiline 
            style={styles.input}
            placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
            placeholderTextColor={theme.colors.text_secondary}
            onChangeText={setComment}>
        </TextInput>
        <View style={styles.footer}>
            <ScreenshotButton 
                onTakeShot={handleScreenshot}
                onRemoveShot={handleScreenshotRemove}
                screenshot={screenshot}  
            />
            <Button 
                onPress={handleSendFeedback}
                isLoading={isSendFeedback}
            ></Button>
        </View>
    </View>
  );
}