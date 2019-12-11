import { gql } from "apollo-boost";

export const GETTODO = gql`
  {
    allTodos {
      data {
        _id
        title
        completed
      }
    }
  }
`;
export const ADDTODO = gql`
  mutation($todoEdit: String!) {
    createTodo(input: { todo: { title: $todoEdit, done: false } }) {
      todo {
        id
        title
        done
      }
    }
  }
`;
