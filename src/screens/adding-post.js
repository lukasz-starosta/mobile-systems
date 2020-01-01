import React, { useState } from 'react';
import { View } from 'react-native';
import ScreenContainer from '../layout/screen-container';
import NewPost from '../components/new-post';
import LoadingStatus from '../components/loading';

function AddingPostsScreen({ navigation }) {
  const { club, fetchPosts } = navigation.state.params;
  const [loading, setLoading] = useState(false);

  if (loading) return <LoadingStatus />;

  const setLoadingTrue = () => {
    setLoading(true);
  };
  const setLoadingFalse = () => {
    setLoading(false);
  };

  return (
    <ScreenContainer title="Nowe ogłoszenie">
      <View style={{ paddingBottom: 35 }}>
        <NewPost
          navigation={navigation}
          club={club}
          loading={{ setFalse: setLoadingFalse, setTrue: setLoadingTrue }}
          fetchPosts={fetchPosts}
        />
      </View>
    </ScreenContainer>
  );
}

export default AddingPostsScreen;
