import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = ({sort, searchKeyword, first}) => {

  let sortType = sort === 'latest' ? 'CREATED_AT' : 'RATING_AVERAGE'
  let sortDirection = sort === 'lowest' ? 'ASC' : 'DESC'

  const variables = {
    orderDirection: sortDirection,
    orderBy: sortType,
    searchKeyword,
    first
  }

  const {data, loading, fetchMore, ...result} = useQuery(GET_REPOSITORIES, { variables, fetchPolicy: 'cache-and-network' })

    const handleFetchMore = () => {
      const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
  
      if (!canFetchMore) {
        return;
      }
  
      fetchMore({
        variables: {
          after: data.repositories.pageInfo.endCursor,
          ...variables,
        },
      });
    };
  
    return {
      repositories: data?.repositories,
      fetchMore: handleFetchMore,
      loading,
      ...result,
    };
}

export default useRepositories