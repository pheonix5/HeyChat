import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  FlatList,
  Alert
} from 'react-native';

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import { useNavigation, useIsFocused} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import FabButton from '../../Components/FabButton/'
import ModalNewRoom from '../../Components/ModalNewRoom/'
import ChatList from '../../Components/ChatList';

export default function ChatRoom() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [user, setUser] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [threads, setThreads] = useState([]);
  const [loading, setLoadging] = useState(true)
  const [updateScreen, setUpdateScreen] = useState(false)
  const [isOwner, setIsOwner] = useState(false);
  

  useEffect(() => {
    const hasUser = auth().currentUser ? auth().currentUser.toJSON(): null;
    // console.log(hasUser);

    setUser(hasUser);

  }, [isFocused]);


  useEffect(() => {
    let isActive = true;

    function getChats(){
      firestore()
      .collection('MESSAGE_THREADS')
      .orderBy('lastMessage.createdAt', 'desc')
      .limit(10)
      .get()
      .then((snapshot) => {
        const threads = snapshot.docs.map( documentSnapshot => {
          return{
            _id: documentSnapshot.id,
            name: '',
            lastMessage: { text: '' },
            ...documentSnapshot.data()
          }
        })

        if(isActive){
          setThreads(threads);
          setLoadging(false);
          console.log(threads.owner)
        }
      })

    }

    getChats();

    return () => {
      isActive = false;
    }
  }, [isFocused, updateScreen])

  
  function handleSignOut(){
    auth()
    .signOut()
    .then(() => {
      setUser(null)
      navigation.navigate("SignIn")
    }).catch(() => {
        console.log('Não possui nenhum usuário');
    })
  }

  function deleteRoom(ownerId, idRoom){
    //se tentar deletar sala na qual não seja dono ira bloquear
    if(ownerId !== user?.uid) return;

    Alert.alert(
      "Atenção!",
      "Você tem certeza que deseja deletar essa sala?",
      [
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () =>  handleDeleteRoom(idRoom)
        }
      ]
    )
  }


  async function handleDeleteRoom(idRoom){
      await firestore()
      .collection('MESSAGE_THREADS')
      .doc(idRoom)
      .delete()
      .then(() => {
        setUpdateScreen(!updateScreen)
      })
  }

  function verifyOwner(ownerId){
    if(ownerId === user?.uid){
      setIsOwner(true)
    }
  }

  if(loading){
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#555"/>
      </View>
    )
  }

 return (
   <SafeAreaView style={styles.container}>
    <View style={styles.headerRoom}>
      
      <View style={styles.headerRoomOLeft}>
        { user && (
          <TouchableOpacity onPress={handleSignOut}>
            <MaterialIcons name="arrow-back" size={28} color="#FFF"/>
          </TouchableOpacity>
        )}
        <Text style={styles.title}>Grupos</Text>
      </View>

      <TouchableOpacity>
        <MaterialIcons name="search" size={28} color="#FFF"/>
      </TouchableOpacity>
    </View>

    <FlatList 
      data={threads}
      keyExtractor={ item => item._id }
      showsVerticalScrollIndicator={false}
      renderItem={ ({ item }) => (
        <ChatList data={item} deleteRoom={ () => deleteRoom( item.owner, item._id)} isOwner={isOwner} />
      )}
    />

    <FabButton setVisible={ () => setModalVisible(true) } userStatus={user}/>

    <Modal visible={modalVisible} animationType="fade" transparent={true}>
      <ModalNewRoom 
        setVisible={ () => setModalVisible(false) }
        setUpdateScreen={ () => setUpdateScreen(!updateScreen) }
      />
    </Modal>
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#FFF'
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