const arc = require( '@architect/functions' );
const faunadb = require( 'faunadb' );
const headers = require( '@architect/shared/headers' );
const stytch = require( "stytch" );

// @Shared because many routes will need it.
const { db, q } = require( '@architect/shared/datastore' );

const Dependencies = require( '@architect/views/dependencies' );
const Head = require( '@architect/views/head' );
const { HtmlOpen, HtmlClose } = require( '@architect/views/html' );

// Constructed here because only a few routes use it and we don't want to 
// bloat all routes by @sharing it.
const auth = new stytch.Client( {
	project_id: process.env.STYTCH_PROJECT_ID,
	secret: process.env.STYTCH_SECRET,
	env: stytch.envs.test,
} );

const handler = async ( req ) => {
	const body = `
		${ HtmlOpen() }
		${ Head() }
		
		<body>
			<!-- App -->
			<div class="full-page">
				<div class="app-shell">
					<section class="access layout-grid">
						<div class="hero">
							<div class="headings">
								<h4 class="secondary">Strongcloud</h4>
								<h1 class="jumbo">Checklist</h1>
							</div>
						</div>
					
						<main class="flx jst-center">
							<div class="container-logged-out flx-centered">
								<div class="flx flx-column aln-center jst-center">
									<h3>You are logged out.</h3>
									<p>Thank you for using Strongcloud Checklist.</p>
									<p>Don't forget to close this tab (or your browser).</p>
								</div>
							</div>
						</main>

						<div class="container-guidance"></div>
						
					</section>
				</div>
			</div>	

			${ Dependencies() }
		</body>	
		${ HtmlClose() }
	`;

	const auth_id = req?.session?.user_id ?? '__no_auth_id';
	const db_token = req?.session?.db_token ?? '__no_db_token';
	const session_id = req?.session?.session_id ?? '__no_session_id';

	const customerClient = new faunadb.Client( { secret: db_token } );

	console.log( 'AuthId', auth_id, 'DBToken', db_token, 'SessionId', session_id );

	try {
		const results = await Promise.all( [
			customerClient.query( q.Logout( true ) ),
			db.query( q.Call( 'SessionEnd', db_token, auth_id ) ),
			auth.sessions.revoke( { session_id } )
		] );

		console.log( 'LOGOUT multiple promise results', results );

		// Clear session cookie
		const session = {};

		return {
			statusCode: 200,
			headers,
			body,
			session
		}

	}
	catch ( err ) {
		console.log( 'LOGOUT experienced network error.', JSON.stringify( err ) );

		return {
			status: 500,
			body: JSON.stringify( err )
		};
	}
}

exports.handler = arc.http.async( handler )