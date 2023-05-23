import { gql } from '@apollo/client'

export const GET_REPOSITORIES = gql`
query Repositories($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy, $searchKeyword: String) {
    repositories(orderDirection: $orderDirection, orderBy: $orderBy, searchKeyword: $searchKeyword) {
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
  query Me($includeReviews: Boolean = false) {
    me {
      username
      id
      reviews@include(if: $includeReviews) {
        edges {
          node {
            repository {
              id
              fullName
            }
            createdAt
            rating
            text
            id
          }
        }
      }
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