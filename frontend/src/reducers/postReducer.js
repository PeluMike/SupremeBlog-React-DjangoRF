import { POST_LIST_FAIL, POST_LIST_REQUEST, POST_LIST_SUCCESS, POST_CREATE_FAIL, POST_CREATE_REQUEST, POST_CREATE_SUCCESS, USER_POSTS_FAIL, USER_POSTS_REQUEST, USER_POSTS_SUCCESS, OTHER_USERS_POSTS_FAIL, OTHER_USERS_POSTS_REQUEST, OTHER_USERS_POSTS_SUCCESS, GET_LIKE_FAIL, GET_LIKE_REQUEST, GET_LIKE_SUCCESS, CREATE_LIKE_REQUEST, CREATE_LIKE_SUCCESS, CREATE_LIKE_FAIL, POST_UPDATE_REQUEST, POST_UPDATE_SUCCESS, POST_UPDATE_FAIL, POST_DELETE_REQUEST, POST_DELETE_SUCCESS, POST_DELETE_FAIL} from "../constants/postConstants"


// post list reducer 
export  const postReducer = ( state = { posts:[] }, action) => {
    switch(action.type){
        case POST_LIST_REQUEST:
            return { loading:true, posts:[] }


        case POST_LIST_SUCCESS:
            return { loading:false, posts:action.payload }


        case POST_LIST_FAIL:
            return { loading:false, error:action.payload }

        default:
            return state 
    }
} 


// create post reducer 
export  const createPostReducer = ( state = { }, action) => {
    switch(action.type){
        case POST_CREATE_REQUEST:
            return { loading:true }


        case POST_CREATE_SUCCESS:
            return { loading:false, postCreated: action.payload }


        case POST_CREATE_FAIL:
            return { loading:false, error:action.payload }

        default:
            return state 
    }
} 


// update post reducer 
export  const updatePostReducer = ( state = { }, action) => {
    switch(action.type){
        case POST_CREATE_REQUEST:
            return { loading:true }

        case POST_CREATE_SUCCESS:
            return { loading:false, postUpdated: action.payload }

        case POST_CREATE_FAIL:
            return { loading:false, error:action.payload }

        default:
            return state 
    }
} 



// post for the user reducer
export  const userPostsReducer = ( state = { userPosts:[] }, action) => {
    switch(action.type){
        case USER_POSTS_REQUEST:
            return { loading:true }

        case USER_POSTS_SUCCESS:
            return { loading:false, userPosts: action.payload }

        case USER_POSTS_FAIL:
            return { loading:false, Error:action.payload }

        default:
            return state 
    }
} 

// post for other users 
export  const otherUsersPostsReducer = ( state = { otherUsersPosts:[] }, action) => {
    switch(action.type){
        case OTHER_USERS_POSTS_REQUEST:
            return { Loading:true }


        case OTHER_USERS_POSTS_SUCCESS:
            return { Loading:false, otherUsersPosts: action.payload }


        case OTHER_USERS_POSTS_FAIL:
            return { Loading:false, Error:action.payload }

        default:
            return state 
    }
} 


// create post like reducer 
export  const createLikeReducer = ( state = { }, action) => {
    switch(action.type){
        case CREATE_LIKE_REQUEST:
            return { Loading:true }


        case CREATE_LIKE_SUCCESS:
            return { Loading:false, like: action.payload }


        case CREATE_LIKE_FAIL:
            return { Loading:false, Error:action.payload }

        default:
            return state 
    }
} 

// getting like for a particular post 
export  const likeReducer = ( state = { likes:[] }, action) => {
    switch(action.type){
        case GET_LIKE_REQUEST:
            return { Loading:true }


        case GET_LIKE_SUCCESS:
            return { Loading:false, likes: action.payload }


        case GET_LIKE_FAIL:
            return { Loading:false, Error:action.payload }

        default:
            return state 
    }
} 
