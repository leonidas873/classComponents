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

// redux

import {connect} from 'react-redux';
import {setAllProducts} from './redux/actions/actions'




 
class App extends React.Component {
    state={
      client:{}
    }
       componentDidMount(){
        const client =  new ApolloClient({
          cache: new InMemoryCache(),
          uri: "http://localhost:4000/graphql"
        })

        this.setState({client:client})
        client && client
        .query({
          query: gql`
            query GetAllProducts {
              categories{
                name
                products{
                id
                name
                inStock
                gallery
                description
                category
                attributes{
                      id
              name
              type
              items{
                  displayValue
              value
              id
              }
                }
                prices{
                   currency
                      amount
                }
                brand
                }
              }
            }
          `
        })
        .then(result => {
          this.props.setAllProducts(result.data)
          
        });
      }


  render() { 
    return (
      
      <ApolloProvider client={this.state.client}>
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
      clothes: state.allProducts.tech
  }
}

const mapDispatchToProps = () => {
  return {
    setAllProducts,

  }
}


export default connect(mapStateToProps, mapDispatchToProps())(App);