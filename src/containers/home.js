import React      from 'react'
import superagent from 'superagent'
import url        from 'url'
import {Spinner,ErrorState}  from 'zooid-ui'
import Form  from '../components/Form'

export default class Home extends React.Component {
  static initialState = {
    error: null,
    loading: null,
    schema: null,
    schemaUrl: null,
    postUrl: null,
    bearerToken: null,
  }
  state = {...Home.initialState}

  componentDidMount = () => {
    this.fetchSchema()
  }

  componentWillMount = () => {
    const {schemaUrl, postUrl, bearerToken} = url.parse(location.href, true).query
    this.setState({schemaUrl, postUrl, bearerToken})
  }

  fetchSchema = () => {
    this.setState({loading: true})

    superagent
      .get(this.state.schemaUrl)
      .set('Accept', 'application/json')
      .end((error, response) => {
        if (error) {
          return this.setState({...Home.initialState, error})
        }
        this.setState({schema: JSON.parse(response.text), loading: false})
      })
  }

  onSubmit = (model) => {
    this.setState({loading: true})
    superagent
      .post(this.state.postUrl)
      .redirects(0)
      .set('Authorization', `Bearer ${this.state.bearerToken}`)
      .send(model)
      .end((error, response) => {
        if (error) return this.setState({error, schema: null, loading: false})

        window.location = response.headers.location
      })
  }

  render = () => {
    const {schema, postUrl, loading, error} = this.state
    if (loading) return <Spinner />
    if (!schema || !postUrl) return <ErrorState description="Sorry! Looks like we couldn't find your schema or postUrl!" />
    if (error && schema)  return <ErrorState description={error.message} />
    if (schema) return <Form schema={schema} onSubmit={this.onSubmit} />
  }
}
