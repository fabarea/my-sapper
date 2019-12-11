import {gql} from "apollo-boost";

// graphql
export const GET_ORGANIZATIONS = gql`
  {
    organizations {
      id
      organizationid
      companyid
      name
    }
  }
`;

export const CREATE_ORGANIZATION = gql`
  mutation($name: String! $companyId: Int!)  {
    createOrganization (
      input: {
        data: {
          name: $name,
          companyid: $companyId
        }
      }
    ) {
      organization {
        id
        name
      }
    }
  }`;

export const DELETE_ORGANIZATION = gql`
  mutation($id: ID!) {
    deleteOrganization (
      input: {
        where: {
          id: $id
        }
      }
    ) {
      organization {
        id
        name
      }
    }
  }`;
