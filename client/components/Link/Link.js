import { node, string } from 'prop-types';
import { Link as WouterLink } from 'wouter';

const propTypes = {
  children: node.isRequired,
  to: string.isRequired
};

const Link = ({ children, to, ...restProps }) => (
  <WouterLink href={to}>
    <a {...restProps}>{children}</a>
  </WouterLink>
);

Link.propTypes = propTypes;

export { Link };
