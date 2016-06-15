import React, { PropTypes } from 'react';
import url                  from 'url'
import {AppBar, AppBarPrimary, Page}     from 'zooid-ui'

import 'zooid-ui/dist/style.css'
import './styles.css'


export default class App extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  }

  render() {

    return (
      <div id="main-container">
        <AppBar>
          <AppBarPrimary>
            <a className="OctobluAppBar-link OctobluAppBar-link--logo" href="https://app.octoblu.com">
              <img className="OctobluAppBar-logo" src="//d2zw6j512x6z0x.cloudfront.net/master/d48dc0bf063ecc1477d1163831ee8ff17efbbfae/assets/images/octoblu_logo.png"/>
            </a>

            <nav className="OctobluAppBar-nav OctobluAppBar-nav--primary" role="navigation">
              <a className="OctobluAppBar-link" href="https://app.octoblu.com/things">Things</a>
              <a className="OctobluAppBar-link" href="https://app.octoblu.com/design">Design</a>
              <a className="OctobluAppBar-link" href="https://app.octoblu.com/my-flows">Flows</a>
              <a className="OctobluAppBar-link" href="https://app.octoblu.com/bluprints">Bluprints</a>
            </nav>
          </AppBarPrimary>
        </AppBar>
        <Page className="FormPage">
          {this.props.children}
        </Page>
      </div>
    )
  }
}
