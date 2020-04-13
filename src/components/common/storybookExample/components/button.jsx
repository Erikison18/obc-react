import React from 'react';
import PropTypes from 'prop-types';
import './button.less'

class Test extends React.PureComponent {
  render() {
    return (
      <button className={this.props.background === 'red'? 'background-red' : 'background-yellow'}>test</button>
    )
  }
}

Test.propTypes = {
  /** Some description here */
  background: PropTypes.string.isRequired
};

export default Test;

export const Test2 = () => <div>Hi</div>;