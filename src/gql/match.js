import { gql } from 'react-apollo';

export default gql`
	query match($worldSlug: String) {
		match(world_slug: $worldSlug) {
			id
			last_flipped
			claimed_at
			last_modified
			region
			world_ids
			worlds { red_id green_id blue_id }
			all_worlds { red_ids green_ids blue_ids }
			scores { red green blue }
			kills { red green blue }
			deaths { red green blue }
			maps {
				id
				last_flipped
				claimed_at
				last_modified
				type
				scores { red green blue }
				kills { red green blue }
				deaths { red green blue }
				objectives {
					id
					type
					owner
					last_flipped
					claimed_at
					last_modified
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
