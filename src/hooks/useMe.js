import { GET_CURRENT_USER } from '../graphql/queries';
import { useQuery } from "@apollo/client";

const useMe = ({ includeReviews = false }) => {
  const { data, error, loading, refetch }  = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews },
    fetchPolicy: 'network-only',
  })

  return { data, loading, refetch };
};

export default useMe;