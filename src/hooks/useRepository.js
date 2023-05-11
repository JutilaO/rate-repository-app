import { useQuery } from '@apollo/client'
import { GET_REPOSITORY } from '../graphql/queries'

const useRepository = (repositoryId) => {
  const repository = useQuery(GET_REPOSITORY, { variables: { repositoryId }, fetchPolicy: 'cache-and-network' })
  if(!repository.loading){
    return repository.data
  }
}

export default useRepository