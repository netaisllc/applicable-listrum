const arc = require( '@architect/functions' );
const headers = require( '@architect/shared/headers' );

const Checklists = require( './checklists' );
const Templates = require( './templates' );
const Statistics = require( './statistics' );

const handler = async = ( req ) => {
	const scope = req?.params?.scope ?? 'templates';

	let body = Templates();

	if ( scope === 'checklists' ) body = Checklists();
	if ( scope === 'statistics' ) body = Statistics();

	return {
		statusCode: 200,
		headers,
		body
	}
}

exports.handler = arc.http.async( handler )