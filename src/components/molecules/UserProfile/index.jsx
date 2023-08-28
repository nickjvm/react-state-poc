import React from 'react';
import PropTypes from 'prop-types';

import './UserProfile.scss';

export default function UserProfile({ user }) {
  return (
    <div id="profile" className="container">
      <h1>Hello {user.username}!</h1>
    </div>
  );
}

UserProfile.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }),
};