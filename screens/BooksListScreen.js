import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';
import { Ionicons } from '@expo/vector-icons';

const BooksListScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const booksRef = ref(db, 'books');
    const unsubscribe = onValue(booksRef, (snapshot) => {
      const data = snapshot.val();
      const booksArray = data ? Object.keys(data).map((key) => ({ id: key, ...data[key] })) : [];
      setBooks(booksArray);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('BookDetail', { book: item })}
    >
      <View style={styles.cardHeader}>
        <Ionicons name="book-outline" size={24} color="#444" />
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <Text style={styles.author}>by {item.author}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListFooterComponent={
          <TouchableOpacity
            style={styles.borrowedButton}
            onPress={() => navigation.navigate('BorrowedBooks')}
          >
            <Ionicons name="library-outline" size={20} color="#fff" />
            <Text style={styles.borrowedText}>View Borrowed Books</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
};

export default BooksListScreen;

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
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
    flexShrink: 1,
  },
  author: {
    fontSize: 14,
    color: '#555',
  },
  borrowedButton: {
    marginTop: 20,
    backgroundColor: '#3A86FF',
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  borrowedText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 6,
  },
});
