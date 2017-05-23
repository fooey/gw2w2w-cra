import { gql } from 'react-apollo';

export default gql`
	query match($worldId: ID) {
		match(world_id: $worldId) {
			id
			region
			world_ids
			worlds { red_id green_id blue_id }
			all_worlds { red_ids green_ids blue_ids }
			scores { red green blue }
			kills { red green blue }
			deaths { red green blue }
			maps {
				id
				type
				scores { red green blue }
				kills { red green blue }
				deaths { red green blue }
				objectives {
					id
					type
					owner
					last_flipped
					claimed_by
					points_tick
					points_capture
					yaks_delivered
				}
			}
			skirmishes {
				id
				scores { red green blue }
				map_scores {
					type
					scores { red green blue }
				}
			}
		}
	}
`;
