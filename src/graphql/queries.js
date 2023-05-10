import { gql } from '@apollo/client'

export const GET_REPOSITORIES = gql`
query {
    repositories {
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