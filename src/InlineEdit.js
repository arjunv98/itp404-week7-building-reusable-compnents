import React from 'react';

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

export default class InlineEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: props.value,
      editMode: false
    };
  }
  enableEditMode = () => {
    this.setState({
      editMode: true
    });
  }
  handleChange = (event) => {
    this.setState({
      currentValue: event.target.value
    });
  }
  handleKeyUp = (event) => {
    const { keyCode } = event;
    const { currentValue } = this.state;

    if (keyCode === ENTER_KEY || keyCode === ESCAPE_KEY) {
      this.setState({ editMode: false });
    }

    if (keyCode === ENTER_KEY) {
      this.props.onEnter(currentValue);
    } else if (keyCode === ESCAPE_KEY) {
      this.setState({
        currentValue: this.props.value
      });
    }
  }
  render() {
    if (this.state.editMode) {
      return (
        <input
          value={this.state.currentValue}
          onKeyUp={this.handleKeyUp}
          onChange={this.handleChange} />
      );
    }

    return (
      <span onClick={this.enableEditMode}>
        {this.props.value}
      </span>
    );
  }
}