import { View, Text, Image, StyleSheet, Button } from 'react-native';

export default function FoodItem({ route, navigation }) {
  const { foodItem } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: foodItem.imageUrl }} style={styles.image} />
      <Text>{foodItem.foodItem}</Text>
      {/* Add more data here */}
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 600,
  },
});