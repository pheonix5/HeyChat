import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Messages() {
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