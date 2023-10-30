import React, { Component, useLayoutEffect, useState } from 'react'
import { Text, View,Image, TouchableOpacity,ScrollView } from 'react-native'
import { EvilIcons } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import CustomChatList from '../components/CustomChatList';
import { collection, getDocs,onSnapshot } from "firebase/firestore"; 
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebase';

export default function HomeScreen() {
    let auth =getAuth()
    let user=auth.currentUser
    const [chatNames,setChatNames]=useState([])
    const navigation=useNavigation()
    
    // console.log(user.photoURL);
    useState(async()=>{
        onSnapshot(collection(db,'chatNames'), (querySnapshot) => {
            const updatedChatNames = [];
            querySnapshot.forEach((doc) => {
              updatedChatNames.push({ id: doc.id, name: doc.data().chatName ,creator:doc.data().creator,image:doc.data().image});
            });
            setChatNames(updatedChatNames);
          });
        //   console.log(chatNames);
    })
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle:"Chit chat",
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
    const redirect=(item)=>{
        navigation.navigate('chat',{data:item})
    }
    return (
     <ScrollView>
     {chatNames.map((item,index)=>{
       {/* console.log(item) */}
        return <CustomChatList key={index} redirect={()=>redirect(item)}  data={item}/>

     })}
           
     </ScrollView>
    )
}
