import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import SingleRepository from './RepositoryList/SingleRepository';
import ReviewForm from './ReviewForm';
import UserReviews from './UserReviews';
import AppBar from './AppBar';
import { Route, Routes, Navigate } from 'react-router-native';
import SignIn from './SignIn';
import SignUp from './SignUp';
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/repositories" element={<RepositoryList />} />
        <Route path="/repositories/:id" element={<SingleRepository />} />
        <Route path='/myreviews' element={<UserReviews />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signout" element={<Navigate to="/signin" replace />} />
        <Route path="/createnewreview" element={<ReviewForm />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;