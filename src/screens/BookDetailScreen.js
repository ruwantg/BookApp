import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  Modal,
  TouchableOpacity,
} from "react-native";
import { BookContext } from "../context/BookContext";
import { MaterialIcons } from "@expo/vector-icons";

export default function BookDetailScreen({ route }) {
  const { book } = route.params;
  const { borrowedBooks, setBorrowedBooks } = useContext(BookContext);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(""); // "success" or "error"

  const handleBorrowBook = () => {
    const isBookAlreadyBorrowed = borrowedBooks.some(
      (borrowedBook) => borrowedBook.id === book.id
    );

    if (isBookAlreadyBorrowed) {
      setAlertMessage("You have already borrowed this book.");
      setAlertType("error");
      setAlertVisible(true);
    } else if (borrowedBooks.length >= 3) {
      setAlertMessage("You cannot borrow more than 3 books.");
      setAlertType("error");
      setAlertVisible(true);
    } else {
      setBorrowedBooks([...borrowedBooks, book]);
      setAlertMessage("Book borrowed successfully!");
      setAlertType("success");
      setAlertVisible(true);
    }
  };

  const closeAlert = () => {
    setAlertVisible(false);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: book.coverPage }} style={styles.coverImage} />
      <Text style={styles.title}>{book.name}</Text>
      <Text style={styles.author}>by {book.author}</Text>
      <Text style={styles.rating}>Rating: {book.rating}</Text>
      <Text style={styles.summary}>{book.summary}</Text>
      <Button title="Borrow" onPress={handleBorrowBook} />

      {/* Custom Alert Modal */}
      <Modal
        transparent={true}
        visible={alertVisible}
        animationType="fade"
        onRequestClose={closeAlert}
      >
        <View style={styles.modalBackground}>
          <View style={styles.alertBox}>
            <View style={styles.alertContent}>
              <MaterialIcons
                name={alertType === "success" ? "check-circle" : "cancel"}
                size={40}
                color={alertType === "success" ? "green" : "red"}
                style={styles.alertIcon}
              />
              <Text style={styles.alertMessage}>{alertMessage}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={closeAlert}>
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  alertBox: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "90%",
  },
  alertContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  alertIcon: {
    marginRight: 10,
  },
  alertMessage: {
    fontSize: 18,
  },
  button: {
    marginTop: 15,
    backgroundColor: "#007BFF",
    padding: 8,
    borderRadius: 5,
    width: "25%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
