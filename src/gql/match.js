import { gql } from 'react-apollo';

export default gql `
	query match($worldId: ID) {
		match(world_id: $worldId) {
			id
			region
			world_ids
			scores { red green blue }
			worlds { red_id green_id blue_id }
			all_worlds { red_ids green_ids blue_ids }
		}
	}
`;
