import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = () => {
  const repositories = useQuery(GET_REPOSITORIES, { fetchPolicy: 'cache-and-network' })
  if(!repositories.loading){
    return repositories.data.repositories
  }
}

export default useRepositories