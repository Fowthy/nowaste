import React, { useState, useEffect } from 'react';
import { Button, Text, View, Image } from 'react-native';
import { collection, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';

export default function FoodList({ db }) {
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "foodItems"), (snapshot) => {
      setFoodItems(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "foodItems", id));
  }

  const handleEdit = async (id, newFoodItem) => {
    await updateDoc(doc(db, "foodItems", id), { foodItem: newFoodItem });
  }

  return (
    <>
      {foodItems.map(foodItem => (
        <View key={foodItem.id}>
          <Image source={{ uri: foodItem.imageUrl }} style={{ width: 200, height: 200 }} />
          <Text>{foodItem.foodItem}</Text>
          <Button title="Delete" onPress={() => handleDelete(foodItem.id)} />
          <Button title="Edit" onPress={() => handleEdit(foodItem.id, 'New Food Item')} />
        </View>
      ))}
    </>
  );
}
