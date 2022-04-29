const arc = require( '@architect/functions' );
const headers = require( '@architect/shared/headers' );

const Dependencies = require( '@architect/views/dependencies' );
const Head = require( '@architect/views/head' );
const { HtmlOpen, HtmlClose } = require( '@architect/views/html' );

const handler = ( req ) => {
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
							<div class="container-wait-for-magic-link flx-centered">
								<div>
									<h4>Check your email for a magic link.</h4>
									<p>Click the magic link to access the app, then close this window.</p>
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

	return {
		statusCode: 200,
		headers,
		body
	}
}

exports.handler = arc.http.async( handler )