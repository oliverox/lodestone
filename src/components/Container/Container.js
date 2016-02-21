/** Container Element
 *  Renders a div element with class 'container'.
 *  Usually used for the main centered wrapper
 */

import React from 'react';

export const Container = (prop) => {
  return (
    <div {...prop} className={'container'}>
      {prop.children}
    </div>
  );
};
