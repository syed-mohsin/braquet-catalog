// @flow

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import ReactPaginate from 'react-paginate'
import queryString from 'query-string'

const ITEMS_PER_PAGE = 15

const pageChangeHandler = (history, location) => (page) => {
  const query = queryString.parse(location.search)
  query.page = page.selected + 1
  history.push(`${location.pathname}?${queryString.stringify(query)}`)
}

const mapStateToProps = (state, ownProps) => ({
  pageCount: state.quotes.get('count') / ITEMS_PER_PAGE,
  containerClassName: 'pagination',
  pageClassName: 'page-item',
  previousClassName: 'page-item',
  nextClassName: 'page-item',
  pageLinkClassName: 'page-link',
  previousLinkClassName: 'page-link',
  nextLinkClassName: 'page-link',
  activeClassName: 'active',
  onPageChange: pageChangeHandler(ownProps.history, ownProps.location),
  initialPage: parseInt(queryString.parse(ownProps.location.search).page - 1, 10) || undefined,
})

export default withRouter(connect(mapStateToProps)(ReactPaginate))
