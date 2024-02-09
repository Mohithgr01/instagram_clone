//before edit caption


import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Textarea,
  TextareaInput,
  Input,
  InputField,
  Fab,
  FabLabel,
  RefreshControl,
  Actionsheet,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetIcon,
  ActionsheetContent,
  ActionsheetBackdrop,
  HStack,
} from '@gluestack-ui/themed';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';

import Ionic from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity, ActivityIndicator} from 'react-native';
import Stories from './Stories';
import {usePostContext} from './PostContext';

const Post = () => {
  const {posts, removePost} = usePostContext();

  const [showActionsheet, setShowActionsheet] = React.useState(false);
  const handleClose = () => setShowActionsheet(!showActionsheet);

  const postInfo = [
    {
      id: 1,
      postTitle: 'mr shermon',
      postPersonImage: require('../storage/images/58916.jpg'),
      postImage: require('../storage/images/profile2.jpg'),
      likes: 765,
      //   isLiked: false,
      caption: 'Hello',
    },
    {
      id: 2,
      postTitle: 'lollo',
      postPersonImage: require('../storage/images/profile.jpg'),
      postImage: require('../storage/images/profile2.jpg'),
      likes: 765,
      //   isLiked: false,
      caption: 'Hello',
    },
    {
      id: 3,
      postTitle: 'bae z',
      postPersonImage: require('../storage/images/profile2.jpg'),
      postImage: require('../storage/images/profile2.jpg'),
      likes: 2005,
      //   isLiked: false,
      caption: 'Hello',
    },
    {
      id: 4,
      postTitle: 'Selena',
      postPersonImage: require('../storage/images/profile.jpg'),
      postImage: require('../storage/images/sunset.jpg'),
      likes: 765,
      //   isLiked: false,
      caption: 'Hello',
    },
  ];

  const [refreshPost, setRefreshPost] = useState(postInfo);
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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * postInfo.length);
      const newData = postInfo.slice(randomIndex, randomIndex + 10);
      setRefreshPost(newData);
      setRefreshing(false);
    }, 1000);
  }, []);

  const loadMorePosts = () => {
    setLoading(true);
    setTimeout(() => {
      const newData = [...refreshPost, ...postInfo];
      setRefreshPost(newData);
      setLoading(false);
    }, 1000);
  };

  const [deletePost, setDeletePost] = useState();
  const handleDelete = deleteid => {
    removePost(deleteid);
    setShowActionsheet(false);
  };
  const handleDeleteId = deletePostId => {
    setDeletePost(deletePostId);
  };
  return (
    <FlatList
      data={posts}
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
                {/* <ActionsheetDragIndicatorWrapper>
                  <ActionsheetDragIndicator />
                </ActionsheetDragIndicatorWrapper> */}
                <ActionsheetItem onPress={() => handleDelete(deletePost)}>
                  <ActionsheetIcon>
                    <MaterialCommunityIcons name="delete" />
                  </ActionsheetIcon>
                  <ActionsheetItemText>Delete</ActionsheetItemText>
                </ActionsheetItem>
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
                    <MaterialCommunityIcons name="application-edit" />
                  </ActionsheetIcon>
                  <ActionsheetItemText>Edit</ActionsheetItemText>
                </ActionsheetItem>
                <ActionsheetItem onPress={handleClose}>
                  <ActionsheetIcon>
                    <MaterialCommunityIcons name="window-close" />
                  </ActionsheetIcon>
                  <ActionsheetItemText>Cancel</ActionsheetItemText>
                </ActionsheetItem>
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
                  size={24}
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
            <Text>
              Liked by {likes[item.id] ? item.likes + 1 : item.likes} people
            </Text>
            <View>
              <HStack>
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: 14,
                    paddingVertical: 2,
                  }}>
                  {item.caption}
                </Text>
                <FontAwesome5 name="pencil-alt" />
              </HStack>
            </View>
            <Text style={{opacity: 0.4, paddingVertical: 2}}>
              View all comments
            </Text>
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





//jugaad after caption

import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Textarea,
  TextareaInput,
  Input,
  InputField,
  Fab,
  FabLabel,
  RefreshControl,
  Actionsheet,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetIcon,
  ActionsheetContent,
  ActionsheetBackdrop,
  HStack,
} from '@gluestack-ui/themed';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';

import Ionic from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity, ActivityIndicator} from 'react-native';
import Stories from './Stories';
import {usePostContext} from './PostContext';

const Post = () => {
  const {posts, removePost} = usePostContext();

  const [captains, setCaptains] = useState({});

  const [editedCaption, setEditedCaption] = useState('');
  const [editedPostId, setEditedPostId] = useState(null);

  const [showActionsheet, setShowActionsheet] = React.useState(false);
  const handleClose = () => setShowActionsheet(!showActionsheet);

  const postInfo = [
    {
      id: 1,
      postTitle: 'mr shermon',
      postPersonImage: require('../storage/images/58916.jpg'),
      postImage: require('../storage/images/profile2.jpg'),
      likes: 765,
      //   isLiked: false,
      caption: 'Hello',
    },
    {
      id: 2,
      postTitle: 'lollo',
      postPersonImage: require('../storage/images/profile.jpg'),
      postImage: require('../storage/images/profile2.jpg'),
      likes: 765,
      //   isLiked: false,
      caption: 'Hello',
    },
    {
      id: 3,
      postTitle: 'bae z',
      postPersonImage: require('../storage/images/profile2.jpg'),
      postImage: require('../storage/images/profile2.jpg'),
      likes: 2005,
      //   isLiked: false,
      caption: 'Hellxcxcx',
    },
    {
      id: 4,
      postTitle: 'Selena',
      postPersonImage: require('../storage/images/profile.jpg'),
      postImage: require('../storage/images/sunset.jpg'),
      likes: 765,
      //   isLiked: false,
      caption: 'Hello',
    },
  ];

  const [refreshPost, setRefreshPost] = useState(postInfo);
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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * postInfo.length);
      const newData = postInfo.slice(randomIndex, randomIndex + 10);
      setRefreshPost(newData);
      setRefreshing(false);
    }, 1000);
  }, []);

  const loadMorePosts = () => {
    setLoading(true);
    setTimeout(() => {
      const newData = [...refreshPost, ...postInfo];
      setRefreshPost(newData);
      setLoading(false);
    }, 1000);
  };

  const [deletePost, setDeletePost] = useState();
  const handleDelete = deleteid => {
    removePost(deleteid);
    setShowActionsheet(false);
  };
  const handleDeleteId = deletePostId => {
    setDeletePost(deletePostId);
  };

  const handleEditCaption = (postId, caption) => {
    // setEditedPostId(postId);
    // setEditedCaption(caption);
    setCaptains(prevCaptions => ({
      ...prevCaptions,
      [postId]: caption,
    }));
  };

  // Function to save the edited caption
  const saveEditedCaption = postId => {
    // Update the post with the edited caption in your state or context
    // For now, let's just log the edited caption
    // console.log('Edited caption:', editedCaption);
    // setEditedCaption(editedCaption);
    // setEditedPostId(null);

    setCaptains(prevCaptions => ({
      ...prevCaptions,
      [postId]: '', // Clear the caption after saving
    }));
  };
  return (
    <FlatList
      data={posts}
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
                setSelectedPostId(item.id);
              }}>
              <Feather name="more-vertical" style={{fontSize: 20}} />
            </TouchableOpacity>
            <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
              <ActionsheetBackdrop />
              <ActionsheetContent>
                {/* <ActionsheetDragIndicatorWrapper>
                  <ActionsheetDragIndicator />
                </ActionsheetDragIndicatorWrapper> */}
                <ActionsheetItem onPress={() => handleDelete(deletePost)}>
                  <ActionsheetIcon>
                    <MaterialCommunityIcons name="delete" />
                  </ActionsheetIcon>
                  <ActionsheetItemText>Delete</ActionsheetItemText>
                </ActionsheetItem>
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
                    <MaterialCommunityIcons name="application-edit" />
                  </ActionsheetIcon>
                  <ActionsheetItemText>Edit</ActionsheetItemText>
                </ActionsheetItem>
                <ActionsheetItem onPress={handleClose}>
                  <ActionsheetIcon>
                    <MaterialCommunityIcons name="window-close" />
                  </ActionsheetIcon>
                  <ActionsheetItemText>Cancel</ActionsheetItemText>
                </ActionsheetItem>
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
                  size={24}
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
            <Text>
              Liked by {likes[item.id] ? item.likes + 1 : item.likes} people
            </Text>
            <View>
              <TouchableOpacity
                onPress={() => handleEditCaption(item.id, item.caption)}>
                <Feather name="edit" style={{fontSize: 20}} />
              </TouchableOpacity>
              <View style={{paddingHorizontal: 15}}>
                {editedPostId === item.id ? (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Input w={'$full'}>
                      <InputField
                        // value={editedCaption}
                        value={captains[item.id]}
                        // onChangeText={setEditedCaption}
                        onChangeText={text => handleEditCaption(item.id, text)}
                        placeholder="Edit caption"
                        style={{
                          flex: 1,
                          borderBottomWidth: 1,
                          borderColor: 'gray',
                        }}
                      />
                    </Input>
                    <TouchableOpacity
                      onPress={() => saveEditedCaption(item.id)}>
                      <Feather
                        name="check"
                        size={24}
                        style={{marginLeft: 10}}
                      />
                    </TouchableOpacity>
                  </View>
                ) : editedCaption ? (
                  <Text>{editedCaption}</Text>
                ) : (
                  <Text>{item.caption}</Text>
                )}
                {/* // ) : (
                //   <Text>{item.caption}</Text>
                // )} */}
              </View>

              {/* <HStack>
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: 14,
                    paddingVertical: 2,
                  }}>
                  {item.caption}
                </Text>
                <FontAwesome5 name="pencil-alt" />
              </HStack> */}
            </View>
            <Text style={{opacity: 0.4, paddingVertical: 2}}>
              View all comments
            </Text>
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




//latest jugaad
import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Textarea,
  TextareaInput,
  Input,
  InputField,
  Fab,
  FabLabel,
  RefreshControl,
  Actionsheet,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetIcon,
  ActionsheetContent,
  ActionsheetBackdrop,
  HStack,
} from '@gluestack-ui/themed';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';

import Ionic from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity, ActivityIndicator} from 'react-native';
import Stories from './Stories';
import {usePostContext} from './PostContext';

const Post = () => {
  const {posts, removePost} = usePostContext();

  const [editMode, setEditMode] = useState({});
  const [editedCaptions, setEditedCaptions] = useState({});

  const [showActionsheet, setShowActionsheet] = React.useState(false);
  const handleClose = () => setShowActionsheet(!showActionsheet);

  const postInfo = [
    {
      id: 1,
      postTitle: 'mr shermon',
      postPersonImage: require('../storage/images/58916.jpg'),
      postImage: require('../storage/images/profile2.jpg'),
      likes: 765,
      //   isLiked: false,
      caption: 'Hello',
    },
    {
      id: 2,
      postTitle: 'lollo',
      postPersonImage: require('../storage/images/profile.jpg'),
      postImage: require('../storage/images/profile2.jpg'),
      likes: 765,
      //   isLiked: false,
      caption: 'Hello',
    },
    {
      id: 3,
      postTitle: 'bae z',
      postPersonImage: require('../storage/images/profile2.jpg'),
      postImage: require('../storage/images/profile2.jpg'),
      likes: 2005,
      //   isLiked: false,
      caption: 'Hello',
    },
    {
      id: 4,
      postTitle: 'Selena',
      postPersonImage: require('../storage/images/profile.jpg'),
      postImage: require('../storage/images/sunset.jpg'),
      likes: 765,
      //   isLiked: false,
      caption: 'Hello',
    },
  ];

  const [refreshPost, setRefreshPost] = useState(postInfo);
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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * postInfo.length);
      const newData = postInfo.slice(randomIndex, randomIndex + 10);
      setRefreshPost(newData);
      setRefreshing(false);
    }, 1000);
  }, []);

  const loadMorePosts = () => {
    setLoading(true);
    setTimeout(() => {
      const newData = [...refreshPost, ...postInfo];
      setRefreshPost(newData);
      setLoading(false);
    }, 1000);
  };

  const [deletePost, setDeletePost] = useState();
  const handleDelete = deleteid => {
    removePost(deleteid);
    setShowActionsheet(false);
  };
  const handleDeleteId = deletePostId => {
    setDeletePost(deletePostId);
  };

  const handleEditCaption = (postId, caption) => {
    setEditedCaptions(prevState => ({
      ...prevState,
      [postId]: caption,
    }));
  };

  const handleSaveCaption = postId => {
    setEditMode(prevState => ({
      ...prevState,
      [postId]: false,
    }));
    // Here you can update the caption in your data source, e.g., your postInfo array or context
    // You can replace this with your actual update logic
    console.log('Saving edited caption:', editedCaptions[postId]);
  };
  return (
    <FlatList
      data={posts}
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
                {/* <ActionsheetDragIndicatorWrapper>
                  <ActionsheetDragIndicator />
                </ActionsheetDragIndicatorWrapper> */}
                <ActionsheetItem onPress={() => handleDelete(deletePost)}>
                  <ActionsheetIcon>
                    <MaterialCommunityIcons name="delete" />
                  </ActionsheetIcon>
                  <ActionsheetItemText>Delete</ActionsheetItemText>
                </ActionsheetItem>
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
                {/* <ActionsheetItem onPress={handleClose}>
                  <ActionsheetIcon>
                    <MaterialCommunityIcons name="application-edit" />
                  </ActionsheetIcon>
                  <ActionsheetItemText>Edit</ActionsheetItemText>
                </ActionsheetItem> */}
                <ActionsheetItem onPress={handleClose}>
                  <ActionsheetIcon>
                    <MaterialCommunityIcons name="window-close" />
                  </ActionsheetIcon>
                  <ActionsheetItemText>Cancel</ActionsheetItemText>
                </ActionsheetItem>
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
                  size={24}
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
            <Text>
              Liked by {likes[item.id] ? item.likes + 1 : item.likes} people
            </Text>
            <View>
              <HStack>
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
              </HStack>
              <View
                style={{
                  paddingHorizontal: 15,
                  marginBottom: 10,
                }}>
                {editMode[item.id] ? (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Input
                      style={{
                        flex: 1,
                        borderBottomWidth: 1,
                        borderColor: 'gray',
                        paddingBottom: 5,
                      }}
                      defaultValue={item.caption}
                      onChangeText={text => handleEditCaption(item.id, text)}
                    />
                    <TouchableOpacity
                      onPress={() => handleSaveCaption(item.id)}
                      style={{marginLeft: 10}}>
                      <Text style={{color: 'blue'}}>Save</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <Text>{editedCaptions[item.id] || item.caption}</Text>
                )}
              </View>
            </View>
            <Text style={{opacity: 0.4, paddingVertical: 2}}>
              View all comments
            </Text>
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



///context

// PostContext.js
import React, {createContext, useContext, useState} from 'react';
import {blogs} from '../../utils/blogs';

const PostContext = createContext();

export const usePostContext = () => useContext(PostContext);

export const PostProvider = ({children}) => {
  const [posts, setPosts] = useState(blogs);
  // const [profile,setProfile]

  const addPost = post => {
    setPosts([post, ...posts]);
  };

  const removePost = postId => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
  };

  return (
    <PostContext.Provider value={{posts, addPost, removePost}}>
      {children}
    </PostContext.Provider>
  );
};


