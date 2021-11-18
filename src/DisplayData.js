import React from "react";
import { useQuery, gql } from "@apollo/client";

const QUERY_ALL_PRODUCTS = gql`
query GetAllProducts{
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

function DisplayData(){
    const {data, loading, error} = useQuery(QUERY_ALL_PRODUCTS);
    if(loading){
        return <h1>data is loading</h1>
    }
    if(data){
        console.log(data)
    }

    if(error){
        console.log(error)
    }
    return <div>{
        data && data.categories[0].products.map(item=><h1 key={item.id}>{item.name}</h1>)
        }</div>
}

export default DisplayData;