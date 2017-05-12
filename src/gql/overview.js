import { gql } from 'react-apollo';

export default gql `
	query overview($slug: ID!) {
		lang(slug: $slug) {
			name
			slug
			label
		}
		matches {
			id
			region
			world_ids
			scores { red green blue }
			worlds { red_id green_id blue_id }
			all_worlds { red_ids green_ids blue_ids }
		}
	}
`;
