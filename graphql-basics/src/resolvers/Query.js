const Query= {

    posts(parent,args,{db},info){

        if(!args.query)
            return db.posts

        return db.posts.filter((post) => {
            const isTitle=post.title.toLowerCase().includes(args.query.toLowerCase())
            const isBody=post.body.toLowerCase().includes(args.query.toLowerCase())

            return isTitle || isBody
        })
           
    },
    users(parent,args,{db},info){
        if(!args.query)
            return db.users

        return db.users.filter((user) => user.name.toLowerCase().includes(args.query.toLowerCase()))    
    },

    comments(parent,args,{db},info){
        return db.comments
    }
}

export {Query as default}
