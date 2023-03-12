import React, { useState } from 'react';
import { View, Text, StyleSheet , TouchableOpacity} from 'react-native';

import { useNavigation } from '@react-navigation/native'

import Feather from 'react-native-vector-icons/Feather'

export default function ChatList({ data, deleteRoom, userId, userStatus }) {
  const navigation = useNavigation();
  const [isOwner, setIsOwner] = useState(false);

  function openChat(){
    navigation.navigate("Messages", { thread: data })

  }

 return (
   <TouchableOpacity onPress={openChat} onLongPress={() => deleteRoom && deleteRoom() }>
    <View style={styles.row}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.nameText} numberOfLines={1}>{data.name}</Text>
          { data.owner === userId && (
            <Feather name="star" size={25} color="#2d3e"/>
          )}
        </View>

        <Text style={styles.contentText} numberOfLines={1}>
          {data.lastMessage.text}
        </Text>

      </View>
    </View>
   </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  row:{
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(241, 240, 245, 0.8)',
    marginVertical: 4,
  },
  content:{
    flexShrink: 1
  },
  header:{
    flexDirection: 'row',
  },
  contentText:{
    color: '#c1c1c1',
    fontSize: 16,
    marginTop: 2
  },
  nameText:{
    fontSize: 19,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 20
  }
})