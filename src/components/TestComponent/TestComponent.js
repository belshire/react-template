import React, {Component} from 'react';

class TestComponent extends Component {

  render() {
    const styles = require('./TestComponent.scss');

    return (
      <div>
        <div className={styles.component}>
          <p>Lorem ipsum dolor sit amet, <strong>consectetur</strong> adipiscing elit. Nunc at diam sed <span>quam</span> rhoncus blandit ac aliquet purus. Proin facilisis nec ex ac semper. Morbi in felis nisl. Mauris at purus non sapien ornare maximus vitae pellentesque tellus. Nam neque dui, convallis id <em>maximus</em> eu, pellentesque ut erat.</p>
        </div>

        <div className={styles.component2}>
          <div className={styles.stupid}>
            <span>B</span>
          </div>
        </div>
      </div>
    );
  }
}

export default TestComponent;

