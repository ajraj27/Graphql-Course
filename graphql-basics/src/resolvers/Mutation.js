import uuidv4 from 'uuid/v4'

const Mutation = {
    createUser(parent,args,{db},info){
        const emailTaken=db.users.some((user) => user.email=== args.data.email)

        if(emailTaken)
            throw new Error("Email Taken.")
        
        const user={
            id:uuidv4(),
            ...args.data
        }  
        
        db.users.push(user)

        return user

    },

    createPost(parent,args,{db,pubsub},info){
        const userExists=db.users.some((user) => user.id===args.data.author)

        if(!userExists)
            throw new Error("User not exists.")

        const post={
            id:uuidv4(),
            ...args.data
        } 
        
        db.posts.push(post)
        
        if(post.published)
            pubsub.publish('post',{post})

        return post
    },

    createComment(parent,args,{db,pubsub},info){
        const userExists=db.users.some((user) => user.id===args.data.author)

        if(!userExists)
            throw new Error("User not exists")
        
        const postExists=db.posts.some((post) => post.id===args.data.post && post.published===true)

        if(!postExists)
            throw new Error("Post not exists or it is not published.")
        
        const comment={
            id:uuidv4(),
            ...args.data
        }

        db.comments.push(comment)
        pubsub.publish(`comment ${args.data.post}`,{comment})

        return comment

    },

    deleteUser(parent,args,{db},info){
        const userIndex=db.users.findIndex((user) => user.id===args.id)

        if(userIndex===-1)
            throw new error('Theres no error with this id')
        
        const deletedUsers=db.users.splice(userIndex,1);

        db.posts=db.posts.filter((post) => {
            const match=post.author===args.id

              if(match){
                db.comments=db.comments.filter((comment) => comment.post!==post.id)
            }

            return !match
        })

        db.comments=db.comments.filter((comment) => comment.author!==args.id)
        
        return deletedUsers[0]
    },

    updateUser(parent,args,{db},info){
        const user=db.users.find((user) => user.id===args.id)

        if(!user)
            throw new Error("User doesn't exist")

        if(typeof args.data.email==="string"){
            const emailTaken=db.users.some((user) => user.email===args.data.email)

            if(emailTaken)
                throw new Error("Email already taken")

            user.email=args.data.email
                
        }

        if(typeof args.data.name==="string"){
            user.name=args.data.name        
        }

        if(typeof args.data.age!=="undefined"){
            user.age=args.data.age       
        }

        return user
    },

    deletePost(parent,args,{db},info){
        const postIndex=db.posts.findIndex((post) => post.id===args.id)
        if(postIndex===-1)
            throw new error("Post doesn't exist.")

        const deletedPosts=db.posts.splice(postIndex,1)
        
        db.comments=db.comments.filter((comment) => comment.post!==args.id)

        return deletedPosts[0]
    },

    updatePost(parent,args,{db},info){
        const post=db.posts.find((post) => post.id===args.id)

        if(!post){
            throw new Error("Post not found")
        }
        
        if(typeof args.data.title==="string"){
            post.title=args.data.title
        }

        if(typeof args.data.body==="string"){
            post.body=args.data.body
        }

        if(typeof args.data.published==="boolean"){
            post.published=args.data.published
        }

        return post
    },

    deleteComment(parent,args,{db},info){
        const commentIndex=db.comments.findIndex((comment) => comment.id===args.id)

        if(commentIndex===-1)
            throw new Error("Comment doesn't exist")

        const deletedComments=db.comments.splice(commentIndex,1)
        
        return deletedComments[0]
    },

    updateComment(parent,args,{db},info){
        const comment=db.comments.find((comment) => comment.id===args.id)

        if(!comment)
            throw new Error("Comment not found.")

        if(typeof args.data.text==="string")
            comment.text=args.data.text
            
        return comment    
    }
}

export {Mutation as default}