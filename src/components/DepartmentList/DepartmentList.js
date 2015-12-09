import React, { Component, PropTypes } from 'react';

class DepartmentList extends Component {

  state = this.props.flux
              .getStore('departments')
              .getState();

  componentWillMount() {
    this.props.flux
        .getActions('departments')
        .fetch();
  }

  componentDidMount() {
    // Listen for changes on the state and update the state when those happen.
    this.props.flux
        .getStore('departments')
        .listen(this._handleStoreChange);
  }

  _handleStoreChange = (state) => {
    return this.setState(state);
  };

  render() {
    const departments = this.state.departments.map((department, index) => {
      return <li key={index}>{department.name}</li>;
    });

    return (
      <div>
        <h3>Shop Departments</h3>
        <ul>{departments}</ul>
      </div>
    );
  }
}

DepartmentList.propTypes = {
  flux: PropTypes.object.isRequired
};

export default DepartmentList;
