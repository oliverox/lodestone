import React from 'react';

/** SimpleButton Element
 *  Renders a simple button.
 *    'type'  : '' | <primary> | <fullWidth>
 */
const SimpleButton = (prop) => {
  const propTypeArr = (prop.type) ? prop.type.split(' ') : [];
  const propMap = {
    'primary': 'button-primary',
    'fullWidth': 'u-full-width'
  };
  let cn = '';
  propTypeArr.forEach((type) => {
    if (type in propMap) {
      cn = (cn + ' ' + propMap[type]).trim();
    }
  });
  if (prop.className) {
    cn = (cn + ' ' + prop.className).trim();
  }
  return (
    <button {...prop} className={cn}>{prop.children}</button>
  );
};

export default SimpleButton;
