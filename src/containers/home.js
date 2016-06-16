import React      from 'react'
import superagent from 'superagent'
import url        from 'url'
import {Spinner,ErrorState}  from 'zooid-ui'
import Form  from '../components/Form'

export default class Home extends React.Component {
  static initialState = {
    error: null,
    loadingSchema: null,
    loadingFormSchema: null,
    loadingSubmit: null,
    schema: null,
    formSchema: null,
    schemaUrl: null,
    postUrl: null,
    bearerToken: null,
  }
  state = {...Home.initialState}

  componentWillMount = () => {
    const {schemaUrl, formSchemaUrl, postUrl, bearerToken} = url.parse(location.href, true).query
    this.setState({schemaUrl, formSchemaUrl, postUrl, bearerToken})
  }

  componentDidMount = () => {
    this.fetchSchema()
    this.fetchFormSchema()
  }

  fetchFormSchema = () => {
    if(!this.state.formSchemaUrl) return

    this.setState({loadingFormSchema: true})

    superagent
      .get(this.state.formSchemaUrl)
      .set('Accept', 'application/json')
      .end((error, response) => {
        if (error) {
          return this.setState({...Home.initialState, error})
        }
        this.setState({formSchema: JSON.parse(response.text), loadingFormSchema: false})
      })
  }

  fetchSchema = () => {
    this.setState({loadingSchema: true})

    superagent
      .get(this.state.schemaUrl)
      .set('Accept', 'application/json')
      .end((error, response) => {
        const schema = this.parseResponse(response)
        if (error) return this.setState({...Home.initialState, error})
        if (!schema) return this.setState({...Home.initialState, new Error('Could not load the schema')})

        this.setState({schema: schema, loadingSchema: false})
      })
  }

  onSubmit = (model) => {
    this.setState({loadingSubmit: true})
    superagent
      .post(this.state.postUrl)
      .redirects(0)
      .set('Authorization', `Bearer ${this.state.bearerToken}`)
      .send(model)
      .end((error, response) => {
        if (error) return this.setState({...Home.initialState, error})

        window.location = response.headers.location
      })
  }

  parseResponse = (response) => {
    if (!response) return
    try {
      return JSON.parse(response.text)
    }
  }

  render = () => {
    const {formSchema, schema, postUrl, loadingSchema, loadingFormSchema, loadingSubmit, error} = this.state
    const loading = loadingSchema || loadingFormSchema || loadingSubmit

    if (!postUrl) return <ErrorState description="Required GET parameter 'postUrl' is missing." />
    if (error)  return <ErrorState description={error.message} />
    if (loading) return <Spinner />

    return <Form schema={schema} formSchema={formSchema} onSubmit={this.onSubmit} />
  }
}
