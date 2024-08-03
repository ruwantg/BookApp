import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, Button, Alert } from "react-native";
import { BookContext } from "../context/BookContext";

export default function BookDetailScreen({ route }) {
  const { book } = route.params;
  const { borrowedBooks, setBorrowedBooks } = useContext(BookContext);

  // Log the book details
  console.log("Book Details:", book);

  const handleBorrowBook = () => {
    if (borrowedBooks.length >= 3) {
      Alert.alert("Limit Reached", "You cannot borrow more than 3 books.");
    } else {
      setBorrowedBooks([...borrowedBooks, book]);
      Alert.alert("Success", "Book borrowed successfully!");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: book.coverPage }} style={styles.coverImage} />
      <Text style={styles.title}>{book.name}</Text>
      <Text style={styles.author}>by {book.author}</Text>
      <Text style={styles.rating}>Rating: {book.rating}</Text>
      <Text style={styles.summary}>{book.summary}</Text>
      <Button title="Borrow" onPress={handleBorrowBook} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  coverImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  author: {
    fontSize: 18,
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    marginBottom: 10,
  },
  summary: {
    fontSize: 16,
    marginBottom: 20,
  },
});
