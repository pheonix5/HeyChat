import React from 'react';
import { View, Text, StyleSheet , TouchableOpacity} from 'react-native';

export default function ChatList({ data }) {
 return (
   <TouchableOpacity>
    <View style={styles.row}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.nameTex} numberOfLines={1}>{data.name}</Text>
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

})