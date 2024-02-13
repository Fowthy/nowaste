import React from 'react';
import { StyleSheet, View } from 'react-native';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

import FoodForm from './components/foodform';
import FoodList from './components/foodlist';
import Navbar from './components/navbar';

const firebaseConfig = {
  apiKey: "AIzaSyBsK5SWlZVzsS3jlR9-nGjRhTznCoV-IHE",
  authDomain: "nowaste-c780b.firebaseapp.com",
  databaseURL: "https://nowaste-c780b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "nowaste-c780b",
  storageBucket: "nowaste-c780b.appspot.com",
  messagingSenderId: "688334901787",
  appId: "1:688334901787:web:985742cb6853a7857fdebe",
  measurementId: "G-RL89ZZE9M9"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Get Firestore instance

export default function App() {
  return (
    <View style={styles.container}>
      <Navbar db={db} />
      {/* <FoodForm db={db} /> */}
      {/* <FoodList db={db} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%'
  },
});