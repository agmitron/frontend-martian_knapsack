import React from 'react';
import { node, string } from 'prop-types';
import { Link as WouterLink } from 'wouter';

const propTypes = {
  children: node.isRequired,
  to: string.isRequired
};

const Link = React.forwardRef(({ children, to, ...restProps }, ref) => (
  <WouterLink href={to}>
    <a {...restProps} ref={ref}>
      {children}
    </a>
  </WouterLink>
));

Link.propTypes = propTypes;
Link.displayName = 'Link';

export { Link };
