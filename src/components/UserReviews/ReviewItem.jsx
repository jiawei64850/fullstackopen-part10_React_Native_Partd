import { format } from "date-fns";
import { View, Pressable } from "react-native";
import Text from "../Text";
import useDeleteReview from "../../hooks/useDeleteReview";
import { useNavigate } from "react-router-native";
import { Alert } from "react-native";
const ReviewItem = ({ review, styles, button, refetch }) => {
  const navigate = useNavigate();
  const [deleteReview] = useDeleteReview();

  const fotmattedDate = (date) => {  
    const slicedDate = date.slice(0, 10);
    const result = format(new Date(slicedDate), 'dd.MM.yyyy');
    return result;
  };
  
  const handleViewRepo = () => {    
    navigate(`/repositories/${review.repositoryId}`)
  };

  const propmtDialog = async () => {

    Alert.alert('Delete review', 'Are you sure want to delete this review?', [
      {
        text: 'CANCEL',
        onPress: () => {}, 
        style: 'cancel'
      },
      {
        text: 'DELETE',
        onPress: handledeleteReview,
      },
    ])
    
  }

  const handledeleteReview = async () => {
    try {
      await deleteReview({ deleteReviewId: review.id });
      refetch();  // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  }

  return (
    <View style={styles.item}>
      <View style={styles.ratingBox}>
          <View style={styles.nestedRatingBox}>
            <Text color='primary' style={styles.ratingMark}>{review.rating}</Text>
          </View>
          <View style={styles.nestedRatingBox}>
            <Text fontWeight="bold" fontSize="subheading" style={styles.fullName}>{review.user.username}</Text>
            <Text style={styles.description}>{fotmattedDate(review.createdAt)}</Text>
            <Text style={styles.description}>{review.text}</Text>
          </View>
      </View>
      {button &&
      (<View style={styles.reviewBtnBox}>
        <Pressable style={styles.viewRepoBtn} onPress={handleViewRepo}>
          <Text style={styles.pressableText} fontWeight="bold" fontSize="subheading">View repository</Text>
        </Pressable>
        <Pressable style={styles.deleteBtn} onPress={propmtDialog}>
          <Text style={styles.pressableText} fontWeight="bold" fontSize="subheading">Delete review</Text>
        </Pressable>
      </View>
      )}
    </View>
  )
};

export default ReviewItem;