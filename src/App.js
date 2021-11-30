import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
// apollo
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
   gql
} from "@apollo/client";
import Header from './components/header/Header';
import Main from './components/main/Main';
import { clothesQuery, currenciesQuery } from './Queries';
// redux

import {connect} from 'react-redux';
import {setTech, setAllCurrencies, setApolloClient} from './redux/actions/actions'
import {setClothes} from './redux/actions/actions';



 
class App extends React.Component {

       componentDidMount(){
        const client =  new ApolloClient({
          cache: new InMemoryCache(),
          uri: "http://localhost:4000/graphql"
        })

        this.props.setApolloClient(client);
        client && client
        .query({
          query: gql`${clothesQuery}`
        })
        .then(result => {
          this.props.setClothes(result.data.category.products)
          
        })

        client && client
        .query({
          query: gql`${currenciesQuery}`
        })
        .then(result => {
          this.props.setAllCurrencies(result.data.currencies);
          
          
        })

      }


  render() { 
    return (
      
      <ApolloProvider client={this.props.client}>
        <div className="app">
        <Header/>
        <Main/>
        </div>
      </ApolloProvider>
      
      );
  }
}
 
const mapStateToProps = (state) => {
  return{
      tech: state.allProducts.tech,
      clothes: state.allProducts.tech,
      client:state.allProducts.client
  }
}

const mapDispatchToProps = () => {
  return {
    setClothes,
    setTech,
    setAllCurrencies,
    setApolloClient
  }
}


export default connect(mapStateToProps, mapDispatchToProps())(App);