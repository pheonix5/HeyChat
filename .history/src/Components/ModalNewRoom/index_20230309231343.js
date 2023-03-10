import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function ModalNewRoom({ setVisible }) {
  const [roomName, setRoomName] = useState('')

 return (
   <View style={styles.container}>
    <View style={styles.modal}></View>

    <View style={styles.modalContent}>
      <Text style={styles.title}>Criar um novo Grupo?</Text>
      <TextInput 
        value={roomName}
        onChangeText={(text) =>  setRoomName(text)}
        placeholder="Nome para sua sala?"
      />

      <TouchableOpacity style={styles.buttonCreate}>
        <Text style={styles.buttonText}>Criar Sala</Text>
      </TouchableOpacity>
    </View>
   </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'rgba(34, 34, 34, 0.4)'
  },
  modal:{
    flex: 1,
    backgroundColor: 'red'
  }
})