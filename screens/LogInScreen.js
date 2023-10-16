import React, { useEffect,useLayoutEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import { getAuth, onAuthStateChanged ,signInWithEmailAndPassword} from "firebase/auth";


const Login = ({navigation})=> {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [getUser, setUser] = useState();
  const auth = getAuth();
//   const navigation=useNavigation()
  

    
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
      //   const uid = user.uid;
      // console.log(user);
      setUser(user)
      navigation.replace('Home')
        // ...
      } else {
        // User is signed out
        alert("user Signed Out");
        // ...
      }
    });

  },[])
   
  

  const handleLogin = () => {
    // Handle login logic here
    // alert(`Email: ${email}\nPassword: ${password}`);
    // const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    // const user = userCredential.user;
    navigation.replace("Home")
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
  });

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={{fontWeight:'100',marginTop:10}}>don't have acount <Text onPress={()=>navigation.navigate("SignUp")} style={{color:'blue',fontWeight:'bold'}}>Create Acount</Text></Text>
      {/* <Text>{getUser.uid}</Text> */}
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
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius:10
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
});

export default Login;
