/** Column Element
 *  Renders a div element of size x column(s).
 *    'size' : <size of column: 1 ... 12>
 */

import React from 'react';

export const Column = (prop) => {
  const sizes = {
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
    10: 'ten',
    11: 'eleven',
    12: 'twelve'
  };
  const cn = sizes[prop.size] + ' column' + ((prop.size > 1) ? 's' : '');
  return (
    <div {...prop} className={cn}>{prop.children}</div>
  );
};

Column.propTypes = {
  size: React.PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]).isRequired
};
