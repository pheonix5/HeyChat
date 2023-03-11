import React from 'react';
import { View, Text, StyleSheet , TouchableOpacity} from 'react-native';

export default function ChatList({ data }) {
 return (
   <TouchableOpacity>
    <View style={styles.row}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.nameTex}>{data.name}</Text>
        </View>
      </View>
    </View>
   </TouchableOpacity>
  );
}


const styles = StyleSheet.create({

})