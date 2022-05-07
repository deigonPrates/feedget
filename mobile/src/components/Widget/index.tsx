
import React, { useRef, useState } from 'react';
import { ChatTeardropDots } from 'phosphor-react-native';
import { TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { styles } from './styles';
import BottomSeet from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Options } from '../Options';
import { Form } from '../Form';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Success } from '../Success';

export type feedbackType = keyof typeof feedbackTypes;


function Widget() {

  const [feedbackType, setFeedbackType] = useState<feedbackType | null>(null);
  const [feedbackSend, setFeedbackSend] = useState(false);

  const buttonSeetRef = useRef<BottomSeet>(null);

  function handleOpen() {
    buttonSeetRef.current?.expand();
  }

  function handleRestartFeedback() {
    setFeedbackType(null);
    setFeedbackSend(false);
  }

  function handleFeedbackSend(){
    setFeedbackSend(true);
  }

  return (
    <>
        <TouchableOpacity 
          style={styles.button}
          onPress={handleOpen}>
            <ChatTeardropDots 
                size={24}
                weight="bold"
                color={theme.colors.text_on_brand_color} />
        </TouchableOpacity>

        <BottomSeet
          ref={buttonSeetRef}
          snapPoints={[1, 280]}
          backgroundStyle={styles.modal}
          handleIndicatorStyle={styles.indicator}
        > 
        {
          feedbackSend 
          ? 
            <Success sendAnotherFeedback={handleRestartFeedback}/>
          : 
            <> 
              { 
                feedbackType 
                ?
                  <Form 
                      feedbackType={feedbackType} 
                      onFeedbackTypeCanceled={handleRestartFeedback}
                      onFeedbackTypeSend={handleFeedbackSend} />
                :
                  <Options onFeedbackTypeChange={setFeedbackType}/>
              }
            </>

        }
        </BottomSeet>
    </>
  );
}

export default gestureHandlerRootHOC(Widget);