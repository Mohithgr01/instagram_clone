import React from 'react';
import Profile from '../Profile';

import ProfileFooter from './ProfileFooter';
import {ScrollView} from '@gluestack-ui/themed';

const UserProfile = () => {
  return (
    <ScrollView flex={1}>
      <Profile />
      {/* <ProfileBody /> */}
      <ProfileFooter />
    </ScrollView>
  );
};

export default UserProfile;
