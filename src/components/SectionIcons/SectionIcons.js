import React, {Component, PropTypes} from 'react';

class SectionIcons extends Component {
  state = this.props.flux.getStore('section-icons')
              .getState();

  componentWillMount() {
    this.props.flux.getActions('section-icons')
        .fetch();
  }

  componentDidMount() {
    // Listen for changes on the state and update the state when those happen.
    this.props.flux
        .getStore('section-icons')
        .listen(this._handleStoreChange);
  }

  _handleStoreChange = (state) => {
    return this.setState(state);
  };

  render() {
    const styles = require('./SectionIcons.scss');
    const icons = this.state.icons.map((icon, index) => {
      return (
        <li key={index}>
          <img src={icon.imageUrl} />
          <span>{icon.label}</span>
        </li>
      );
    });

    return (
      <div>
        <h3>Section Icons</h3>

        <ul className={`${styles.sectionIcons} gr-5`}>
          {icons}
        </ul>
      </div>
    );
  }
}

SectionIcons.propTypes = {
  flux: PropTypes.object.isRequired
};

export default SectionIcons;
