import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'

export default function ModalNewRoom({ setVisible }) {
  const [roomName, setRoomName] = useState('')

  const user = auth().currentUser.toJSON();

  function handleButtonCreate(){
    if(roomName === '') return;

    createRoom();
  }

  //criar nova sala no firestore
  function createRoom(){

    firestore()
    .collection('MESSAGE_THREADS')
    .add({
      name: roomName,
      owner: user.uid,
      lastMessage:{
        text: `Grupo ${roomName} Criado. Bem Vindo!`,
        createdAt: firestore.FieldValue.serverTimestamp(),
      }
    })
    .then((docRef) => {
      docRef.collection('MESSAGES').add({
        text: `Grupo ${roomName} Criado. Bem Vindo!`,
        createdAt: firestore.FieldValue.serverTimestamp(),
        system: true
      })
      .then(() => {
        setVisible();
      })
      
    })
    .catch((err) => {
      console.log(err);
    })

  }


 return (
   <View style={styles.container}>
    <TouchableWithoutFeedback onPress={setVisible}>
      <View style={styles.modal}></View>
    </TouchableWithoutFeedback>
 

    <View style={styles.modalContent}>
      <Text style={styles.title}>Criar um novo Grupo?</Text>
      <TextInput 
        value={roomName}
        onChangeText={(text) =>  setRoomName(text)}
        placeholder="Nome para sua sala?"
        style={styles.input}
      />

      <TouchableOpacity style={styles.buttonCreate} onPress={handleButtonCreate}>
        <Text style={styles.buttonText}>Criar Sala</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={setVisible} style={styles.backButton}>
        <Text>Voltar</Text>
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
  },
  modalContent:{
    flex: 1,
    backgroundColor: '#FFF',
    padding: 15,
  },
  title:{
    marginTop: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 19
  },
  input:{
    borderRadius: 4,
    height: 45,
    backgroundColor: '#DDD',
    marginVertical: 15,
    fontSize: 16,
    paddingHorizontal: 10
  },
  buttonCreate:{
    borderRadius: 4,
    backgroundColor: '#2e54d4',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText:{
    fontSize: 19,
    fontWeight: 'bold',
    color: '#FFF'
  },
  backButton:{
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
})