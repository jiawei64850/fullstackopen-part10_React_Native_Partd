import React from 'react';
import { View, FlatList } from 'react-native';
import useRepository from '../../hooks/useRepository';
import { useParams } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import Text from '../Text';
import { styles } from '.';
import ReviewItem from '../UserReviews/ReviewItem';

const RepositoryInfo = ({ repository }) => {
  return (
    <View style={styles.container}>
        <RepositoryItem
          styles={styles}
          fullName={repository.fullName}
          description={repository.description}
          language={repository.language}
          forksCount={repository.forksCount}
          stargazersCount={repository.stargazersCount}
          ratingAverage={repository.ratingAverage}
          reviewCount={repository.reviewCount}
          ownerAvatarUrl={repository.ownerAvatarUrl}
          url={repository.url}
        />
    </View>
  );
};


const SingleRepository = () => {
  const { id } = useParams();
  const { data, loading, error } = useRepository(id, {
    fetchPolicy: 'cache-and-network',
  });
  
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const repository = data.repository
  
  const reviews = repository.reviews.edges
  ? data.repository.reviews.edges.map(edge => edge.node)
  : [];
  

  console.log(reviews);
  
  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} styles={styles} button={false}/>}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      style={styles.container}
    />
  );
};

export default SingleRepository;
