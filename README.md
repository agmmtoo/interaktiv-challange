# interaktiv-challange

Interaktiv Full Stack Developer Technical Challenge by Aung Myint Myat Oo

[Backend](https://interaktiv-invoice.herokuapp.com/) | [Frontend](https://imaginative-cannoli-cf334c.netlify.app/)

## Backend

Written in Express on Node, deployed on Heroku.

Backed with MongoDB with Mongoose on Atlas.

[Dyno link](https://interaktiv-invoice.herokuapp.com/)

## API

base url: `https://interaktiv-invoice.herokuapp.com`

api url: `/api/v1`

### Invoices

PATH: `/invoices`

METHOD: `GET`

RESPONSE: list of invoice entries

METHOD: `POST`

PARAMS:

```Javascript
{
    date: Date,
    customer: String,
    salesperson: String,
    notes: String?,
    products: {productID: productPrice}
}
```

METHOD: `PUT`

METHOD: `DELETE`

### Products

Products are hardcoded json on server.

PATH: `/products`

METHOD: `GET`
