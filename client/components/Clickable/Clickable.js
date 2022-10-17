/* eslint-disable no-nested-ternary */

import { bool, func, node, string } from 'prop-types';
import cx from 'classnames';

import { Link } from '../Link/Link';

import styles from './Clickable.module.css';

const propTypes = {
  children: node.isRequired,
  className: string,
  href: string,
  target: string,
  to: string,
  type: string,
  onClick: func,
  isDisabled: bool
};

const defaultProps = {
  className: null,
  href: null,
  target: null,
  to: null,
  type: null,
  onClick: null,
  isDisabled: false
};

function getButtonProps({ type, isDisabled }) {
  return {
    type: type || 'button',
    className: cx({ [styles.disabled]: isDisabled }),
    disabled: isDisabled
  };
}

function getLinkProps({ href, target }) {
  const commonProps = { href, target };

  const isTargetBlank = target === '_blank';

  if (isTargetBlank) {
    return { ...commonProps, rel: 'noopener noreferrer' };
  }

  return commonProps;
}

const Clickable = ({
  children,
  className,
  href,
  target,
  to,
  type,
  onClick,
  isDisabled,
  ...restProps
}) => {
  const isExternalLink = Boolean(href);
  const isInternalLink = Boolean(to);

  const [
    ComponentToRender,
    { className: componentClassName, ...componentProps }
  ] = isExternalLink
    ? ['a', getLinkProps({ href, target })]
    : isInternalLink
    ? [Link, { to }]
    : ['button', getButtonProps({ type, isDisabled })];

  return (
    <ComponentToRender
      className={cx(styles.root, className, componentClassName)}
      onClick={onClick}
      {...componentProps}
      {...restProps}
    >
      {children}
    </ComponentToRender>
  );
};

Clickable.propTypes = propTypes;
Clickable.defaultProps = defaultProps;

export { Clickable };
