const arc = require( '@architect/functions' );
const headers = require( '@architect/shared/headers' );
const trigger_header = { 'HX-Trigger': 'login:phone' };

const Access = require( '@architect/views/access' );
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

						${ Access( 'signup' ) }

						<div class="container-guidance">
							<div class="guidance">
								<a href="#" hx-get="/access-scenario?access=signup&method=email" hx-swap="outerHTML">Signup with email</a>
							</div>
							<div class="guidance">
								<p>Already have an account?</p>
								<p>Use our <a href="/login">passwordless login</a> to get back to work.</p>
							</div>
						</div>
					</section>
				</div>
			</div>	

			${ Dependencies() }
		</body>	
		${ HtmlClose() }
	`;

	return {
		statusCode: 200,
		headers: { ...headers, ...trigger_header },
		body
	}
}

exports.handler = arc.http.async( handler )