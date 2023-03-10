import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function FabButton() {
 return (
   <TouchableOpacity style={styles.containerButton}>
    <View>
        <Text style={styles.buttonText}>+</Text>
    </View>
   </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  containerButton:{

    }
})