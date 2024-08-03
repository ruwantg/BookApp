// screens/BorrowedScreen.js
import React, { useContext } from "react";
import { View, FlatList, StyleSheet, Button, Text } from "react-native";
import { List } from "react-native-paper";
import { BookContext } from "../context/BookContext";

export default function BorrowedScreen() {
  const { borrowedBooks, setBorrowedBooks } = useContext(BookContext);

  const handleReturnBook = (bookId) => {
    // Remove the book from the borrowed books list
    const updatedBooks = borrowedBooks.filter((book) => book.id !== bookId);
    setBorrowedBooks(updatedBooks);
  };

  const renderItem = ({ item }) => (
    <List.Item
      title={item.name}
      description={item.author}
      right={(props) => (
        <Button
          {...props}
          title="Return"
          onPress={() => handleReturnBook(item.id)}
          color="#007BFF"
        />
      )}
    />
  );

  return (
    <View style={styles.container}>
      {borrowedBooks.length === 0 ? (
        <Text style={styles.emptyText}>No books borrowed</Text>
      ) : (
        <FlatList
          data={borrowedBooks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});
