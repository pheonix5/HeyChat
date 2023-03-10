import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import auth from '@react-native-firebase/auth'

export default function ChatMessage({ data }) {
  console.log(data.user.displayName);
  const user = auth().currentUser.toJSON();

  const isMyMessage = useMemo(() => {
    return data?.user?._id === user.uid
  }, [data])

 return (
  <View style={styles.container}>
    <View style={[
        styles.messageBox, 
        {
          backgroundColor: isMyMessage ? '#DCF8C5' : '#fff',
          marginLeft: isMyMessage ? 50 : 0,
          marginRight: isMyMessage ? 0 : 50
        }
        ]}>

      
      { !isMyMessage && <Text style={styles.name}>teste</Text> }
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
  },
  name:{
    color: '#f53745',
    fontWeight: 'bold',
    marginBottom: 5
  },
})