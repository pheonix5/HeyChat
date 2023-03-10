import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function FabButton() {
 return (
   <TouchableOpacity style={styles.containerButton}>
    <View>
        <Text style={styles.text}>+</Text>
    </View>
   </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  containerButton:{
    backgroundColor: '#2e54d4',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text:{
    fontSize: 35,
    color: '#FFF',
    fontWeight: 'bold'
  }
})