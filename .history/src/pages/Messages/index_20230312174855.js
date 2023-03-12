import React, { useEffect, useState } from 'react';
import {
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform,
  TextInput
} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

import ChatMessage from '../../Components/ChatMessage';

export default function Messages({ route }) {
  const { thread } = route.params;
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('');

  const user = auth().currentUser.toJSON();

  useEffect(() => {

    const unsubscriberListener = firestore().collection('MESSAGE_THREADS')
    .doc(thread._id)
    .collection('MESSAGES')
    .orderBy('createdAt', 'desc')
    .onSnapshot( querySnapshot => {
      const messages = querySnapshot.docs.map((doc) => {
        const firebaseData = doc.data();

        const data = {
          _id: doc.id,
          text: '',
          createdAt: firestore.FieldValue.serverTimestamp(),
          ...firebaseData
        }

        if(!firebaseData.system){
          data.user = {
            ...firebaseData.user,
            name: firebaseData.user.displayName
          }
        }

        return data;

      })

      setMessages(messages);
      // console.log(messages);

    })

    return () => unsubscriberListener();

  }, [])

 return (
   <SafeAreaView style={styles.container}>
    <FlatList 
      style={{ width: '100%' }}
      data={messages}
      keyExtractor={ item => item._id }
      renderItem={ ({item}) => <ChatMessage data={item} /> }
    />

    <KeyboardAvoidingView
      behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }
      style={{ width: '100%' }}
      keyboardVerticalOffset={100}
    >
      <View style={styles.containerInput}>

        <View style={styles.mainContainerInput}>
          <TextInput
            placeholder='Sua Mensagem...'
            style={styles.TextInput}
            value={input}
            onChangeText={(text) => setInput(text)}
          />
        </View>

      </View>
    </KeyboardAvoidingView>
    
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})