// "StAuth10244: I Divyang Bansu, 000860382 certify that this material is my original work. No other person's work has been used without due acknowledgement. 
//I have not made my work available to anyone else." 
// Reference: Mark Meritt
// This assignemt demosntrate how to make a react native appliction with API. This app will fetch a json data of books from openlibrary API and display some details of 
// the books and link of the book. 
import React, { useEffect, useState } from 'react';
import { Linking, Button,  Image, ActivityIndicator,StyleSheet, FlatList, Text, ScrollView , View, TextInput} from 'react-native';

function App() {
  const [isLoading, setLoading] = useState(true);
  const [title,setTitle]=useState("");
  const [data, setData] = useState([]);
  
  // use an async function so that we can use await instead of chaining 
  // promises
  const getMovies = async (title) => {
     try {
      // await the response
      const response = await fetch('https://openlibrary.org/search.json?title='+title);
      
      // convert the response of books to JSON
      const json = await response.json();

      // set the data
      setData(json.docs);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }


  return (
    // flexbox container to display layout in columns
    <View style={styles.flexcontainer}>
      <View style = {styles.storeposter}>
        {/* image of the store */}
        <Image
          source={require('./assets/book_store.jpg')}
          style={{width: 420, height: 150}}
        />
      </View>
      {/* Store title */}
      <View style = {styles.storetitle}>
        <Text component="h3" style={styles.heading}>Bookland : The Big Book Superstore</Text>
      </View>
      {/* Input box with button to search */}
      <View style = {styles.search}>
        <TextInput
          style={styles.input}
          placeholder="Enter title or book"
          keyboardType="default"
          onChangeText={(title) => setTitle(title)}
          value={title}
        />
        {/* Passing text input to get data */}
        <View style={{margin:10}}><Button color='#33b249' onPress={() => getMovies(title)} title="Search By Title" /></View>
      </View>
      {/* Display fetched data on the screen with button to open website */}
      {isLoading ? <Text style = {styles.loadingtext}>Type Book Name to get data</Text> : (
        <View style={styles.container}>
          <ScrollView>
            <View>
              {data.map((book)  => {
                //Gathering data to display into the list format with button
                return (
                  <View key={book.key} style={styles.item}>
                    <Text style={{fontSize:20}}>Title: {book.title}</Text>
                    <Text>Author : {book.author_name}</Text>
                    <Text>Edition Count : {book.edition_count}</Text>
                    <Text>E-Book Access : {book.ebook_access}</Text>
                    <Text>First Publish Year : {book.first_publish_year}</Text>
                    <Text>Ratings : {book.ratings_average}</Text>
                    <View style={{marginTop:10}}><Button color="#555555" onPress={()=> {getMovies(title); Linking.openURL('https://openlibrary.org'+book.key)}} title="Search Book Online" /></View>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

//All the design attributes
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 2,
    padding: 10,
  }, 
  container: {
    padding: 10,
    flex: 1,
  },
  flexcontainer:{
    flexDirection: 'column',
    backgroundColor: '#d4dddc',
    height: 900
  },
  item: {
    padding: 10,
    fontSize: 18,
    marginTop: 2
  },
  heading:{
    color: 'white',
    alignSelf: 'center',
    fontSize: 21,
    fontWeight:'bold',
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: {width: -2, height: 1},
    textShadowRadius: 10
  },
  storeposter:{
    width: 400,
    height: 150,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  storetitle:{
    backgroundColor:'#0892D1'
  },
  loadingtext:{
    justifyContent: 'center',
    alignSelf: 'center',
  }
});

export default App;
