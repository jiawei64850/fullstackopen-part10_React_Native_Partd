import React from 'react';
import { View, FlatList } from 'react-native';
import Text from '../Text';
import ReviewItem from './ReviewItem';
import useMe from '../../hooks/useMe';
import { styles } from '../RepositoryList';



const UserReviews = () => {
  const { data, loading, error, refetch } = useMe({includeReviews: true});
  
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  
  const reviews = data.me
  ? data.me.reviews.edges.map(edge => edge.node)
  : [];
  
  
  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} styles={styles} button={true} refetch={refetch}/>}
      keyExtractor={({ id }) => id}
      style={styles.container}
    />
  );
};

export default UserReviews;
