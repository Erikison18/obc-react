import React from 'react';
import PropTypes from 'prop-types';

class Test extends React.PureComponent {
  render() {
    return <button>test</button>;
  }
}

Test.propTypes = {
  /** Some description here */
  randomProp: PropTypes.string
};

export default Test;

export const Test2 = () => <div>Hi</div>;