import { gql } from "@apollo/client";

export const FETCH_POSTS_QUERY = gql`
query Query($offset: Int!, $limit: Int!) {
    getPosts(offset: $offset, limit: $limit) {
      id
      body
      createdAt
      username
      comments {
        id
        createdAt
        username
        body
      }
      commentsCount
      likesCount
      likes {
        id
        username
        createdAt
      }
    }
  }
`;

export const POST_SUBSCRIPTION = gql`
    subscription newPostSub {
        newPost {
            id
            body
            createdAt
            username
            likesCount
            likes {
                username
            }
            commentsCount
            comments {
                id
                username
                createdAt
                body
            }
        }
    }
`;

export const FETCH_POST_QUERY = gql`
    query Query($postId: ID!) {
        getPost(postId: $postId) {
            id
            body
            createdAt
            username
            comments {
                id
                createdAt
                username
                body
            }
            likes {
                username
            }
            likesCount
            commentsCount
        }
    }
`;

export const CREATE_COMMENT_MUTATION = gql`
    mutation($postId: ID!, $body: String!) {
        createComment(postId: $postId, body: $body) {
            id
            comments {
                id
                body
                createdAt
                username
            }
            commentsCount
        }
    }
`;

export const NEW_COMMENT_SUBSCRIPTION = gql`
    subscription newCommentSub {
        newComment {
            id
            body
            createdAt
            username
            comments {
                id
                createdAt
                username
                body
            }
            likes {
                username
            }
            likesCount
            commentsCount
        }
    }
`;

export const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!) {
        deletePost(postId: $postId)
    }
`;

export const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($postId: ID!, $commentId: ID!) {
        deleteComment(postId: $postId, commentId: $commentId) {
            id
            comments {
                id
                username
                createdAt
                body
            }
            commentsCount
        }
    }
`;

export const LOGIN_USER = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            id
            email
            username
            createdAt
            token
        }
    }
`;

export const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $password: String!
        $confirmPassword: String!
        $email: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            id
            email
            username
            createdAt
            token
        }
    }
`;

export const CREATE_POST_MUTATION = gql`
    mutation Mutation($createPostBody: String!) {
        createPost(body: $createPostBody) {
            id
            body
            createdAt
            username
            comments {
                id
                createdAt
                username
                body
            }
            likes {
                id
                username
                createdAt
            }
            likesCount
            commentsCount
        }
    }
`;

export const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!) {
        likePost(postId: $postId) {
            id
            likes {
                id
                username
            }
            likesCount
        }
    }
`;
