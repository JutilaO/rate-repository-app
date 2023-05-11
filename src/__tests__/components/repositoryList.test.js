import { RepositoryListContainer } from '../../components/RepositoryList'
import { render, screen } from '@testing-library/react-native'
import { NativeRouter } from 'react-router-native'

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      }

      render(<NativeRouter><RepositoryListContainer repositories={repositories}/></NativeRouter>)
      const repositoryItems = screen.getAllByTestId('repositoryItem')

      expect(repositoryItems.length).toBe(2)
      expect(screen.getByText('jaredpalmer/formik')).toBeDefined()
      expect(screen.getByText('async-library/react-async')).toBeDefined()
      expect(screen.getByText('Build forms in React, without the tears')).toBeDefined()
      expect(screen.getByText('Flexible promise-based React data loader')).toBeDefined()
      expect(screen.getByText('TypeScript')).toBeDefined()
      expect(screen.getByText('JavaScript')).toBeDefined()
      expect(screen.getByText('1.6k')).toBeDefined()
      expect(screen.getByText('69')).toBeDefined()
      expect(screen.getByText('21.9k')).toBeDefined()
      expect(screen.getByText('1.8k')).toBeDefined()
      expect(screen.getByText('88')).toBeDefined()
      expect(screen.getByText('72')).toBeDefined()
      const reviews = screen.getAllByText('3')
      expect(reviews.length).toBe(2)
      expect(reviews[0]).toBeDefined()
      expect(reviews[1]).toBeDefined()

    })
  })
})