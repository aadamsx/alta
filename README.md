# Alta (Random Project Name)

A simple express-GraphQL server example able to handle CRUD operations.

## Getting Started

Just clone and npm install.  A json-server is provided to provide data for the server.

### Mutation examples

Add Customer

```
mutation {
  addCustomer(name: "aaron", email: "aa@gmail.com", age: 35) {
    id,
    name,
    age
  }
}
```

Update Customer

```
mutation {
  updateCustomer(id:"3", age: 50) {
    id,
    name,
    age
  }
}
```

Delete Customer (will return null, but check the data.json file for removals)

```
mutation {
  deleteCustomer(id:"1") {
    id
  }
}
```

### Select examples

Select Customer by ID

```
{
  customer(id:"1") {
    id,
    name,
    email,
    age
  }
}
```

Select All Customers

```
{
  customers {
    id,
    name,
    email,
    age
  }
}
```