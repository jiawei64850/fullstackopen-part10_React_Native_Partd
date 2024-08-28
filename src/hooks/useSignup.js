import { CREATEUSER } from "../graphql/mutations";
import { useMutation } from "@apollo/client";


const useSignUp = () => {
  const [mutate, result] = useMutation(CREATEUSER);
  
  
  const signUp = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    const { data } = await mutate({
      variables: {
        user: {
          username, 
          password
        },
      },
    });
    console.log(data.username);
    
    
    return { data };
  };
  
  return [signUp, result];
};

export default useSignUp;