import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { prefix, defaultProps } from '../utils';
import FormattedMessage from '../IntlProvider/FormattedMessage';

export interface TableHeaderRowProps {
  isoWeek?: boolean;
  className?: string;
  classPrefix?: string;
}

const weekKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

class TableHeaderRow extends React.PureComponent<TableHeaderRowProps> {
  static propTypes = {
    isoWeek: PropTypes.bool,
    className: PropTypes.string,
    classPrefix: PropTypes.string
  };
  render() {
    const { className, classPrefix, isoWeek, ...props } = this.props;
    const addPrefix = prefix(classPrefix);
    const classes = classNames(addPrefix('row'), addPrefix('header-row'), className);
    let items = weekKeys;
    if (isoWeek) {
      items = weekKeys.filter((v, k) => k > 0);
      items.push('sunday');
    }

    return (
      <div {...props} className={classes}>
        {items.map(key => (
          <div key={key} className={addPrefix('cell')}>
            <span className={addPrefix('cell-content')}>
              <FormattedMessage id={key} />
            </span>
          </div>
        ))}
      </div>
    );
  }
}

const enhance = defaultProps<TableHeaderRowProps>({
  classPrefix: 'calendar-table'
});

export default enhance(TableHeaderRow);
