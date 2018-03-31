import './helpers';
import moment from 'moment';

function imagePath(filename) {
	return require(`@images/${filename}`);
}

function formatDate(date, format = 'DD/MM/YYYY [às] H:mm:ss') {
	return moment(date).format( format );
}

export { imagePath, formatDate };
