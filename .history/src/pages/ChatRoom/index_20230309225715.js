import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import auth from '@react-native-firebase/auth'

import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import FabButton from '../../Components/FabButton/'

export default function ChatRoom() {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false)
  
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