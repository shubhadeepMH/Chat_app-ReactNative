import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { getAuth, createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import firebaseApp from '../firebase.js'



const SignUp = ({ navigation }) => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');


 

  const handleSignUp = () => {
    // Handle sign-up logic here
    // alert(`Name: ${name}\nEmail: ${email}\nPassword: ${password}`);
    const auth=getAuth();
  
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      // console.log(userCredential);
      updateProfile(auth.currentUser, {
        displayName:displayName, photoURL: photoUrl||'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_kSSoomJ9hiFXmiF2RdZlwx72Y23XsT6iwQ&usqp=CAU'
      }).then(() => {
        navigation.replace('Home')
      }).catch((error) => {
        alert(error)
      });
     

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
      // ..
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Acount With Chit-Chat </Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(text) => setDisplayName(text)}
        value={displayName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TextInput
        style={styles.input}
        placeholder="Image Url"
        onChangeText={(text) => setPhotoUrl(text)}
        value={photoUrl}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity >
        <Text style={styles.loginLink}>Already have an account? <Text onPress={()=>navigation.navigate("LogIn")} style={{fontWeight:'bold',color:'blue'}}>Log in</Text> </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    marginBottom: 20,
    fontFamily:"serif",
    elevation:13,
    shadowColor:'red'
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius:10,
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 30,
    paddingVertical:8,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  loginLink: {
    marginTop: 20,
    fontWeight:'100'
  },
});

export default SignUp;
