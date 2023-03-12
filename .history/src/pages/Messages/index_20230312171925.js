import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

import ChatMessage from '../../Components/ChatMessage';

export default function Messages({ route }) {
  const { thread } = route.params;
  const [messages, setMessages] = useState([])

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
      data={messages}
      keyExtractor={ item => item._id }
      renderItem={ ({item}) => <ChatMessage data={item} /> }
    />
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