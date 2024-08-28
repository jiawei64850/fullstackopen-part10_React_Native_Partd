import { DELETEREVIEW } from "../graphql/mutations";
import { useMutation } from "@apollo/client";


const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETEREVIEW);
  

  const deleteReview = async ({ deleteReviewId }) => {
    // call the mutate function here with the right arguments
    const { data } = await mutate({
      variables: {
        deleteReviewId
      },
    });
    
    
    return { data };
  };
  
  return [deleteReview, result];
};

export default useDeleteReview;