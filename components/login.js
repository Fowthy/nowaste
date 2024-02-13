import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'; // Import the necessary Firebase functions

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .catch((error) => {
        console.error(error);
      });
  };

  const handleGoogleLogin = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Login with Google" onPress={handleGoogleLogin} />
    </View>
  );
}
