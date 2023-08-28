import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './Button.scss';

export default function Button({ block, size = 'md', children, ...props }) {
  return (
    <button className={classNames('button', block && 'block', `size-${size}`)} {...props}>
      {children}
    </button>
  );
}

Button.propTypes = {
  block: PropTypes.boolean,
  children: PropTypes.node,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
};