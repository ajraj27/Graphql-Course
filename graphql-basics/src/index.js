import {GraphQLServer} from 'graphql-yoga'

const typeDefs= `
    type Query {
        hello: String!
        name: String!
    }
`

const resolvers={
    Query:{
        hello(){
            return 'Hello World!'
        },
        name(){
            return 'Anuj'
        }
    }
}

const server = new GraphQLServer({typeDefs,resolvers})

server.start(() => console.log('Server started on port 4000'))
