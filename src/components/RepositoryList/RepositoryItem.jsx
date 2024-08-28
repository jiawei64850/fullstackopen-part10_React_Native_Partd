import { View, Image, Pressable, Linking } from "react-native"
import Text from "../Text";
import { useNavigate } from "react-router-native";

const RepositoryItem = ({
  id,
  fullName,
  description,
  language,
  forksCount,
  stargazersCount,
  ratingAverage,
  reviewCount,
  ownerAvatarUrl,
  url,
  styles,
}) => {
  const navigate = useNavigate();

  const ConvertToK = (number) => {
    return number >= 1000 ? (number / 1000).toFixed(1) + 'k' : number;
  }
  const skipToDetail = () => {
    navigate(`/repositories/${id}`)
  }

  return (
    <Pressable onPress={skipToDetail}>
    <View testID="repositoryItem" style={styles.item}>
      <View style={styles.basicBox}>
        <View style={styles.nestedBasicBox}>
          <Image source={{ uri: ownerAvatarUrl }}  style={styles.avatar}/>
        </View>
        <View style={styles.nestedBasicBox}>
          <Text fontWeight="bold" fontSize="subheading" style={styles.fullName}>{fullName}</Text>
          <Text style={styles.description}>{description}</Text>
          <Text color='primary' style={styles.languageBox}>{language}</Text>
        </View>
      </View>
      <View style={styles.detailsBox}>
        <View style={styles.nestedDetailsBox}>
          <Text fontWeight="bold" style={styles.statNumber}>{ConvertToK(stargazersCount)}</Text>
          <Text style={styles.statLabel}>Stars</Text>
        </View>
        <View style={styles.nestedDetailsBox}>
          <Text fontWeight="bold" style={styles.statNumber}>{ConvertToK(forksCount)}</Text>
          <Text style={styles.statLabel}>Forks</Text>
        </View>
        <View style={styles.nestedDetailsBox}>
          <Text fontWeight="bold" style={styles.statNumber}>{ConvertToK(reviewCount)}</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>
        <View style={styles.nestedDetailsBox}>
          <Text fontWeight="bold" style={styles.statNumber}>{ConvertToK(ratingAverage)}</Text> 
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>
      
      {url && <Pressable onPress={()=> Linking.openURL(url)} style={styles.pressable}>
          <Text fontWeight="bold" style={styles.pressableText}>Open in Github</Text>
      </Pressable>}
    </View>
    </Pressable>
  )
};

export default RepositoryItem;