import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import auth from '@react-native-firebase/auth'

export default function ChatMessage({ data }) {
  const user = auth().currentUser.toJSON();

  const isMyMessage = useMemo(() => {
    return data?.user._id
  }, [data])

 return (
  <View style={styles.container}>
    <View style={styles.messageBox}>
      <Text style={styles.name}>Matheus fraga</Text>
      <Text style={styles.message}>{data.text}</Text>
    </View>
   </View>
  );
}

const styles = StyleSheet.create({
  container:{
    paddingHorizontal: 10,
  },
  messageBox:{
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#121212'
  }
})