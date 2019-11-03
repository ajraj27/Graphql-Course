import {GraphQLServer} from 'graphql-yoga'

const users=[
    {
        'id':'1',
        'name':'anuj',
        'email':'anuj@example.com',
        'age':19
    },
    {
        'id':'2',
        'name':'abhishek',
        'email':'abhishek@example.com',
        'age':21
    },
    {
        'id':'3',
        'name':'aditya',
        'email':'aditya@example.com',
        'age':22
    }
]

const posts=[
    {
        'id':'1',
        'title':'GraphQL coures 101',
        'body':'This is a basic tutorial on Graphql',
        'published':false,
        'author':'1'
    },{
        'id':'2',
        'title':'GraphQL coures 102',
        'body':'This is a basic tutorial on Graphql part 2',
        'published':true,
        'author':'1'
    },
    {
        'id':'3',
        'title':'Apache coures 101',
        'body':'This is a basic tutorial on Apache',
        'published':true,
        'author':'2'
    }
]

const comments=[
    {
        'id':'1',
        'text':'First Comment',
        'author':'1',
        'post':'1'
    },{
        'id':'2',
        'text':'Second Comment',
        'author':'2',
        'post':'1'
    },
    {
        'id':'3',
        'text':'Third Comment',
        'author':'1',
        'post':'3'
    },
    {
        'id':'4',
        'text':'Fourth Comment',
        'author':'3',
        'post':'2'
    }

]

const typeDefs= `
    type Query {
        posts(query: String): [Post!]!
        users(query : String) : [User!]!
        comments: [Comment!]!
    }

    type Post{
        id:ID!
        title:String!
        body:String!
        published: Boolean!
        author: User!
        comments:[Comment!]!
    }

    type User{
        id:ID!
        name:String!
        email:String!
        age:Int
        posts: [Post!]!
        comments:[Comment!]!
    }

    type Comment {
        id:ID!
        text:String!
        author:User!
        post:Post!
    }
`

const resolvers={
    Query:{
        posts(parent,args,ctx,info){

            if(!args.query)
                return posts

            return posts.filter((post) => {
                const isTitle=post.title.toLowerCase().includes(args.query.toLowerCase())
                const isBody=post.body.toLowerCase().includes(args.query.toLowerCase())

                return isTitle || isBody
            })
               
        },
        users(parent,args,ctx,info){
            if(!args.query)
                return users

            return users.filter((user) => user.name.toLowerCase().includes(args.query.toLowerCase()))    
        },

        comments(parent,args,ctx,info){
            return comments
        }
    },
    Post: {
        author(parent,args,ctx,info){
            return users.find((user) => user.id===parent.author)
        },
        comments(parent,args,ctx,info){
            return comments.filter((comment) => comment.post===parent.id)
        }
    },
    User:{
        posts(parent,args,ctx,info){
            return posts.filter((post) => post.author===parent.id)
        },
        comments(parent,args,ctx,info){
            return comments.filter((comment) => comment.author===parent.id)
        }
    },
    Comment:{
        author(parent,args,ctx,info){
            return users.find((user) => user.id===parent.author)
        },
        post(parent,args,ctx,info){
            return posts.find((post) => post.id===parent.post)
        }
    }
}

const server = new GraphQLServer({typeDefs,resolvers})

server.start(() => console.log('Server started on port 4000'))
