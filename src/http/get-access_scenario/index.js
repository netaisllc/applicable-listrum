const arc = require( '@architect/functions' );
const headers = require( '@architect/shared/headers' );

const trigger_header_login_email = { 'HX-Trigger': 'login:email' };
const trigger_header_login_phone = { 'HX-Trigger': 'login:phone' };

const trigger_header_signup_email = { 'HX-Trigger': 'signup:email' };
const trigger_header_signup_phone = { 'HX-Trigger': 'signup:phone' };

const body_login_email = `<a href="#" hx-get="/access-scenario?access=login&method=email" hx-swap="outerHTML">Login with email</a>`;
const body_login_phone = `<a href="#" hx-get="/access-scenario?access=login&method=phone" hx-swap="outerHTML">Login with phone</a>`;

const body_signup_email = `<a href="#" hx-get="/access-scenario?access=signup&method=email" hx-swap="outerHTML">Signup with email</a>`;
const body_signup_phone = `<a href="#" hx-get="/access-scenario?access=signup&method=phone" hx-swap="outerHTML">Signup with phone</a>`;

const setBody = ( isLogin, withPhone ) => {
	if ( isLogin ) {
		if ( withPhone ) {
			return body_login_email
		}
		else {
			return body_login_phone
		}
	}

	if ( withPhone ) {
		return body_signup_email
	}
	else {
		return body_signup_phone
	}
}

const setHeaders = ( isLogin, withPhone ) => {
	if ( isLogin ) {
		if ( withPhone ) {
			return { ...headers, ...trigger_header_login_phone }
		}
		else {
			return { ...headers, ...trigger_header_login_email }
		}
	}

	if ( withPhone ) {
		return { ...headers, ...trigger_header_signup_phone }
	}
	else {
		return { ...headers, ...trigger_header_signup_email }
	}
}

const handler = async = ( req ) => {
	const isLogin = req?.query?.access === 'login';
	const withPhone = req?.query?.method === 'phone';

	return {
		statusCode: 200,
		headers: setHeaders( isLogin, withPhone ),
		body: setBody( isLogin, withPhone )
	}
}

exports.handler = arc.http.async( handler );