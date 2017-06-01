import { gql } from 'react-apollo';

export default gql `
	query {
		matches {
			id
			region
			world_ids
			last_modified
			scores { red green blue }
			worlds { red_id green_id blue_id }
			all_worlds { red_ids green_ids blue_ids }
		}
	}
`;
