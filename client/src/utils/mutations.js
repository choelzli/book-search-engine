import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
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
        email
      }
    }
  }
`;

export const SAVE_BOOK = gql`
mutation saveBook($id: ID!,$book: BookInput!){
  saveBook(_id: $id,book: $book){
    _id
    savedBooks{
      _id
      authors
      description
      bookId
      image
      link
      title
    }
  }
}
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($id: ID!, $deleteBook: String!) {
    removeBook(_id: $id, deleteBook: $deleteBook) {
      _id
      username
      email
      savedBooks {
        _id
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;