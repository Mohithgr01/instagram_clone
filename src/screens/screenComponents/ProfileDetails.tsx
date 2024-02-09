import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Image} from '@gluestack-ui/themed';
import {TouchableOpacity, Dimensions, ActivityIndicator} from 'react-native';
import {usePostContext} from './PostContext'; // Import the necessary context
import {blogs} from '../../utils/blogs'; // Import your data source
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionic from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const ProfileDetails = () => {
  const {posts} = usePostContext(); // Assuming you have a context for posts

  const newPosts = posts.filter(filterPost => filterPost.isNew);

  const [refreshPost, setRefreshPost] = useState(posts);
  const [loading, setLoading] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const [likes, setLikes] = useState({});

  const handleLike = postId => {
    setLikes(prevLikes => {
      const newLikes = {...prevLikes};
      if (newLikes[postId]) {
        newLikes[postId] = false;
      } else {
        newLikes[postId] = true;
      }
      return newLikes;
    });
  };

  useEffect(() => {
    setRefreshPost(posts);
  }, [posts]);

  const loadMorePosts = () => {
    setLoading(true);
    setTimeout(() => {
      const newData = [...refreshPost, ...blogs];
      setRefreshPost(newData);
      setLoading(false);
    }, 1000);
  };

  const handleImageChange = index => {
    setActiveImageIndex(index);
  };

  return (
    <FlatList
      data={newPosts} // Use newPosts instead of posts
      renderItem={({item, index}) => (
        <View
          key={index}
          style={{
            paddingBottom: 10,
            borderBottomColor: 'gray',
            borderBottomWidth: 0.1,
          }}>
          {/* Render your profile details here */}
          <Text>{/* Profile name, avatar, bio, etc. */}</Text>

          {/* Render posts */}
          <View>
            {/* Render each post */}
            <Image
              source={item.postPersonImage}
              style={{width: 40, height: 40, borderRadius: 100}}
            />
            <Text>{item.postTitle}</Text>
            {/* Additional post details */}

            <FlatList
              horizontal
              data={item.postImage}
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={(image, index) => index.toString()}
              renderItem={({item: image, index: imageIndex}) => (
                <TouchableOpacity onPress={() => handleImageChange(imageIndex)}>
                  <Image
                    key={index}
                    source={image}
                    style={{
                      width: Dimensions.get('window').width,
                      height: 300,
                    }}
                  />
                </TouchableOpacity>
              )}
              onScroll={e => {
                const x = e.nativeEvent.contentOffset.x;
                setActiveImageIndex(
                  Math.round(x / Dimensions.get('window').width),
                );
              }}
              scrollEventThrottle={16}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 12,
                paddingVertical: 15,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => handleLike(item.id)}
                  style={{marginRight: 10}}>
                  <AntDesign
                    name={likes[item.id] ? 'heart' : 'hearto'}
                    size={20}
                    color={likes[item.id] ? 'red' : 'black'}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionic
                    name="chatbubble-outline"
                    style={{fontSize: 20, paddingRight: 10}}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Feather name="navigation" style={{fontSize: 20}} />
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {item.postImage.length > 1 &&
                  item.postImage.map((image, imageIndex) => (
                    <MaterialIcons
                      key={imageIndex}
                      name="circle"
                      style={{
                        marginRight: 5,
                        fontSize: 20,
                        color:
                          imageIndex === activeImageIndex ? 'blue' : 'black',
                      }}
                    />
                  ))}
              </View>
              <Feather name="bookmark" style={{fontSize: 20}} />
            </View>
            <Text>
              {likes[item.id]
                ? `Liked by you & ${item.likes + 1} people`
                : item.likes > 0
                ? `Liked by ${item.likes} people`
                : null}
            </Text>
          </View>
        </View>
      )}
      ListFooterComponent={loading ? <ActivityIndicator /> : null}
      onEndReached={loadMorePosts}
      onEndReachedThreshold={0.5}
    />
  );
};

export default ProfileDetails;
