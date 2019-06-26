import * as React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Ripple from '../Ripple';
import { prefix, getUnhandledProps, defaultProps } from '../utils';

export interface PickerToggleProps {
  classPrefix?: string;
  hasValue?: boolean;
  cleanable?: boolean;
  className?: string;
  children?: React.ReactNode;
  caret?: boolean;
  componentClass: React.ElementType;
  onClean?: (event: React.MouseEvent) => void;
  active?: boolean;
}

interface PickerToggleState {
  active?: boolean;
}

class PickerToggle extends React.Component<PickerToggleProps, PickerToggleState> {
  static propTypes = {
    classPrefix: PropTypes.string,
    hasValue: PropTypes.bool,
    cleanable: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
    caret: PropTypes.bool,
    componentClass: PropTypes.elementType,
    onClean: PropTypes.func,
    active: PropTypes.bool
  };

  static defaultProps = {
    componentClass: 'a',
    caret: true
  };

  toggleRef: React.RefObject<any>;

  constructor(props: PickerToggleProps) {
    super(props);
    this.state = {
      active: false
    };

    this.toggleRef = React.createRef();
  }

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  handleClean = (event: React.MouseEvent<HTMLSpanElement>) => {
    const { onClean } = this.props;
    onClean && onClean(event);
    event.stopPropagation();
    this.handleBlur();
  };

  handleFocus = () => {
    this.setState({ active: true });
  };

  handleBlur = () => {
    this.setState({ active: false });
  };

  onFocus = () => {
    if (this.toggleRef.current && typeof this.toggleRef.current.focus === 'function') {
      this.toggleRef.current.focus();
    }
  };

  renderToggleClean() {
    return (
      <span
        className={this.addPrefix('clean')}
        role="button"
        tabIndex={-1}
        onClick={this.handleClean}
      >
        ✕
      </span>
    );
  }

  render() {
    const {
      componentClass: Component,
      children,
      className,
      hasValue,
      cleanable,
      classPrefix,
      caret,
      active,
      ...rest
    } = this.props;

    const defaultClassName = Component === 'a' ? classPrefix : this.addPrefix('custom');
    const classes = classNames(defaultClassName, className, {
      active: active || this.state.active
    });
    const unhandled = getUnhandledProps(PickerToggle, rest);

    return (
      <Component
        {...unhandled}
        role="combobox"
        tabIndex="0"
        className={classes}
        ref={this.toggleRef}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        <span className={this.addPrefix(hasValue ? 'value' : 'placeholder')}>{children}</span>
        {hasValue && cleanable && this.renderToggleClean()}
        {caret && <span className={this.addPrefix('caret')} />}
        <Ripple />
      </Component>
    );
  }
}

const enhance = defaultProps<PickerToggleProps>({
  classPrefix: 'picker-toggle'
});

export default enhance(PickerToggle);
