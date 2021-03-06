const arc = require( '@architect/functions' );
const headers = require( '@architect/shared/headers' );

const Dependencies = require( '@architect/views/dependencies' )
const Head = require( '@architect/views/head' )
const SMSCodeForm = require( '@architect/views/sms-code' );
const { HtmlOpen, HtmlClose } = require( '@architect/views/html' );

const handler = ( req ) => {
	const use_case = 'login';
	const ingress_method_id = req?.session?.ingress_method_id ?? '__no_ingress_method_id';

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
					
						<main>
						${ SMSCodeForm( use_case, ingress_method_id ) }
						</main>

						<div class="container-guidance">
							<div class="guidance flx aln-center jst-between">
								<p>Didn't receive the code?</p>
								<p><a href="https://app.ottopay.com">Send another code</a></p>
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
		headers,
		body
	}
}

exports.handler = arc.http.async( handler )