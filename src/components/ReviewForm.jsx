import { View, TextInput, Pressable, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { useFormik } from "formik";
import * as yup from 'yup';
import useCreateReview from "../hooks/useCreateReview";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey'
  },
  box: {
    backgroundColor: 'white',
    padding: 5
  },
  inputbox: {
    color: '#666',
    borderStyle: 'solid',
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginVertical: 7,
    marginHorizontal: 10,
    textAlign: 'left',
    borderWidth: 1,
    borderColor: 'grey',
    height: 40
  },
  pressable: {
    backgroundColor: theme.colors.primary,
    borderStyle: 'solid',
    marginVertical: 7,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    height: 40
  },
  pressableText: {
    color: 'white',
    textAlign: 'center',
  },
});

export const ReviewFormContainer = ( {onSubmit} ) => {
  
  const validationSchema = yup.object().shape({
    repositoryOwnerName: yup
      .string()
      .required('Repository owner name is required'),
    repositoryName: yup
      .string()
      .required('Repository name is required'),
    rating: yup.number()
      .min(0, 'Rating must be at least 0')
      .max(100, 'Rating can be at most 100')
      .required('Rating is required'),
  });
  
  const initialValues = {
    repositoryOwnerName: '',
    repositoryName: '',
    rating: '',
    review: ''
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });


  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <TextInput 
          style={formik.touched.repositoryOwnerName && formik.errors.repositoryOwnerName ? [styles.inputbox, { borderColor: '#d73a4a' }]: styles.inputbox}
          placeholder="Repository owner name"
          value={formik.values.repositoryOwnerName}
          onChangeText={formik.handleChange('repositoryOwnerName')}
        />
        {formik.touched.repositoryOwnerName && formik.errors.repositoryOwnerName && (
        <Text style={{ color: '#d73a4a', paddingHorizontal: 10  }}>{formik.errors.repositoryOwnerName}</Text>
      )}
        <TextInput 
          style={formik.touched.repositoryName && formik.errors.repositoryName ? [styles.inputbox, { borderColor: '#d73a4a' }]: styles.inputbox}
          placeholder="Repository name"
          value={formik.values.repositoryName}
          onChangeText={formik.handleChange('repositoryName')} 
        />
        {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={{ color: '#d73a4a', paddingHorizontal: 10 }}>{formik.errors.repositoryName}</Text>
      )}
        <TextInput 
          style={formik.touched.rating && formik.errors.rating ? [styles.inputbox, { borderColor: '#d73a4a' }]: styles.inputbox}
          placeholder="Rating between 0 and 100"
          value={formik.values.rating}
          onChangeText={formik.handleChange('rating')}
        />
        {formik.touched.rating && formik.errors.rating && (
        <Text style={{ color: '#d73a4a', paddingHorizontal: 10  }}>{formik.errors.rating}</Text>
      )}
        <TextInput 
          style={styles.inputbox}
          placeholder="Review"
          value={formik.values.review}
          onChangeText={formik.handleChange('review')}
          multiline
        />
        <Pressable onPress={formik.handleSubmit} style={styles.pressable}>
          <Text fontWeight="bold" style={styles.pressableText}>Create a review</Text>
        </Pressable>
      </View>
    </View>
  );
}


const ReviewForm = () => {
  const navigate = useNavigate();
  
  const [createReview] = useCreateReview();

  const onSubmit = async (values) => {
    console.log(values);
    const { repositoryName, repositoryOwnerName, rating, review } = values;

    try {
      const { data } = await createReview({ repositoryName, ownerName: repositoryOwnerName, rating: Number(rating), text: review });
      console.log(data);
      navigate(`/repositories/${data.createReview.repositoryId}`)
    } catch (e) {
      console.log(e);
    }
  };

  return <ReviewFormContainer onSubmit={onSubmit} />
};

export default ReviewForm;