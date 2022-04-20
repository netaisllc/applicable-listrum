const arc = require( '@architect/functions' );
const headers = require( '@architect/shared/headers' );
const trigger_header = { 'HX-Trigger': 'drawer:open' };

const Checklists = require( './checklists.js' );
const Templates = require( './templates.js' );
const Statistics = require( './statistics.js' );

const handler = async = ( req ) => {
	const scope = req?.params?.scope ?? 'templates';

	let body = Templates();

	if ( scope === 'checklists' ) body = Checklists();
	if ( scope === 'statistics' ) body = Statistics();

	return {
		statusCode: 200,
		headers: { ...headers, ...trigger_header },
		body
	}
}

exports.handler = arc.http.async( handler )