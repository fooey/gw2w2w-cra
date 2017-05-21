import { gql } from 'react-apollo';

export default gql`
	query globals {
		worlds {
			id
			region
			lang
			slugs
			en { name slug }
			es { name slug }
			de { name slug }
			fr { name slug }
			zh { name slug }
		}
		langs {
			name
			slug
			label
		}
	}
`;
