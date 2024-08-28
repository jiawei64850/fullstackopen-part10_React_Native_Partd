import { gql } from '@apollo/client';

export const AUTHENTICATE = gql`
  mutation Authenticate($credentials: AuthenticateInput){
  authenticate(credentials: $credentials) {
    accessToken
  }
}
`;

export const CREATEREVIEW = gql`
mutation CreateReview($review: CreateReviewInput) {
  createReview(review: $review) {
    repositoryId
  }
}
`;

export const CREATEUSER = gql`
mutation CreateUser($user: CreateUserInput) {
  createUser(user: $user) {
    id
    username
  }
}

`;

export const DELETEREVIEW = gql`
mutation DeleteReview($deleteReviewId: ID!) {
  deleteReview(id: $deleteReviewId)
}
`;