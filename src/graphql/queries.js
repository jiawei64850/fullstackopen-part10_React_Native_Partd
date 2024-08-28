import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          id
          fullName
          description
          language
          ratingAverage
          reviewCount
          forksCount
          stargazersCount
          ownerAvatarUrl
        }
      }
    }
  }
`;


export const GET_REPOSITORY = gql`
  query Repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      fullName
      description
      language
      forksCount
      ratingAverage
      reviewCount
      stargazersCount
      url
      ownerAvatarUrl
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const SORT_REPOSITORIES = gql`
query Repositories($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy) {
  repositories(orderDirection: $orderDirection, orderBy: $orderBy) {
    edges {
      node {
        id
        fullName
        description
        language
        forksCount
        reviewCount
        ratingAverage
        stargazersCount
        ownerAvatarUrl
      }
    }
  }
}
`;

export const FIND_REPOSITORIES = gql`
query Repositories($searchKeyword: String, $orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy) {
  repositories(searchKeyword: $searchKeyword, orderDirection: $orderDirection, orderBy: $orderBy) {
    edges {
      node {
        id
        fullName
        description
        language
        forksCount
        ratingAverage
        reviewCount
        stargazersCount
        ownerAvatarUrl
      }
    }
  }
}
`;


export const GET_CURRENT_USER = gql`
query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            repositoryId
            createdAt
            text
            rating
            user {
              username
            }
          }
        }
      }
    }
  }
`;