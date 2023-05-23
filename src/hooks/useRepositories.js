import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = (sort, searchKeyword) => {

  let sortType = sort === 'latest' ? 'CREATED_AT' : 'RATING_AVERAGE'
  let sortDirection = sort === 'lowest' ? 'ASC' : 'DESC'

  const repositories = useQuery(GET_REPOSITORIES, { variables: { orderDirection: sortDirection, orderBy: sortType, searchKeyword }, fetchPolicy: 'cache-and-network' })
  if(repositories && !repositories.loading && repositories.data){
    return repositories.data.repositories
  }
}

export default useRepositories