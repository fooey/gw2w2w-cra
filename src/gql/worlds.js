import { gql } from 'react-apollo';

export default gql`
	query worlds($ids: [ID]!) {
	  worlds(ids: $ids) {
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
