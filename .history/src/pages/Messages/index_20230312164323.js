import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

export default function Messages({ route }) {
  const { threads } = route.params;
  const [messages, setMessages] = useState([])

  useEffect(() => {

    const unsubscriberListener = 

  } ,[])

 return (
   <View style={styles.container}>
    <Text>Tela de Mensages</Text>
   </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})