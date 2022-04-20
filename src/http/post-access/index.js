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

// Optimistic redirect for success cases.
const redirect_header = { 'HX-Redirect': '/verify' };

const login = async ( req ) => {
	const phone_number = req?.body?.phonenumber ?? '__no_phone_number';

	console.log( 'Access route received:', phone_number );

	let results = await db.query( q.Call( 'AccountExistsByPhoneNumber', phone_number ) );

	console.log( 'Exists check results:', results );

	// Handle: Phone number exists with modal or bottomsheet
	// Maybe just return nothing but trigger an event that raises a model that uses
	// a particular messge. Or maybe return the message from here into to modal?

	const params = { phone_number };

	results = await auth.otps.sms.loginOrCreate( params );

	// Handle: Login call failure here

	console.log( 'Stytch LoginOrCreate results:', results );

	// Send ingress request id back
	const session = { ingress_method_id: results.phone_id };

	return {
		body: null,
		headers: { ...headers, ...redirect_header },
		session,
		statusCode: 200
	}
}

exports.handler = arc.http.async( login );