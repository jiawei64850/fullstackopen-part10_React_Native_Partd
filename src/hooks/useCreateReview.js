import { CREATEREVIEW } from "../graphql/mutations";
import { useMutation } from "@apollo/client";


const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATEREVIEW);
  

  const createReview = async ({ repositoryName, ownerName, rating, text }) => {
    // call the mutate function here with the right arguments
    const { data } = await mutate({
      variables: {
        review: {
          repositoryName,
          ownerName,
          rating, 
          text
        },
      },
    });
    
    
    return { data };
  };
  
  return [createReview, result];
};

export default useCreateReview;