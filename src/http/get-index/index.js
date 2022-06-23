const arc = require( '@architect/functions' );
const headers = require( '@architect/shared/headers' );

const Dependencies = require( '@architect/views/dependencies' )
const Head = require( '@architect/views/head' )
const { HtmlOpen, HtmlClose } = require( '@architect/views/html' );

const handler = ( req ) => {
	const body = `
		${ HtmlOpen() }
		${ Head() }
		
		<body>
			<!-- App -->
			<div class="full-page">
				<div class="app-shell">
					<section class="app-animation"> 
					<header></header>
					<main class="flx-centered">
						<div class="flx flx-column">
							<h1>Marketing Site Stand-in</h1>
							<a href="/login" alt="Link to Login page" style="margin-top: 1rem;">Login</a>
							<a href="/signup" alt="Link to Signup page" style="margin-top: 1rem;">Signup</a>
						</div>
					</main>
					<footer></footer>
					</section>
				</div>
			</div>
			${ Dependencies() }
			
		</body>	
		${ HtmlClose() }
	`;

	return {
		statusCode: 200,
		headers,
		body
	}
}

exports.handler = arc.http.async( handler )