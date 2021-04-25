import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native';
import {Header} from 'react-native-elements';

export default class HomeScreen extends Component{
    constructor() {
        super();
        this.state = {
          text: '',
          chunks: [],
          phones: [],
        };
      }

      getWord = (word)=>{
          var searchKeyword = word.toLowerCase()
          var url = "https://rupinwhitehatjr.github.io/dictionary/%22"+searchKeyword+"%22.json"

          return fetch(url)
          .then((data)=>{
            if(data.status===200){
                return data.json()
            }else{
                return null
            }
          })
          .then((response)=>{
            var responseObject = response

            if(responseObject){
                var wordData = responseObject.definition[0]

                var definition = wordData.discription
                var lexicalCategory = wordData.wordtype

                this.setState({
                    "word" : this.state.text,
                    "definition" : definition,
                    "lexicalCategory" : lexicalCategory
                })
            }else {
                this.setState({
                    "word" : this.state.text,
                    "definition" : "Not Found",
                })
            }
          })
      }

    render() {
        return(
            <View>
                <TextInput>
                    style={styles.inputBox}
                    onChangeText={text => {
                        this.setState({ 
                            text: text,
                            isSearchedPressed: false,
                            word: "Loading...",
                            lexicalCategory: '',
                            examples: [],
                            definition: ""
                        });
                    }}
                    value={this.state.text}
                </TextInput>
                <TouchableOpacity
                    style ={styles.searchButton}
                    onPress ={()=>{
                        this.setState({isSearchedPressed : true});
                        this.getWord(this.state,text)
                    }}>

                </TouchableOpacity>
                <View style={styles.detailsContainer}>
                        <Text style={styles.detailsTitle}>
                           Word : {""}
                        </Text>
                        <Text style={{fontSize : 18}}>
                            {this.state.word}
                        </Text>
                </View>
        
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>
                        Type : {""}
                    </Text>
                    <Text style={{fontSize : 18}}>
                        {this.state.lexicalCategory}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputBox: {
        marginTop: 50,
        width: '80%',
        alignSelf: 'center',
        height: 40,
        textAlign: 'center',
        borderWidth: 4,
        outline: 'none',
      },
});