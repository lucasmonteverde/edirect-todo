import { distanceInWordsToNow } from 'date-fns';

export function formatDate (date) {
	return distanceInWordsToNow( new Date(date), {
		includeSeconds: true,
		addSuffix: ' ago'
	});
}