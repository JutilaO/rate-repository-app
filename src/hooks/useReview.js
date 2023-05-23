import { useQuery } from '@apollo/client'
import { GET_REVIEW } from '../graphql/queries'

const useReview = (repositoryId) => {
  const review = useQuery(GET_REVIEW, { variables: { repositoryId }, fetchPolicy: 'cache-and-network' })
  if(!review.loading){
    return review.data
  }
}

export default useReview