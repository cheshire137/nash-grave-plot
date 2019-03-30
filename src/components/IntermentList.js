import React, { Component } from 'react';
import Interment from '../models/Interment';

class IntermentList extends Component {
  constructor(props) {
    super(props);
    this.state = { interments: [] }
  }

  componentDidMount() {
    this.setState(prevState => ({ interments: Interment.findAll() }));
  }

  render() {
    const { interments } = this.state;

    return (
      <div>
        {interments.slice(0, 10).map(interment => (
          <div key={interment.key}>
            Locale:
            {interment.locale}
          </div>
        ))}
      </div>
    );
  }
}

export default IntermentList;
