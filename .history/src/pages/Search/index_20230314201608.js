import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity,
  SafeAreaView,
  TextInput
 } from 'react-native';

 import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
 import auth from '@react-native-firebase/auth';
 import firebase from '@react-native-firebase/firestore'

 import { useIsFocused } from '@react-navigation/native'

export default function Search() {
  const isFocused = useIsFocused();
  const [input, setInput] = useState('');
  const [user, setUser] = useState(null)


  useEffect(() => {

    const hasUser = auth().currentUser ? auth().currentUser.toJSON() : null;
    setUser(hasUser);

  }, [])

 return (
   <SafeAreaView style={styles.container}>
    <View style={styles.containerInput}>
      <TextInput 
        placeholder="Digite o nome da sala?"
        value={input}
        onChangeText={ (text) => setInput(text) }
        style={styles.input}
        autoCapitalize={"none"}
      />

      <TouchableOpacity style={styles.buttonSearch}>
        <MaterialIcons name="search" size={30} color="#FFF"/>
      </TouchableOpacity>
    </View>
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#FFF'
  },
  containerInput:{
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 14
  },
  input:{
    backgroundColor: '#ebebeb',
    marginLeft: 10,
    height: 50,
    width: '80%',
    borderRadius: 4,
    padding: 5
  },
  buttonSearch:{
    backgroundColor: '#2e54d4',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    width: '15%',
    marginLeft: 5,
    marginRight: 10
  }
})