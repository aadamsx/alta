// const axios = require('axios');
import axios from 'axios';

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

// TEMP: Hardcoded Data
// const customers = [
//   { id: '1', name: 'John Doe', email: 'jdoe@gmail.com', age: 35 },
//   { id: '2', name: 'Steve Smith', email: 'ssmith@gmail.com', age: 25 },
//   { id: '3', name: 'Sarah Same', email: 'ssame@gmail.com', age: 40 },
// ];

// Customer Type
const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
})

// root query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString },
      },
      async resolve(parentValue, args) {
        // for(let i = 0; i < customers.length; i++) {
        //   if(customers[i].id === args.id){
        //     return customers[i];
        //   }
        // }
        const res = await axios(`http://localhost:3000/customers/${args.id}`)
        return res.data;
      }
    },
    customers: {
      type: new GraphQLList(CustomerType),
      async resolve(parentValue, args) {
        // return customers;
        const res = await axios(`http://localhost:3000/customers`)
        return res.data;
      }
    }
  }
});

// Mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addCustomer: {
      type: CustomerType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      async resolve(parentValue, args) {
        const res = await axios.post('http://localhost:3000/customers', {
          name: args.name,
          email: args.email,
          age: args.age
        });
        return res.data;
      }
    },
    updateCustomer: {
      type: CustomerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString)},
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      async resolve(parentValue, args) {
        const res = await axios.patch(`http://localhost:3000/customers/${args.id}`, args);
        return res.data;
      }
    },
    deleteCustomer: {
      type: CustomerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString)}
      },
      async resolve(parentValue, args) {
        const res = await axios.delete(`http://localhost:3000/customers/${args.id}`);
        return res.data;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});