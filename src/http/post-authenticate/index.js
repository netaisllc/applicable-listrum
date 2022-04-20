// Echo version

const arc = require( '@architect/functions' )

const verify = async ( req ) => {
	console.log( 'Authenticate route received:', req?.body.smscode )

	return {
		location: '/'
	}
}

exports.handler = arc.http.async( verify )