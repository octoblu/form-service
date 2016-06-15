import classNames from 'classnames'
import React from 'react'

import {SchemaForm, utils} from 'react-schema-form'
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import styles from './JsonSchemaEditor.css'

const THEME_OVERRIDES = {
  palette: {
    primary1Color: '#14568f'
  }
}

class JsonSchemaEditor extends React.Component {
  static propTypes = {
    schema: React.PropTypes.object.isRequired,
    form: React.PropTypes.array,
    model: React.PropTypes.object,
    onSubmit: React.PropTypes.func
  }

  state = {
    muiTheme: getMuiTheme(THEME_OVERRIDES)
  }

  componentWillMount = () => {
    this.state.model = this.props.model
  }

  onChange = (key, value) => {
    const newModel = this.state.model
    utils.selectOrSet(key, newModel, value)
    this.setState({ model: newModel })
  }

  onSubmit = () => {
    this.props.onSubmit(this.state.model)
  }

  render() {
    const {model, muiTheme} = this.state
    const {schema, form} = this.props

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <SchemaForm schema={schema} form={form} model={model} onModelChange={this.onChange}></SchemaForm>
          <div className={styles.alignRight}>
            <RaisedButton label="Submit" primary onMouseUp={this.onSubmit} />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default JsonSchemaEditor
