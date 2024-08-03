import React, { useContext, useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { List, ActivityIndicator, Colors } from "react-native-paper";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { BookContext } from "../context/BookContext";

export default function HomeScreen({ navigation }) {
  const { books, setBooks } = useContext(BookContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reference the collection
    const booksCollection = collection(db, "books");

    // Listen to changes in the collection
    const unsubscribe = onSnapshot(booksCollection, (snapshot) => {
      const fetchedBooks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(fetchedBooks);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setBooks]);

  const renderItem = ({ item }) => (
    <List.Item
      title={item.name}
      description={item.author}
      onPress={() => navigation.navigate("Book Detail", { book: item })}
    />
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} color="#1E3A8A" />
      </View>
    );
  }

  return (
    <FlatList
      data={books}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
