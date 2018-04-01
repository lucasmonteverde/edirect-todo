import { distanceInWordsToNow } from 'date-fns';

export function formatDate (date) {
	return distanceInWordsToNow( new Date(date), {
		includeSeconds: true,
		addSuffix: ' ago'
	});
}

export function capitalize(value) {
	if ( ! value ) return '';
	value = value.toString();
	return value.charAt(0).toUpperCase() + value.slice(1);
}