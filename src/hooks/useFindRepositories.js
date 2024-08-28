import { useQuery } from '@apollo/client';

import { FIND_REPOSITORIES } from '../graphql/queries';

const useFindRepositories = ({orderBy, orderDirection, searchKeyword}) => {

  const { data, loading, error, fetchMore, ...result } = useQuery(FIND_REPOSITORIES, {
    variables: { 
      orderBy,
      orderDirection,
      searchKeyword
    },
    fetchPolicy: 'cache-and-network',
  });

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
};

export default useFindRepositories;