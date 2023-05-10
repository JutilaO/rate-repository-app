import { useQuery } from '@apollo/client'
import { ME } from '../graphql/queries'

const useMe = () => {
  const me = useQuery(ME, { fetchPolicy: 'cache-and-network' })
  return me
}

export default useMe