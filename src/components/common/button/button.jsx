import React from 'react';
import PropTypes from 'prop-types';
import './button.less'

class Test extends React.PureComponent {
  render() {
    return <button className="hah">test</button>;
  }
}

Test.propTypes = {
  /** Some description here */
  randomProp: PropTypes.string
};

export default Test;

export const Test2 = () => <div>Hi</div>;