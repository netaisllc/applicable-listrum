const guard = async ( req ) => {
	if ( req.session.user_id ) {
		// Returning advances to the next middleware function
		return
	}
	else {
		return {
			statusCode: 307,
			location: '/login'
		}
	}
}

module.exports = guard;