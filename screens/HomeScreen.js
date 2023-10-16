import React, { Component, useLayoutEffect, useState } from 'react'
import { Text, View,Image, TouchableOpacity,ScrollView } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import CustomChatList from '../components/CustomChatList';
import { collection, getDocs,onSnapshot } from "firebase/firestore"; 
import { db } from '../firebase';

export default function HomeScreen({navigation}) {
    let auth =getAuth()
    let user=auth.currentUser
    const [chatNames,setChatNames]=useState([])
    
    // console.log(user.photoURL);
    useState(async()=>{
        onSnapshot(collection(db,'chatNames'), (querySnapshot) => {
            const updatedChatNames = [];
            querySnapshot.forEach((doc) => {
              updatedChatNames.push({ id: doc.id, name: doc.data().chatName });
            });
            setChatNames(updatedChatNames);
          });
          console.log(chatNames);
    })
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle:"Chit chaT",
            headerTitleAlign: 'center',
            headerLeft:()=>{
                return (
                <View style={{gap:5}}>
                    <Image style={{height:30,width:30,borderRadius:100,backgroundColor:'red'}} source={{
                        uri:`${user.photoURL}`
                    }}/>
                </View>
            )},
           headerRight:()=>{
            return(
                <View style={{flexDirection:'row',justifyContent:'between',alignItems:'center',gap:18}}>
                <TouchableOpacity>
                <AntDesign name="camerao" size={26} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate("newChat")}>
                <EvilIcons name="pencil" size={30} color="black" />
                </TouchableOpacity>
                   
                    
                </View>
            )
           },
           headerTitleText:{
            fontfamily:'',
           },
           headerTitleStyle: {
            textAlign: 'center',
            font:'bold', // Use 'bold' for fontWeight, not 200
            color: 'green',
            fontfamily:'sans',// Use 'color' instead of 'text' for text color
          }
        })
    })
    return (
     <ScrollView>
     {chatNames.map((item,index)=>{
       {/* console.log(index) */}
        return(<CustomChatList data={item}/>)
     })}
           
     </ScrollView>
    )
}
