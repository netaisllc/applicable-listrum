const arc = require( '@architect/functions' );
const headers = require( '@architect/shared/headers' );
const SMSCode = require( '@architect/views/sms-code' );

const handler = ( req ) => {
	const use_case = 'login';
	const ingress_method_id = req?.session?.ingress_method_id ?? '__no_ingress_method_id';

	const body = `
		<html lang="en">
		<head>
			<meta charset="utf-8">
			<meta name="description" content="">
			<link rel="icon" href="/_static/favicon.ico">
			<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
			<meta name="theme-color" content="#454545">

			<link rel="preconnect" href="https://fonts.googleapis.com">
			<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
			
			<link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,300;0,400;0,700;1,300;1,400&display=swap" rel="stylesheet">
			<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet">	

			<link href="/_static/style/app.css" rel="stylesheet">

			<title>Stongcloud - HHOBAA</title>
		</head>
		
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
						${ SMSCode( use_case, ingress_method_id ) }
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

			<!-- Dependencies -->
			<script src="https://unpkg.com/hyperscript.org@0.9.5"></script>
			<script src="https://unpkg.com/htmx.org@1.7.0" integrity="sha384-EzBXYPt0/T6gxNp0nuPtLkmRpmDBbjg6WmCUZRLXBBwYYmwAUxzlSGej0ARHX0Bo" crossorigin="anonymous"></script>
		</body>	
		`;

	return {
		statusCode: 200,
		headers,
		body
	}
}

exports.handler = arc.http.async( handler )