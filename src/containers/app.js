import React, { PropTypes } from 'react';
import 'zooid-ui/dist/style.css'
import './styles.css'
import {AppBar} from 'zooid-ui'

export default class App extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  }

  render() {
    return (
      <div id="main-container">
        <AppBar title="Form Service" />
        {this.props.children}
      </div>
    )
  }
}
