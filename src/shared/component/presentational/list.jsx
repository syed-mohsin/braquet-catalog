// @flow

import React from 'react'
import $ from 'jquery'

import Loader from './loader'

class List extends React.Component {
  static defaultProps: Object

  componentDidMount() {
    if (!this.props.message) {
      this.props.loadItems(this.props.data)
    }
  }

  componentWillReceiveProps(newProps: Object) {
    if (JSON.stringify(this.props.data) !== JSON.stringify(newProps.data)) {
      this.props.loadItems(newProps.data)
    }
  }

  componentDidUpdate(prevProps: Object) {
    if (JSON.stringify(this.props.data) !== JSON.stringify(prevProps.data)
      && this.props.shouldScrollTop) {
      $('body').scrollTop(0)
    }
  }

  componentWillUnmount() {
    this.props.clearState()
  }

  props: {
    loadItems: Function,
    clearState: Function,
    items: Object,
    message: string,
    data: Object,
    ListItem: Function,
    listItemHandler?: ?Function, // optional and if passed can be null
    shouldScrollTop: boolean,
  }


  render() {
    const ListItem = this.props.ListItem
    const listItemHandler = this.props.listItemHandler

    return (
      <div className="list-group" style={{ marginBottom: 20 }}>
        {this.props.message === 'success' && this.props.items.size !== 0 &&
         this.props.items.map(item => (
           <ListItem
             key={item.get('_id')}
             item={item}
             listItemHandler={listItemHandler}
           />
         ))}

        {this.props.message === 'loading' && <Loader /> }

        {(this.props.message === 'success' && this.props.items.size === 0) &&
          <div className="alert alert-info text-center">No results</div>}

        {this.props.message === 'failure' &&
          <div className="alert alert-danger text-center d-flex flex-column">
            Failed to Load Data.
            {' '}
            <a role="button" tabIndex="-1" onClick={() => this.props.loadItems(this.props.data)}>Please Try Again</a>
          </div>
        }
      </div>
    )
  }
}

List.defaultProps = {
  listItemHandler: () => {}, // default for optional props
  shouldScrollTop: false,
}

export default List
