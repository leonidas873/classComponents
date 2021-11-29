export const clothesQuery = `
query GetAllClothes {
  category(input:{title:"clothes"}){
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
  }`;

export const techQuery = `
query GetAlltech {
  category(input:{title:"tech"}){
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
  }`;

export const currenciesQuery = `            query GetAllCurrencies {
    currencies
    }
                `;

export const singleProductQuery = (productId) => {

    return `query GetSingleProduct {
        product(id:${productId}){
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
        }`
}