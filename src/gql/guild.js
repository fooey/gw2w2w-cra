import { gql } from 'react-apollo';

export default gql`
	query guild($id: ID!) {
		guild(id: $id) {
			id
			name
			tag
	  }
	}
`;
