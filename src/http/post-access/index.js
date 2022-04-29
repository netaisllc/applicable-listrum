const arc = require( '@architect/functions' );
const stytch = require( "stytch" )

const headers = require( '@architect/shared/headers' );

// Optimistic redirect for success cases.
const with_phone_redirect_header = { 'HX-Redirect': '/verify' };
const with_email_redirect_header = { 'HX-Redirect': '/check-email' };

// @Shared because many routes will need it.
const { db, q } = require( '@architect/shared/datastore' );

// Constructed here because only a few routes use it and we don't want to 
// bloat all routes by @sharing it.
const auth = new stytch.Client( {
	project_id: process.env.STYTCH_PROJECT_ID,
	secret: process.env.STYTCH_SECRET,
	env: stytch.envs.test,
} );

const accessWithEmail = async ( email_address, task ) => {
	const isLogin = task === 'login' ? true : false;
	const isSignup = task === 'signup' ? true : false;

	const exists = await db.query( q.Call( 'AccountExistsByEmail', email_address ) );

	// TODO Handle Fauna call failure here

	console.log( 'FAUNA Exists check results:', exists );

	if ( isLogin && !exists ) {
		// TODO handle this more + clientside
		console.log( 'ERROR, Login requires email to exist but it does not', email_address );
	}

	if ( isSignup && exists ) {
		// TODO handle this more + clientside
		console.log( 'ERROR, Signup requires email to be available but it is already in use', email_address );
	}

	const params = {
		email: email_address,

		// TODO replace with cloud sited
		//login_magic_link_url: "https://example.com/authenticate",
		//signup_magic_link_url: "https://example.com/authenticate",
	};

	let results = await auth.magicLinks.email.loginOrCreate( params );

	// TODO Handle: STYTCH call failure here

	console.log( 'STYTCH LoginOrCreate results:', results );

	if ( isSignup ) {
		const nil = "_";

		// placehold for props we dont have yet
		results = await db.query( q.Call( 'AccountCreate', results.user_id, email_address, nil, nil, nil ) );

		console.log( 'FAUNA AccountCreate results:', results );
	}

	return {
		body: null,
		headers: { ...headers, ...with_email_redirect_header },
		statusCode: 200
	}
}

const accessWithPhone = async ( phone_number, task ) => {
	const isLogin = task === 'login' ? true : false;
	const isSignup = task === 'signup' ? true : false;

	const exists = await db.query( q.Call( 'AccountExistsByPhone', phone_number ) );

	// Handle Fauna call failure here

	console.log( 'FAUNA Exists check results:', exists );

	if ( isLogin && !exists ) {
		// TODO handle this more + clientside
		console.log( 'ERROR, Login requires phone number to exist but it does not', phone_number );
	}

	if ( isSignup && exists ) {
		// TODO handle this more + clientside
		console.log( 'ERROR, Signup requires phone_number to be available but it is already in use', phone_number );
	}

	const params = { phone_number };

	const results = await auth.otps.sms.loginOrCreate( params );

	// TODO Handle: STYTCH call failure here

	console.log( 'STYTCH LoginOrCreate results:', results );

	if ( isSignup ) {
		const nil = "_";

		// placehold for props we dont have yet
		const db_results = await db.query( q.Call( 'AccountCreate', results.user_id, nil, nil, nil, phone_number ) );

		console.log( 'FAUNA AccountCreate results:', db_results );
	}

	// Send back ingress request id
	const session = { ingress_method_id: results.phone_id };

	return {
		body: null,
		headers: { ...headers, ...with_phone_redirect_header },
		session,
		statusCode: 200
	}
}

const loginOrSignup = async ( req ) => {
	const email_address = req?.body?.emailaddress ?? '__no_email_address';
	const phone_number = req?.body?.phonenumber ?? '__no_phone_number';
	const task = req?.body?.task ?? '__no_task';

	const withEmail = email_address && phone_number.includes( '__no' ) ? true : false;

	console.log( 'Access route received:', task, email_address, phone_number );

	if ( withEmail ) {
		return await accessWithEmail( email_address, task );
	}

	if ( !withEmail ) {
		return await accessWithPhone( phone_number, task );
	}

	console.log( 'ERROR: unknown use case', task, email_address, phone_number );

	return {
		statusCode: 500
	}
}

exports.handler = arc.http.async( loginOrSignup );

