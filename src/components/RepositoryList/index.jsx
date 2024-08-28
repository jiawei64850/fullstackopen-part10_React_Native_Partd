import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import theme from '../../theme';
import useFindRepositories from '../../hooks/useFindRepositories';
import Text from '../Text';
import { useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useDebounce } from 'use-debounce';

export const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    backgroundColor: 'lightgrey',
    paddingBottom: 10,
  },
  item: {
    backgroundColor: 'white',
    padding: 5,
  },
  languageBox: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    paddingVertical: 4,
    paddingHorizontal: 6,
    alignSelf: 'flex-start',
  },
  basicBox: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  nestedBasicBox: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingHorizontal: 7,
    marginHorizontal: 5 
  },
  detailsBox: {
    flexDirection: 'row',
    justifyContent: "space-around",
    marginVertical: 7,
    paddingVertical: 7
  },
  nestedDetailsBox: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'stretch',
  },
  fullName: {
    marginVertical: 5,
    flexShrink: 1,   
    flexWrap: 'wrap',
  },
  description: { 
    color: '#666',
    marginRight: 40,
    paddingRight: 40,
    marginVertical: 7,
    flexShrink: 1,  
    flexWrap: 'wrap',
  },
  avatar: {
    width: 40, 
    height: 40,
    alignItems: 'center',
    marginTop: 7
  },
  statNumber: {
    textAlign: 'center'
  },
  statLabel: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center'
  },
  pressable: {
    backgroundColor: theme.colors.primary,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.8)',
    borderStyle: 'solid',
    marginVertical: 7,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  pressableText: {
    color: 'white',
    textAlign: 'center',
  },
  ratingItem: {
    paddingVertical: 10
  },
  ratingBox: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  nestedRatingBox: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingHorizontal: 7,
    marginHorizontal: 5 
  },
  ratingMark: {
    width: 30, 
    height: 30,
    paddingTop: 6,
    borderRadius: 15,
    borderColor: theme.colors.primary,
    borderWidth: 1.5,  
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 15,
    marginTop: 7
  },
  dropdown: {
    paddingVertical: 10,
    margin: 10,
  },
  reviewBtnBox: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  viewRepoBtn: {
    backgroundColor: theme.colors.primary,
    borderStyle: 'solid',
    marginVertical: 7,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  deleteBtn: {
    backgroundColor: 'red',
    borderStyle: 'solid',
    marginVertical: 7,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});


const OrderMenu = ({ setOrderBy, setOrderDirection }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const handleValueChange = (value) => {
    setSelectedValue(value);

    if (value === 'Latest repositories') {
      setOrderBy('CREATED_AT');
      setOrderDirection('DESC');
    } else if (value === 'Highest rated repositories') {
      setOrderBy('RATING_AVERAGE');
      setOrderDirection('DESC');
    } else if (value === 'Lowest rated repositories') {
      setOrderBy('RATING_AVERAGE');
      setOrderDirection('ASC');
    }
  }

  return (
    <View style={styles.pickerContainer}>
      <Pressable onPress={() => setShowPicker(!showPicker)}>
        <Text style={styles.dropdown} fontWeight="bold" fontSize="subheading">
          Order By {selectedValue} &#x25BC;
        </Text>
      </Pressable>
      {showPicker && (
        <Picker
          selectedValue={selectedValue}
          onValueChange={handleValueChange}
          style={styles.picker}
        >
          <Picker.Item label="Latest repositories" value="Latest repositories" />
          <Picker.Item label="Highest rated repositories" value="Highest rated repositories" />
          <Picker.Item label="Lowest rated repositories" value="Lowest rated repositories" />
        </Picker>
      )}
    </View>
  );
};

const SearchBox = ({ keywords, setKeywords }) => {


  return (
    <Searchbar
      placeholder="Search"
      onChangeText={setKeywords}
      value={keywords}
    />
  );
}

export const RepositoryListContainer = ({ repositories, setOrderBy, setOrderDirection, keywords, setKeywords, onEndReach }) => {
  

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];
  
  const ItemSeparator = () => <View style={styles.separator} />;
    
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={item => item.id}
      renderItem={({item}) => <RepositoryItem 
        {...item} 
        styles={styles}   
        />}
      style={styles.container}
      ListHeaderComponent={() => (
      <>
        <SearchBox keywords={keywords} setKeywords={setKeywords} />
        <OrderMenu setOrderBy={setOrderBy} setOrderDirection={setOrderDirection} />
      </> 
      )}
      onEndReach={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
}


const RepositoryList = () => {
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [orderBy, setOrderBy] = useState('CREATED_AT')
  const [keywords, setKeywords] = useState('');
  const [searchKeyword] = useDebounce(keywords, 500);

  const { repositories, loading, error, fetchMore } = useFindRepositories({ 
    first: 2,
    after: "WyIxYjEwZTRkOC01N2VlLTRkMDAtODg4Ni1lNGEwNDlkN2ZmOGYuamFyZWRwYWxtZXIuZm9ybWlrIiwxNTg4NjU2NzUwMDgwXQ==",
    searchKeyword, 
    orderBy, 
    orderDirection 
  });
  
  
  if (loading)
    return <Text>...loading</Text>

  if (error) {
    console.error(error);
    return { data: null, loading: false };
  }

  const onEndReach = () => {
    if (!repositories.pageInfo.hasNextPage) return;

    fetchMore({
      variables: {
        after: repositories.pageInfo.endCursor, // Pass the endCursor to fetch more data
      },
    });
  };

  return <RepositoryListContainer 
    repositories={repositories} 
    setOrderBy={setOrderBy} 
    onEndReach={onEndReach}
    setOrderDirection={setOrderDirection}
    keywords={keywords}
    setKeywords={setKeywords}
    />;
};

export default RepositoryList;