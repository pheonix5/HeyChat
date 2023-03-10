import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function ModalNewRoom({ setVisible }) {
 return (
   <View style={styles.container}>
    <View></View>

    <View style={styles.modalContent}>
      <Text>Criar um novo Grupo?</Text>
    </View>

   </View>
  );
}

const styles = StyleSheet.create({

})