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
