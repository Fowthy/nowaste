import React, { useState } from 'react';
import { Button, TextInput, Image, View } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';

export default function FoodForm({ route }) {
  const { db } = route.params;
  const [foodItem, setFoodItem] = useState("");
  const [image, setImage] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const pickImage = () => {
    launchImageLibrary({mediaType: 'photo'}, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImage(response.assets[0].uri);
      }
    });
  };

  const uploadImage = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const storage = getStorage();
    const storageRef = ref(storage, 'images/' + Date.now());
    await uploadBytes(storageRef, blob);

    return await getDownloadURL(storageRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (foodItem !== "" && image) {
      const imageUrl = await uploadImage(image);
      await addDoc(collection(db, "foodItems"), {
        foodItem,
        imageUrl,
      });
      setFoodItem("");
      setImage(null);
      setShowForm(false);
    }
  }

  return (
    <>
      <Button title="Add Food Item" onPress={() => setShowForm(true)} />
      {showForm && (
        <View style={{ width: '100%' }}>
          <TextInput
            placeholder='What food item do you want to add?'
            value={foodItem}
            onChangeText={setFoodItem}
          />
          <Button title="Pick Image" onPress={pickImage} />
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      )}
    </>
  );
}
