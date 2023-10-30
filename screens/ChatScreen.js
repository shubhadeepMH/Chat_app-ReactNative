import React, { Component, useEffect, useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView, ScrollView, Image, Text, TextInput, View, Dimensions, Keyboard } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';
import { collection, doc, addDoc, Timestamp, query, where, onSnapshot, orderBy } from 'firebase/firestore';



// import { Appearance, AppearanceProvider, useColorScheme } from 'react-native-appearance';

export default function ChatScreen({ navigation }) {
  const auth = getAuth();
  // console.log(auth.currentUser.photoURL);

  const screenWidth = Dimensions.get('window').width;

  const [enteredText, setEnteredText] = useState('')
  const [chats, setChats] = useState([])
  const route = useRoute();
  const { data } = route.params

  useEffect(() => {
    const q = query(collection(db, "chats"), orderBy("timeStamp", "desc"), where("groupName", "==", data.name));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const allChats = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc.data().message,data.name);
        allChats.push(doc.data());
      });
      setChats(allChats)
    })

  }, [storeChat])

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
  const storeChat = async () => {
    Keyboard.dismiss()
    // console.log(auth.currentUser.phoneNumber);
    try {
      const docRef = await addDoc(collection(db, "chats"), {
        timeStamp: Timestamp.fromDate(new Date()),
        groupName: data.name,
        message: enteredText,
        email: auth.currentUser.email,
        image: auth.currentUser.photoURL,
        name: auth.currentUser.displayName
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setEnteredText("")
  }

  // console.log(chats.length);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      // behavior={Platform.OS === 'ios' ? 'padding' : null}
      // keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Adjust this value as needed
    >
      <View style={{
         flex: 1,
         paddingBottom:70
        }}>
        <ScrollView
       >
          {/* Your content inside the ScrollView */}
          {chats && chats.map((item, index) => {
            {/* console.log(item) */ }
            const dynamicWidth = item.message.length*14
            return (
              <View key={index}
                style={{
                  margin: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,

                }}>
                <Image
                  style={{
                    height: 28,
                    width: 28,
                    borderRadius: 100,
                  }}
                  source={{
                    uri: item.image || "https://avatars.githubusercontent.com/u/111757868?v=4",
                  }}
                />
                <View style={{
                  backgroundColor: 'orange',
                  minWidth:110,
                  width: dynamicWidth > screenWidth ? screenWidth - 80 : dynamicWidth, // Ensure it doesn't exceed the screen width
                  borderRadius: 10,
                  flexDirection:'row',
                  position:'relative',
                  padding:9,

                }}>
                  <Text style={{
                    textAlign: 'left',
                    margin:4
                  }}>{item.message}</Text>
                  <Text
                    style={{  
                      textAlign:'right',
                      color: 'black',
                      fontSize: 11,
                      textAlign: "center",
                      position:'absolute',
                      bottom:-1,
                      right:5,

                    }}>
                    9.8 p.m
                  </Text>
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
            <MaterialCommunityIcons name="send-circle" size={43} color="orange" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  )

}
