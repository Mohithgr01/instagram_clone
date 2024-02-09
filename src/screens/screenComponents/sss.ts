//After edit and delete conditionally rendering,before array of images
// PostContext.js
// PostContext.js
import React, {createContext, useContext, useState} from 'react';
import {blogs} from '../../utils/blogs';

const PostContext = createContext();

export const usePostContext = () => useContext(PostContext);

export const PostProvider = ({children}) => {
  const [currentPostId, setCurrentPostId] = useState(null);

  const [posts, setPosts] = useState(
    blogs.map(post => ({...post, isNew: false})),
  );
  // const [profile,setProfile]

  const addPost = post => {
    post.isNew = true;
    setPosts([post, ...posts]);
    setCurrentPostId(post.id);
  };

  const removePost = postId => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
    setCurrentPostId(null);
  };
  const updatePostCaption = (postId, newCaption) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          caption: newCaption,
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  return (
    <PostContext.Provider
      value={{posts, addPost, removePost, updatePostCaption, currentPostId}}>
      {children}
    </PostContext.Provider>
  );
};

//post.tsx

import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Input,
  InputField,
  RefreshControl,
  Actionsheet,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetIcon,
  ActionsheetContent,
  ActionsheetBackdrop,
} from '@gluestack-ui/themed';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';

import Ionic from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import {TouchableOpacity, ActivityIndicator} from 'react-native';
import Stories from './Stories';
import {usePostContext} from './PostContext';
import {blogs} from '../../utils/blogs';

const Post = () => {
  const {post, posts, removePost, updatePostCaption, currentPostId} =
    usePostContext();

  const [editMode, setEditMode] = useState(false);
  const [editedCaptions, setEditedCaptions] = useState('');

  const [showActionsheet, setShowActionsheet] = React.useState(false);
  const handleClose = () => setShowActionsheet(!showActionsheet);

  // const [updatedPosts, setUpdatedPosts] = useState(blogs);
  const [refreshPost, setRefreshPost] = useState(posts);
  const [loading, setLoading] = useState(false);

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
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (posts) {
      // setRefreshPost([...posts, ...refreshPost]);
      // console.log('Refreshing state changed:', refreshing);
      setRefreshPost(posts);
    }
  }, [posts]);

  const loadMorePosts = () => {
    setLoading(true);
    setTimeout(() => {
      const newData = [...refreshPost, ...blogs];
      setRefreshPost(newData);
      setLoading(false);
    }, 1000);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * blogs.length);
      const newData = blogs.slice(randomIndex, randomIndex + 10);
      setRefreshPost(newData);
      setRefreshing(false);
      console.log('Refreshing posts...');
    }, 1000);
  }, []);

  const [deletePost, setDeletePost] = useState();
  const handleDelete = deleteid => {
    removePost(deleteid);
    setShowActionsheet(false);
  };
  const handleDeleteId = deletePostId => {
    setDeletePost(deletePostId);
  };

  const handleEditCaption = () => {
    setEditMode(true);
    setEditedCaptions(
      posts.find(post => post.id === deletePost)?.caption || '',
    );
    setShowActionsheet(false);
  };

  const handleSaveCaption = () => {
    updatePostCaption(deletePost, editedCaptions);
    setEditMode(false);
  };

  return (
    <FlatList
      data={refreshPost}
      renderItem={({item, index}) => (
        <View
          key={index}
          style={{
            paddingBottom: 10,
            borderBottomColor: 'gray',
            borderBottomWidth: 0.1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 15,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={item.postPersonImage}
                style={{width: 40, height: 40, borderRadius: 100}}
              />
              <View style={{paddingLeft: 5}}>
                <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                  {item.postTitle}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                setShowActionsheet(true);
                handleDeleteId(item.id);
              }}>
              <Feather name="more-vertical" style={{fontSize: 20}} />
            </TouchableOpacity>
            <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
              <ActionsheetBackdrop />
              <ActionsheetContent>
                {currentPostId === deletePost && (
                  <>
                    <ActionsheetItem onPress={() => handleDelete(deletePost)}>
                      <ActionsheetIcon>
                        <MaterialCommunityIcons name="delete" />
                      </ActionsheetIcon>
                      <ActionsheetItemText>Delete</ActionsheetItemText>
                    </ActionsheetItem>
                    <ActionsheetItem onPress={handleEditCaption}>
                      <ActionsheetIcon>
                        <MaterialCommunityIcons name="application-edit" />
                      </ActionsheetIcon>
                      <ActionsheetItemText>Edit</ActionsheetItemText>
                    </ActionsheetItem>
                  </>
                )}
                {currentPostId !== deletePost && (
                  <>
                    <ActionsheetItem onPress={handleClose}>
                      <ActionsheetIcon>
                        <MaterialCommunityIcons name="share" />
                      </ActionsheetIcon>
                      <ActionsheetItemText>Share</ActionsheetItemText>
                    </ActionsheetItem>
                    <ActionsheetItem onPress={handleClose}>
                      <ActionsheetIcon>
                        <Foundation name="archive" />
                      </ActionsheetIcon>
                      <ActionsheetItemText>Archive</ActionsheetItemText>
                    </ActionsheetItem>
                    <ActionsheetItem onPress={handleClose}>
                      <ActionsheetIcon>
                        <MaterialCommunityIcons name="window-close" />
                      </ActionsheetIcon>
                      <ActionsheetItemText>Cancel</ActionsheetItemText>
                    </ActionsheetItem>
                  </>
                )}
              </ActionsheetContent>
            </Actionsheet>
          </View>
          <View
            style={{
              position: 'relative',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={item.postImage}
              style={{width: '100%', height: 300}}
            />
          </View>
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
            <Feather name="bookmark" style={{fontSize: 20}} />
          </View>
          <View style={{paddingHorizontal: 15}}>
            {/* <Text>
              Liked by {likes[item.id] ? item.likes + 1 : item.likes} people
            </Text> */}
            <Text>
              {likes[item.id]
                ? `Liked by you & ${item.likes + 1} people`
                : item.likes > 0
                ? `Liked by ${item.likes} people`
                : null}
            </Text>
            <View>
              {/* <HStack>
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: 14,
                    paddingVertical: 2,
                  }}>
                  {item.caption}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    setEditMode(prevState => ({
                      ...prevState,
                      [item.id]: true,
                    }))
                  }>
                  <FontAwesome5 name="pencil-alt" />
                </TouchableOpacity>
              </HStack> */}
              <View
                style={{
                  // paddingHorizontal: ,
                  marginBottom: 10,
                }}>
                {editMode ? (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Input w={'$1/2'}>
                      <InputField
                        style={{
                          flex: 1,
                          borderBottomWidth: 1,
                          borderColor: 'gray',
                          paddingBottom: 5,
                        }}
                        // defaultValue={item.caption}
                        onChangeText={text => setEditedCaptions(text)}
                        value={editedCaptions}
                      />
                    </Input>
                    <TouchableOpacity
                      onPress={handleSaveCaption}
                      style={{marginLeft: 10}}>
                      <Text style={{color: 'blue'}}>Save</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <Text>{item.caption}</Text>
                )}
              </View>
            </View>
            {!editMode && (
              <Text style={{opacity: 0.4, paddingVertical: 2}}>
                View all comments
              </Text>
            )}
            {!editMode && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}>
                <View style={{flexDirection: 'row'}} alignItems="center">
                  <Image
                    source={item.postPersonImage}
                    style={{
                      width: 25,
                      height: 25,
                      borderRadius: 100,
                      backgroundColor: 'orange',
                      marginRight: 6,
                    }}
                  />
                  <Input size="md" flex={0.9}>
                    <InputField
                      placeholder="Add a comment"
                      style={{opacity: 0.5}}></InputField>
                  </Input>
                </View>
                <View style={{flexDirection: 'row'}} alignItems="center">
                  <Entypo
                    name="emoji-happy"
                    style={{fontSize: 15, color: 'lightgreen'}}
                    marginRight={2}
                  />
                  <Entypo
                    name="emoji-neutral"
                    style={{fontSize: 15, color: 'lightgreen'}}
                    marginRight={2}
                  />
                  <Entypo
                    name="emoji-sad"
                    style={{fontSize: 15, color: 'lightgreen'}}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListHeaderComponent={Stories}
      onEndReached={loadMorePosts}
      onEndReachedThreshold={0.5}
      ListFooterComponent={loading ? <ActivityIndicator /> : null}
    />
    // <View>
    //   {postInfo.map((data, index) => {

    //     return (
    //       <View
    //         key={index}
    //         style={{
    //           paddingBottom: 10,
    //           borderBottomColor: 'gray',
    //           borderBottomWidth: 0.1,
    //         }}>
    //         <View
    //           style={{
    //             flexDirection: 'row',
    //             alignItems: 'center',
    //             justifyContent: 'space-between',
    //             padding: 15,
    //           }}>
    //           <View style={{flexDirection: 'row', alignItems: 'center'}}>
    //             <Image
    //               source={data.postPersonImage}
    //               style={{width: 40, height: 40, borderRadius: 100}}
    //             />
    //             <View style={{paddingLeft: 5}}>
    //               <Text style={{fontSize: 15, fontWeight: 'bold'}}>
    //                 {data.postTitle}
    //               </Text>
    //             </View>
    //           </View>
    //           <Feather name="more-vertical" style={{fontSize: 20}} />
    //         </View>
    //         <View
    //           style={{
    //             position: 'relative',
    //             justifyContent: 'center',
    //             alignItems: 'center',
    //           }}>
    //           <Image
    //             source={data.postImage}
    //             style={{width: '100%', height: 300}}
    //           />
    //         </View>
    //         <View
    //           style={{
    //             flexDirection: 'row',
    //             justifyContent: 'space-between',
    //             alignItems: 'center',
    //             paddingHorizontal: 12,
    //             paddingVertical: 15,
    //           }}>
    //           <View style={{flexDirection: 'row', alignItems: 'center'}}>
    //             <TouchableOpacity onPress={() => setLike(!like)}>
    //               <AntDesign
    //                 name={like ? 'heart' : 'hearto'}
    //                 style={{
    //                   paddingRight: 10,
    //                   fontSize: 20,
    //                   color: like ? 'red' : 'black',
    //                 }}
    //               />
    //             </TouchableOpacity>
    //             <TouchableOpacity>
    //               <Ionic
    //                 name="chatbubble-outline"
    //                 style={{fontSize: 20, paddingRight: 10}}
    //               />
    //             </TouchableOpacity>
    //             <TouchableOpacity>
    //               <Feather name="navigation" style={{fontSize: 20}} />
    //             </TouchableOpacity>
    //           </View>
    //           <Feather name="bookmark" style={{fontSize: 20}} />
    //         </View>
    //         <View style={{paddingHorizontal: 15}}>
    //           <Text>
    //             Liked by {like ? 'you and' : ''}{' '}
    //             {like ? data.likes + 1 : data.likes} others
    //           </Text>
    //           <Text
    //             style={{
    //               fontWeight: '700',
    //               fontSize: 14,
    //               paddingVertical: 2,
    //             }}>
    //             If you enjoy please like and subscribe
    //           </Text>
    //           <Text style={{opacity: 0.4, paddingVertical: 2}}>
    //             View all comments
    //           </Text>
    //           <View
    //             style={{
    //               flexDirection: 'row',
    //               alignItems: 'center',
    //               justifyContent: 'space-around',
    //             }}>
    //             <View style={{flexDirection: 'row'}} alignItems="center">
    //               <Image
    //                 source={data.postPersonImage}
    //                 style={{
    //                   width: 25,
    //                   height: 25,
    //                   borderRadius: 100,
    //                   backgroundColor: 'orange',
    //                   marginRight: 6,
    //                 }}
    //               />
    //               <Input size="md" flex={0.9}>
    //                 <InputField
    //                   placeholder="Add a comment"
    //                   style={{opacity: 0.5}}></InputField>
    //               </Input>
    //             </View>
    //             <View style={{flexDirection: 'row'}} alignItems="center">
    //               <Entypo
    //                 name="emoji-happy"
    //                 style={{fontSize: 15, color: 'lightgreen'}}
    //                 marginRight={2}
    //               />
    //               <Entypo
    //                 name="emoji-neutral"
    //                 style={{fontSize: 15, color: 'lightgreen'}}
    //                 marginRight={2}
    //               />
    //               <Entypo
    //                 name="emoji-sad"
    //                 style={{fontSize: 15, color: 'lightgreen'}}
    //               />
    //             </View>
    //           </View>
    //         </View>
    //       </View>
    //     );
    //   })}

    //   <Fab
    //     size="md"
    //     placement="top right"
    //     isHovered={false}
    //     isDisabled={false}
    //     isPressed={false}>
    //     {/* <FabIcon as={AddIcon} mr="$1" /> */}
    //     <FabLabel>Quick start</FabLabel>
    //   </Fab>
  );
};
export default Post;

//after woprking
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Input,
  InputField,
  RefreshControl,
  Actionsheet,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetIcon,
  ActionsheetContent,
  ActionsheetBackdrop,
} from '@gluestack-ui/themed';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Ionic from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import {TouchableOpacity, ActivityIndicator, Dimensions} from 'react-native';
import Stories from './Stories';
import {usePostContext} from './PostContext';
import {blogs} from '../../utils/blogs';

const Post = () => {
  const {post, posts, removePost, updatePostCaption, currentPostId} =
    usePostContext();

  const [editMode, setEditMode] = useState(false);
  const [editedCaptions, setEditedCaptions] = useState('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const [showActionsheet, setShowActionsheet] = React.useState(false);
  const handleClose = () => setShowActionsheet(!showActionsheet);

  // const [updatedPosts, setUpdatedPosts] = useState(blogs);
  const [refreshPost, setRefreshPost] = useState(posts);
  const [loading, setLoading] = useState(false);

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
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (posts) {
      // setRefreshPost([...posts, ...refreshPost]);
      // console.log('Refreshing state changed:', refreshing);
      setRefreshPost(posts);
    }
  }, [posts]);

  const loadMorePosts = () => {
    setLoading(true);
    setTimeout(() => {
      const newData = [...refreshPost, ...blogs];
      setRefreshPost(newData);
      setLoading(false);
    }, 1000);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * blogs.length);
      const newData = blogs.slice(randomIndex, randomIndex + 10);
      setRefreshPost(newData);
      setRefreshing(false);
      console.log('Refreshing posts...');
    }, 1000);
  }, []);

  const [deletePost, setDeletePost] = useState();
  const handleDelete = deleteid => {
    removePost(deleteid);
    setShowActionsheet(false);
  };
  const handleDeleteId = deletePostId => {
    setDeletePost(deletePostId);
  };

  const handleEditCaption = () => {
    setEditMode(true);
    setEditedCaptions(
      posts.find(post => post.id === deletePost)?.caption || '',
    );
    setShowActionsheet(false);
  };

  const handleSaveCaption = () => {
    updatePostCaption(deletePost, editedCaptions);
    setEditMode(false);
  };

  const handleImageChange = index => {
    setActiveImageIndex(index);
  };

  return (
    <FlatList
      data={refreshPost}
      renderItem={({item, index}) => (
        <View
          key={index}
          style={{
            paddingBottom: 10,
            borderBottomColor: 'gray',
            borderBottomWidth: 0.1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 15,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={item.postPersonImage}
                style={{width: 40, height: 40, borderRadius: 100}}
              />
              <View style={{paddingLeft: 5}}>
                <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                  {item.postTitle}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                setShowActionsheet(true);
                handleDeleteId(item.id);
              }}>
              <Feather name="more-vertical" style={{fontSize: 20}} />
            </TouchableOpacity>
            <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
              <ActionsheetBackdrop />
              <ActionsheetContent>
                {currentPostId === deletePost && (
                  <>
                    <ActionsheetItem onPress={() => handleDelete(deletePost)}>
                      <ActionsheetIcon>
                        <MaterialCommunityIcons name="delete" />
                      </ActionsheetIcon>
                      <ActionsheetItemText>Delete</ActionsheetItemText>
                    </ActionsheetItem>
                    <ActionsheetItem onPress={handleEditCaption}>
                      <ActionsheetIcon>
                        <MaterialCommunityIcons name="application-edit" />
                      </ActionsheetIcon>
                      <ActionsheetItemText>Edit</ActionsheetItemText>
                    </ActionsheetItem>
                  </>
                )}
                {currentPostId !== deletePost && (
                  <>
                    <ActionsheetItem onPress={handleClose}>
                      <ActionsheetIcon>
                        <MaterialCommunityIcons name="share" />
                      </ActionsheetIcon>
                      <ActionsheetItemText>Share</ActionsheetItemText>
                    </ActionsheetItem>
                    <ActionsheetItem onPress={handleClose}>
                      <ActionsheetIcon>
                        <Foundation name="archive" />
                      </ActionsheetIcon>
                      <ActionsheetItemText>Archive</ActionsheetItemText>
                    </ActionsheetItem>
                    <ActionsheetItem onPress={handleClose}>
                      <ActionsheetIcon>
                        <MaterialCommunityIcons name="window-close" />
                      </ActionsheetIcon>
                      <ActionsheetItemText>Cancel</ActionsheetItemText>
                    </ActionsheetItem>
                  </>
                )}
              </ActionsheetContent>
            </Actionsheet>
          </View>
          {/* <View
            style={{
              position: 'relative',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={item.postImage}
              style={{width: '100%', height: 300}}
            />
          </View> */}
          <FlatList
            horizontal
            data={item.postImage}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(image, index) => `${item.id}_${index}`}
            renderItem={({item: image, index: imageIndex}) => (
              <TouchableOpacity onPress={() => handleImageChange(imageIndex)}>
                <Image
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
              {item.postImage.map((image, imageIndex) => (
                <MaterialIcons
                  key={imageIndex}
                  name="circle"
                  style={{
                    marginRight: 5,
                    fontSize: 20,
                    color: imageIndex === activeImageIndex ? 'blue' : 'black',
                  }}
                />
              ))}
            </View>
            <Feather name="bookmark" style={{fontSize: 20}} />
          </View>
          <View style={{paddingHorizontal: 15}}>
            {/* <Text>
              Liked by {likes[item.id] ? item.likes + 1 : item.likes} people
            </Text> */}
            <Text>
              {likes[item.id]
                ? `Liked by you & ${item.likes + 1} people`
                : item.likes > 0
                ? `Liked by ${item.likes} people`
                : null}
            </Text>
            <View>
              {/* <HStack>
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: 14,
                    paddingVertical: 2,
                  }}>
                  {item.caption}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    setEditMode(prevState => ({
                      ...prevState,
                      [item.id]: true,
                    }))
                  }>
                  <FontAwesome5 name="pencil-alt" />
                </TouchableOpacity>
              </HStack> */}
              <View
                style={{
                  // paddingHorizontal: ,
                  marginBottom: 10,
                }}>
                {editMode ? (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Input w={'$1/2'}>
                      <InputField
                        style={{
                          flex: 1,
                          borderBottomWidth: 1,
                          borderColor: 'gray',
                          paddingBottom: 5,
                        }}
                        // defaultValue={item.caption}
                        onChangeText={text => setEditedCaptions(text)}
                        value={editedCaptions}
                      />
                    </Input>
                    <TouchableOpacity
                      onPress={handleSaveCaption}
                      style={{marginLeft: 10}}>
                      <Text style={{color: 'blue'}}>Save</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <Text>{item.caption}</Text>
                )}
              </View>
            </View>
            {!editMode && (
              <Text style={{opacity: 0.4, paddingVertical: 2}}>
                View all comments
              </Text>
            )}
            {!editMode && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}>
                <View style={{flexDirection: 'row'}} alignItems="center">
                  <Image
                    source={item.postPersonImage}
                    style={{
                      width: 25,
                      height: 25,
                      borderRadius: 100,
                      backgroundColor: 'orange',
                      marginRight: 6,
                    }}
                  />
                  <Input size="md" flex={0.9}>
                    <InputField
                      placeholder="Add a comment"
                      style={{opacity: 0.5}}></InputField>
                  </Input>
                </View>
                <View style={{flexDirection: 'row'}} alignItems="center">
                  <Entypo
                    name="emoji-happy"
                    style={{fontSize: 15, color: 'lightgreen'}}
                    marginRight={2}
                  />
                  <Entypo
                    name="emoji-neutral"
                    style={{fontSize: 15, color: 'lightgreen'}}
                    marginRight={2}
                  />
                  <Entypo
                    name="emoji-sad"
                    style={{fontSize: 15, color: 'lightgreen'}}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListHeaderComponent={Stories}
      onEndReached={loadMorePosts}
      onEndReachedThreshold={0.5}
      ListFooterComponent={loading ? <ActivityIndicator /> : null}
    />
    // <View>
    //   {postInfo.map((data, index) => {

    //     return (
    //       <View
    //         key={index}
    //         style={{
    //           paddingBottom: 10,
    //           borderBottomColor: 'gray',
    //           borderBottomWidth: 0.1,
    //         }}>
    //         <View
    //           style={{
    //             flexDirection: 'row',
    //             alignItems: 'center',
    //             justifyContent: 'space-between',
    //             padding: 15,
    //           }}>
    //           <View style={{flexDirection: 'row', alignItems: 'center'}}>
    //             <Image
    //               source={data.postPersonImage}
    //               style={{width: 40, height: 40, borderRadius: 100}}
    //             />
    //             <View style={{paddingLeft: 5}}>
    //               <Text style={{fontSize: 15, fontWeight: 'bold'}}>
    //                 {data.postTitle}
    //               </Text>
    //             </View>
    //           </View>
    //           <Feather name="more-vertical" style={{fontSize: 20}} />
    //         </View>
    //         <View
    //           style={{
    //             position: 'relative',
    //             justifyContent: 'center',
    //             alignItems: 'center',
    //           }}>
    //           <Image
    //             source={data.postImage}
    //             style={{width: '100%', height: 300}}
    //           />
    //         </View>
    //         <View
    //           style={{
    //             flexDirection: 'row',
    //             justifyContent: 'space-between',
    //             alignItems: 'center',
    //             paddingHorizontal: 12,
    //             paddingVertical: 15,
    //           }}>
    //           <View style={{flexDirection: 'row', alignItems: 'center'}}>
    //             <TouchableOpacity onPress={() => setLike(!like)}>
    //               <AntDesign
    //                 name={like ? 'heart' : 'hearto'}
    //                 style={{
    //                   paddingRight: 10,
    //                   fontSize: 20,
    //                   color: like ? 'red' : 'black',
    //                 }}
    //               />
    //             </TouchableOpacity>
    //             <TouchableOpacity>
    //               <Ionic
    //                 name="chatbubble-outline"
    //                 style={{fontSize: 20, paddingRight: 10}}
    //               />
    //             </TouchableOpacity>
    //             <TouchableOpacity>
    //               <Feather name="navigation" style={{fontSize: 20}} />
    //             </TouchableOpacity>
    //           </View>
    //           <Feather name="bookmark" style={{fontSize: 20}} />
    //         </View>
    //         <View style={{paddingHorizontal: 15}}>
    //           <Text>
    //             Liked by {like ? 'you and' : ''}{' '}
    //             {like ? data.likes + 1 : data.likes} others
    //           </Text>
    //           <Text
    //             style={{
    //               fontWeight: '700',
    //               fontSize: 14,
    //               paddingVertical: 2,
    //             }}>
    //             If you enjoy please like and subscribe
    //           </Text>
    //           <Text style={{opacity: 0.4, paddingVertical: 2}}>
    //             View all comments
    //           </Text>
    //           <View
    //             style={{
    //               flexDirection: 'row',
    //               alignItems: 'center',
    //               justifyContent: 'space-around',
    //             }}>
    //             <View style={{flexDirection: 'row'}} alignItems="center">
    //               <Image
    //                 source={data.postPersonImage}
    //                 style={{
    //                   width: 25,
    //                   height: 25,
    //                   borderRadius: 100,
    //                   backgroundColor: 'orange',
    //                   marginRight: 6,
    //                 }}
    //               />
    //               <Input size="md" flex={0.9}>
    //                 <InputField
    //                   placeholder="Add a comment"
    //                   style={{opacity: 0.5}}></InputField>
    //               </Input>
    //             </View>
    //             <View style={{flexDirection: 'row'}} alignItems="center">
    //               <Entypo
    //                 name="emoji-happy"
    //                 style={{fontSize: 15, color: 'lightgreen'}}
    //                 marginRight={2}
    //               />
    //               <Entypo
    //                 name="emoji-neutral"
    //                 style={{fontSize: 15, color: 'lightgreen'}}
    //                 marginRight={2}
    //               />
    //               <Entypo
    //                 name="emoji-sad"
    //                 style={{fontSize: 15, color: 'lightgreen'}}
    //               />
    //             </View>
    //           </View>
    //         </View>
    //       </View>
    //     );
    //   })}

    //   <Fab
    //     size="md"
    //     placement="top right"
    //     isHovered={false}
    //     isDisabled={false}
    //     isPressed={false}>
    //     {/* <FabIcon as={AddIcon} mr="$1" /> */}
    //     <FabLabel>Quick start</FabLabel>
    //   </Fab>
  );
};
export default Post;
