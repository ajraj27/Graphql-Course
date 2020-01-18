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

const db={
    users,
    posts,
    comments
}

export {db as default}