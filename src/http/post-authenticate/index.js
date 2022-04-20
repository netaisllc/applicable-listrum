const arc = require( '@architect/functions' );
const stytch = require( "stytch" )

const headers = require( '@architect/shared/headers' );

// @Shared because many routes will need it.
const { db, q } = require( '@architect/shared/datastore' );

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

// Optimistic redirect for success cases.
const redirect_header = { 'HX-Redirect': '/' };

const verify = async ( req ) => {
	console.log( 'Authenticate route received:', req?.body?.smscode, req?.body?.ingress_method_id )

	// Form Stytch session duration value
	const session_duration_minutes = duration();

	// Call STY authenticate
	const params = {
		method_id: req?.body?.ingress_method_id,
		code: req?.body?.smscode,
		session_duration_minutes
	};

	results = await auth.otps.authenticate( params );

	console.log( 'STYTCH authenticate results', results )

	// login to datastore to get account props and db token

	// Set cookie value using begin session technique

	// redirect to protected page using begin method? (later)

	return {
		statusCode: 200,
		headers: { ...headers, ...redirect_header },
		body: null
	}
}

exports.handler = arc.http.async( verify )