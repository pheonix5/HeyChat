import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Modal
} from 'react-native';

import auth from '@react-native-firebase/auth'

import { useNavigation, useIsFocused} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import FabButton from '../../Components/FabButton/'
import ModalNewRoom from '../../Components/ModalNewRoom/'

export default function ChatRoom() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [user, setUser] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)


  useEffect(() => {
    const hasUser = auth().currentUser ? auth().currentUser.toJSON(): null;
    console.log(hasUser);


  }, [isFocused])
  
  function handleSignOut(){
    auth()
    .signOut()
    .then(() => {
      navigation.navigate("SignIn")
    }).catch(() => {
        console.log('Não possuim nenhum usuário');
    })
  }

 return (
   <SafeAreaView style={styles.container}>
    <View style={styles.headerRoom}>
      
      <View style={styles.headerRoomOLeft}>
        <TouchableOpacity onPress={handleSignOut}>
          <MaterialIcons name="arrow-back" size={28} color="#FFF"/>
        </TouchableOpacity>
        <Text style={styles.title}>Grupos</Text>
      </View>

      <TouchableOpacity>
        <MaterialIcons name="search" size={28} color="#FFF"/>
      </TouchableOpacity>
    </View>


    <FabButton setVisible={ () => setModalVisible(true) }/>

    <Modal visible={modalVisible} animationType="fade" transparent={true}>
      <ModalNewRoom setVisible={ () => setModalVisible(false) }/>
    </Modal>
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  headerRoom:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#2d54d4',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  headerRoomOLeft:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  title:{
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFF',
    paddingLeft: 10
  }
})