import { gql } from 'react-apollo';

export default gql`
	query world($slug: String!) {
	  world(slug: $slug) {
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
