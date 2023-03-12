import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import auth from '@react-native-firebase/auth'

export default function ChatMessage({ data }) {

  const user = auth().currentUser.toJSON();


 return (
   <View>
    <Text>Mensagem</Text>
   </View>
  );
}

const styles = StyleSheet.create({

})