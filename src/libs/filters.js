import { distanceInWordsToNow } from 'date-fns';

export function formatDate (date, prefix = '') {
	return prefix + distanceInWordsToNow( new Date(date), {
		includeSeconds: true,
		addSuffix: ' ago'
	});
}

export function capitalize(value) {
	if ( ! value ) return '';
	value = value.toString();
	return value.charAt(0).toUpperCase() + value.slice(1);
}