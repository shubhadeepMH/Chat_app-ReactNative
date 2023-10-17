import React, { Component, useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView, ScrollView,Image, Text, TextInput, View,Dimensions } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { Appearance, AppearanceProvider, useColorScheme } from 'react-native-appearance';

export default function ChatScreen({ navigation }) {
  const names = [
    'Alice',
    'Bob',
    'Charlie',
    'David',
    'Eve',
    'Frank',
    'Grace',
    'Hank',
    'Ivy',
    'Jack',
    'Katie',
    'Liam',
    'Mia',
    'Noah',
    'Olivia',
    'Parker',
    'Quinn',
    'Ryan',
    'Sophiasdfjhjkdgskldfghjdsfghdfjgsdfglhdkglhdfjghkdlfhgkhdfgkjsdlhfkgjhdj',
    'Tyler',
    'Uma',
    'Victoria',
    'William',
    'Xander',
    'Yara',
    'Zane',
  ];

  
  const screenWidth = Dimensions.get('window').width;
  
  const [enteredText, setEnteredText] = useState('')
  const route = useRoute();
  const { data } = route.params
  // console.log(data.name);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${data.name}`,
      headerRight: () => {
        return (
          <TouchableOpacity>
            <AntDesign name="camerao" size={26} color="black" />
          </TouchableOpacity>
        )
      },

    })
  })
  const storeChat = () => {

  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Adjust this value as needed
    >
      <View style={{ flex: 1 }}>
        <ScrollView>
          {/* Your content inside the ScrollView */}
          {names.map((item, index) => {
            const dynamicWidth = item.length * 16;
            return (
              <View style={{
                margin: 10,

              }}>
              <Image
                source={{
                  // uri:"",
                }}
              />
                <View style={{
                  backgroundColor: 'green',
                  width: dynamicWidth > screenWidth ? screenWidth - 80 : dynamicWidth, // Ensure it doesn't exceed the screen width
      borderRadius: 40,
                  borderRadius:40,
                }}>
                  <Text style={{
                    textAlign:'left',
                    padding:6,
                  }}>{item}</Text>
                </View>

              </View>
            )
          })}
        </ScrollView>

        <View
          style={{
            position: 'absolute',
            bottom: 0,
            borderRadius: 4,
            alignItems: 'center',
            padding: 9,
            flexDirection: 'row',
            //  backgroundColor:'black',
            width: '100%',
          }}
        >
          <TextInput
            placeholder='Enter'
            style={{
              padding: 8,
              margin: 2,
              fontSize: 15,
              borderRadius: 12,
              backgroundColor: 'gray',
              width: '87%',
            }}
            onChangeText={(text) => setEnteredText(text)}
            value={enteredText}
          />
          <TouchableOpacity onPress={storeChat}>
            <MaterialCommunityIcons name="send-circle" size={43} color="rgb(12,88,3)" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  )

}
