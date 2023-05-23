import { useQuery } from '@apollo/client'
import { GET_REVIEW } from '../graphql/queries'

const useReview = ({repositoryId, first}) => {

  const variables = {
    repositoryId,
    first
  }

  const {data, loading, fetchMore, ...result} = useQuery(GET_REVIEW, { variables, fetchPolicy: 'cache-and-network' })

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data?.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    reviews: data?.repository,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
}

export default useReview