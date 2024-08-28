import { View, TextInput, Pressable, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { useFormik } from "formik";
import * as yup from 'yup';
import useSignUp from "../hooks/useSignup";
import useSignIn from "../hooks/useSignIn";
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

export const SignUpContainer = ( {onSubmit} ) => {
  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(5, 'Username must at least 5 letters')
      .max(30, 'Username must under 30 letters')
      .required('Username is required'),
    password: yup
      .string()
      .min(5, 'Password must at least 5 letters')
      .max(30, 'Password must under 30 letters')
      .required('Password is required'),
    passwordConfirm: yup.string()
     .oneOf([yup.ref('password'), 'Passwords must match'])
     .required('Password confirm is required'),
  });
  
  const initialValues = {
    username: '',
    password: '',
    passwordConfirm: ''
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
          style={formik.touched.username && formik.errors.username ? [styles.inputbox, { borderColor: '#d73a4a' }]: styles.inputbox}
          placeholder="Username"
          value={formik.values.username}
          onChangeText={formik.handleChange('username')}
        />
        {formik.touched.username && formik.errors.username && (
        <Text style={{ color: '#d73a4a', paddingHorizontal: 10  }}>{formik.errors.username}</Text>
      )}
        <TextInput 
          style={formik.touched.password && formik.errors.password ? [styles.inputbox, { borderColor: '#d73a4a' }]: styles.inputbox}
          placeholder="Password"
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          secureTextEntry={true} 
        />
        {formik.touched.password && formik.errors.password && (
        <Text style={{ color: '#d73a4a', paddingHorizontal: 10 }}>{formik.errors.password}</Text>
      )}
        <TextInput 
          style={formik.touched.passwordConfirm && formik.errors.passwordConfirm ? [styles.inputbox, { borderColor: '#d73a4a' }]: styles.inputbox}
          placeholder="Password Confirmation"
          value={formik.values.passwordConfirm}
          onChangeText={formik.handleChange('passwordConfirm')}
          secureTextEntry={true} 
        />
        {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
        <Text style={{ color: '#d73a4a', paddingHorizontal: 10 }}>{formik.errors.passwordConfirm}</Text>
      )}
        <Pressable onPress={formik.handleSubmit} style={styles.pressable}>
          <Text fontWeight="bold" style={styles.pressableText}>Sign up</Text>
        </Pressable>
      </View>
    </View>
  );
}


const SignUp = () => {
  const navigate = useNavigate();
  
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signUp({ username, password });
      const { data } = await signIn({ username, password });
      console.log(data);
      navigate("/repositories")
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />
};

export default SignUp;