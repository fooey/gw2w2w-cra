import { gql } from 'react-apollo';

export default gql`
	query world($id: ID!) {
		world(id: $id) {
			id
			region
			lang
			en { name slug }
			es { name slug }
			de { name slug }
			fr { name slug }
			zh { name slug }
		}
	}
`;
