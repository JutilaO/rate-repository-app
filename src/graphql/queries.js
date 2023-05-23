import { gql } from '@apollo/client'

export const GET_REPOSITORIES = gql`
query Repositories($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy) {
    repositories(orderDirection: $orderDirection, orderBy: $orderBy) {
      edges {
        node {
          createdAt,
          description
          forksCount
          fullName
          watchersCount
          userHasReviewed
          url
          stargazersCount
          reviewCount
          ratingAverage
          ownerName
          ownerAvatarUrl
          openIssuesCount
          name
          language
          id
        }
      }
    }
  }
`

export const ME = gql`
{
  me {
    id
    username
  }
}
`

export const GET_REPOSITORY = gql`
query Repository($repositoryId: ID!){
  repository(id: $repositoryId){
    createdAt,
    description
    forksCount
    fullName
    watchersCount
    userHasReviewed
    url
    stargazersCount
    reviewCount
    ratingAverage
    ownerName
    ownerAvatarUrl
    openIssuesCount
    name
    language
    id
  }
}
`

export const GET_REVIEW = gql`
query Repository($repositoryId: ID!){
  repository(id: $repositoryId){
    id
    fullName
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
`