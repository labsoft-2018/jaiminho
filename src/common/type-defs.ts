import gql from 'graphql-tag'

export default gql`
type Location {
  lat: Float!
  lng: Float!
  address: String!
}
input InputLocation {
  lat: Float!
  lng: Float!
  address: String!
}
`
