import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      username
      _id
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
`;


// I do not know what I'm doing here and docs were not helpful. Need to come back with help.
export const SAVE_BOOK = gql`
mutation saveBook($input: BookInput) {
  saveBook(input: $input) {
   _id
  }
}
`;


// I do not know what I'm doing here and docs were not helpful. Need to come back with help.
export const DELETE_BOOK = gql`
mutation deleteBook {
    deleteBook {
      _id
      savedBooks {
        bookId
      }
    }
  }
`;