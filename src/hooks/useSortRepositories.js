import { useQuery } from '@apollo/client';

import { SORT_REPOSITORIES } from '../graphql/queries';

const useSortRepositories = ({orderBy, orderDirection}) => {

  const { data, loading, error } = useQuery(SORT_REPOSITORIES, {
    variables: { 
      orderBy,
      orderDirection
    },
    fetchPolicy: 'cache-and-network',
  });

  return { data, loading, error };
};

export default useSortRepositories;