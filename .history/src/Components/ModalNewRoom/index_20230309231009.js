import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function ModalNewRoom({ setVisible }) {
  const [roomName, setRoomName] = useState('')

 return (
   <View style={styles.container}>
    <View></View>

    <View style={styles.modalContent}>
      <Text style={styles.title}>Criar um novo Grupo?</Text>
    </View>

   </View>
  );
}

const styles = StyleSheet.create({

})