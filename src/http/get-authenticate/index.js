const arc = require( '@architect/functions' );
const stytch = require( "stytch" )

const headers = require( '@architect/shared/headers' );

// @Shared because many routes will need it.
const { db, q } = require( '@architect/shared/datastore' );

// Optimistic redirect for success cases.
const redirect_header = { location: '/app' };

// Constructed here because only a few routes use it and we don't want to 
// bloat all routes by @sharing it.
const auth = new stytch.Client( {
	project_id: process.env.STYTCH_PROJECT_ID,
	secret: process.env.STYTCH_SECRET,
	env: stytch.envs.test,
} );

const duration = () => {
	return parseInt( process.env[ 'SESSION_LENGTH_MS' ], 10 ) / 60000 ?? 5;
}

const verify = async ( req ) => {
	console.log( 'Authenticate route received:', req?.query?.token )

	// Call STYTCH authenticate
	results = await auth.magicLinks.authenticate( req?.query?.token, { session_duration_minutes: duration() } )

	console.log( 'STYTCH authenticate results', results )

	/// Store some STYTCH results
	const { user_id } = results;
	const session_started_at = Date.now();

	// login to datastore to get account props and db token
	const db_result = await db.query( q.Call( 'AccountLogin', user_id, session_started_at ) );

	// TODO Handle db query error

	console.log( 'FAUNA login/session results', db_result )

	// Store some db results
	const account_name = db_result?.data?.name ?? '';
	const db_token = db_result?.data?.secret ?? '';
	const organization = db_result?.data?.organization ?? '';

	// Set cookie value using begin session technique

	const session = {
		account_name,
		db_token,
		organization,
		user_id
	}

	console.log( 'BEGIN SESSION object', session )

	// Redirect to protected page
	return {
		statusCode: 307,
		headers: { ...headers, ...redirect_header },
		body: null,
		session
	}
}

exports.handler = arc.http.async( verify );
