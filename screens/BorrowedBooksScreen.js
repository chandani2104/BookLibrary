import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { BookContext } from '../BookContext';
import { Ionicons } from '@expo/vector-icons';

const BorrowedBooksScreen = () => {
  const { borrowedBooks, returnBook } = useContext(BookContext);

  const handleReturn = (bookId, title) => {
    Alert.alert(
      'Return Book',
      `Are you sure you want to return "${title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Return',
          onPress: () => returnBook(bookId),
          style: 'destructive'
        }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Ionicons name="book" size={24} color="#3A86FF" />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.author}>by {item.author}</Text>
        </View>
        <TouchableOpacity onPress={() => handleReturn(item.id, item.title)}>
          <Ionicons name="trash-outline" size={24} color="#D00000" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {borrowedBooks.length === 0 ? (
        <Text style={styles.emptyText}>You have not borrowed any books yet.</Text>
      ) : (
        <FlatList
          data={borrowedBooks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default BorrowedBooksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FA',
    padding: 12,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  author: {
    fontSize: 14,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#888',
  },
});
