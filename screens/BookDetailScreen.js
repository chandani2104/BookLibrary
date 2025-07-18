import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { BookContext } from '../BookContext';
import { Ionicons } from '@expo/vector-icons';

const BookDetailScreen = ({ route, navigation }) => {
  const { book } = route.params;
  const { borrowedBooks, borrowBook } = useContext(BookContext);

  const handleBorrow = () => {
    const alreadyBorrowed = borrowedBooks.find(b => b.id === book.id);
    if (alreadyBorrowed) {
      Alert.alert('Already Borrowed', 'You have already borrowed this book.');
      return;
    }

    const success = borrowBook(book);
    if (!success) {
      Alert.alert(
        'Limit Reached',
        'You cannot borrow more than 3 books at a time.',
      );
    } else {
      Alert.alert('Success', 'Book borrowed successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons name="book" size={64} color="#3A86FF" style={styles.icon} />
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>by {book.author}</Text>
      <Text style={styles.description}>{book.description}</Text>

      <TouchableOpacity style={styles.button} onPress={handleBorrow}>
        <Ionicons name="bookmark-outline" size={20} color="#fff" />
        <Text style={styles.buttonText}>Borrow This Book</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FA',
    padding: 20,
    alignItems: 'center',
  },
  icon: {
    marginTop: 30,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
  },
  author: {
    fontSize: 16,
    color: '#666',
    marginVertical: 10,
    fontStyle: 'italic',
  },
  description: {
    fontSize: 16,
    color: '#444',
    marginTop: 20,
    textAlign: 'center',
  },
  button: {
    marginTop: 40,
    flexDirection: 'row',
    backgroundColor: '#3A86FF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
