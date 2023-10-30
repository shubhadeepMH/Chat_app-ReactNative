import React, { Component, useLayoutEffect, useState } from 'react'
import { Text, View,SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';

export default function NewChatScreen({navigation}) {
  const [chatName,setChatName]=useState("")
  const auth=getAuth()
  useLayoutEffect(()=>{
    navigation.setOptions({
      headerTitle:"Create chat"
    })
  })
  const handleCreateChat=async ()=>{
    try {
      if(chatName.length>0){
        const docRef = await addDoc(collection(db, "chatNames"), {
          chatName,
          creator:auth.currentUser.displayName,
          image:auth.currentUser.photoURL
         });
         // console.log("Document written with ID: ", docRef.id);
         navigation.goBack();
      }else{
        alert('Please Enter Group Name')
      }
     
    } catch (e) {
      console.error("Error adding document: ", e);
    }

  }
  
    return (
      <SafeAreaView style={{}}>
      <View style={{padding:10,marginHorizontal:20}}>
       <TextInput onChangeText={(text)=>setChatName(text)} style={{ borderColor:"violet",borderBottomWidth:2,padding:4}} placeholder='Name'></TextInput>
       <TouchableOpacity onPress={handleCreateChat} style={{alignItems:'center',padding:10,borderRadius:12,backgroundColor:'violet',elevation:3,marginTop:20,marginHorizontal:20}}><Text style={{fontWeight:'bold',fontSize:14}}>Create</Text></TouchableOpacity>
      </View>
      </SafeAreaView>
    )
}
