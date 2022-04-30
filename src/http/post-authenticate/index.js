const arc = require( '@architect/functions' );
const stytch = require( "stytch" );

const headers = require( '@architect/shared/headers' );

// @Shared because many routes will need it.
const { db, q } = require( '@architect/shared/datastore' );

// Optimistic redirect for success cases.
const redirect_header = { 'HX-Redirect': '/app' };

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
	console.log( 'Authenticate route received:', req?.body?.smscode, req?.body?.ingress_method_id )

	// Call STYTCH authenticate
	const params = {
		method_id: req?.body?.ingress_method_id,
		code: req?.body?.smscode,
		session_duration_minutes: duration()
	};

	// TODO Handle STYTCH call failure

	results = await auth.otps.authenticate( params );

	console.log( 'STYTCH authenticate results', results )

	// Store some STYTCH results
	const { user_id, session_token } = results;
	const session_id = results?.session?.session_id;
	const session_started_at = results?.session?.started_at;
	const session_expires_at = results?.session?.expires_at;

	// login to datastore to get account props and db token
	const db_result = await db.query( q.Call( 'AccountLogin', user_id, session_started_at, session_expires_at ) );

	// TODO Handle db query error

	console.log( 'FAUNA account login results', db_result )

	// Store some db results
	const account_name = db_result?.data?.name ?? '';
	const db_token = db_result?.data?.secret ?? '';
	const organization = db_result?.data?.organization ?? '';

	// Set cookie value using begin session technique

	const session = {
		account_name,
		db_token,
		organization,
		session_id,
		session_token,
		session_expires_at,
		user_id
	}

	console.log( 'BEGIN SESSION object', session )

	// redirect to protected page using begin method? (later)

	return {
		statusCode: 200,
		headers: { ...headers, ...redirect_header },
		body: null,
		session
	}
}

exports.handler = arc.http.async( verify )