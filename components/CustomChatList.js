import React, { Component } from 'react'
import { Text, View,Image, TouchableOpacity } from 'react-native'

export default function CustomChatList(props){
    return (
      <TouchableOpacity style={{paddingHorizontal:8,paddingVertical:10, margin:2,backgroundColor:"white",elevation:3}}>
       <View style={{flexDirection:'row', alignItems:'center'}}>
        <Image style={{height:36,width:36,borderRadius:100,columnGap:5}} source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_kSSoomJ9hiFXmiF2RdZlwx72Y23XsT6iwQ&usqp=CAU'}}/>
        <View style={{padding:2,marginLeft:5}}>
            <Text style={{fontFamily:'serif',fontWeight:"bold",fontSize:16, }}>{props.data.name}</Text>
            <Text style={{fontSize:10}}>thanks for the coming...</Text>
        </View>
       </View>
      </TouchableOpacity>
    )
}
