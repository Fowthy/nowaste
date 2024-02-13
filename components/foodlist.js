import React, { useState, useEffect } from 'react';
import { Button, Text, View, Image, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { collection, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';

export default function FoodList({ route }) {
  const { db } = route.params;

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
    <View style={styles.container}>
      {foodItems.map(foodItem => (
        <Card key={foodItem.id} style={styles.card}>
          <Card.Cover source={{ uri: foodItem.imageUrl }} style={styles.image} />
          <Card.Content>
            <Text>{foodItem.foodItem}</Text>
          </Card.Content>
          {/* <Button title="Delete" onPress={() => handleDelete(foodItem.id)} />
          <Button title="Edit" onPress={() => handleEdit(foodItem.id, 'New Food Item')} /> */}
        </Card>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'start',
    // marginTop: 800,
    overflow: 'scroll',
  },
  card: {
    width: '90%',
    marginTop:12,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  image: {
    width: '100%',
    height: 300,
    minHeight: 300,
  },
});