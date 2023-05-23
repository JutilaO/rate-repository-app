import { useQuery } from '@apollo/client'
import { ME } from '../graphql/queries'

const useMe = ({includeReviews}) => {
  const me = useQuery(ME, {variables: {includeReviews}, fetchPolicy: 'cache-and-network' })
  if(me && !me.loading && me.data){
    return me.data.me
  }
}

export default useMe