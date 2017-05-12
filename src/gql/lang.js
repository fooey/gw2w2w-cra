import { gql } from 'react-apollo';

export default gql`
	query lang($slug: ID!) {
		lang(slug: $slug) {
			name
			slug
			label
		}
	}
`;
