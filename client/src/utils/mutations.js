import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation loginUser($username: String!, $email: String!, $password: String!) {
        loginUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
              _id
              username
            }
          }
        }
    }
`;


// I do not know what I'm doing here and docs were not helpful. Need to come back with help.
export const SAVE_BOOK = gql`
    mutation saveBook($bookId: ID!) {
        saveBook(bookId: $id) {
            updated: [savedBooks]
        }
    }
`;


// I do not know what I'm doing here and docs were not helpful. Need to come back with help.
export const DELETE_BOOK = gql`
    mutation deleteBook($bookId: ID!) {
        deleteBook(bookId: $id) {
            deleted: bookId
            updated: [savedBooks]
        }

    }
`;