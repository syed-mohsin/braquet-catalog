// @flow

import queryString from 'query-string'

export const HOME_PAGE_ROUTE = '/'
export const QUOTES_PAGE_ROUTE = '/quotes'
export const FAQ_PAGE_ROUTE = '/faq'
export const TEAM_PAGE_ROUTE = '/team'
export const PRIVACY_POLICY_PAGE_ROUTE = '/privacy-policy'

export const API_ORGANIZATIONS_NAMES_ROUTE = '/api/organizations/names'

export const orgNamesEndpointRoute = (domain: ?string) => (
  `${domain || ''}/api/organizations/names`
)

export const quotesEndpointRoute = (domain: ?string, query: ?Object) => (
  `${domain || ''}/api/quotes${query ? `/?${queryString.stringify(query)}` : ''}`
)

export const organizationRedirectEndpointRoute = (organizationId: ?string, query: ?Object) => (
  `/api/organizations/${organizationId || ':organizationId'}/redirect${query ? `/?${queryString.stringify(query)}` : ''}`
)

export const reviewsEndpointRoute = (domain: ?string, organizationId: ?string) => (
  `${domain || ''}/api/reviews/${organizationId || ':organizationId'}`
)
