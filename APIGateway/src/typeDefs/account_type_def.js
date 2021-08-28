const { gql } = require('apollo-server');

const accountTypeDefs = gql`
    type Account {
        userId: String!
        name: String
        lastName: String
        occupation: String
        aspiration: Int
        balance: Int
        lastChange: String
    }
    
    type Query {
        accountByUserId(userId: String!): Account
    }
`;

module.exports = accountTypeDefs; 
