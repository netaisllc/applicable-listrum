const headers = require( '@architect/shared/headers' );

exports.handler = async function http( req ) {
	const body = `
	<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="description" content="">
		<link rel="icon" href="./favicon.ico">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
		<meta name="theme-color" content="#26d175">

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
				<section class="app-animation"> 
				<header>
					My Header
				</header>
				<main class="flx-centered">My Main</main>
				<footer>
					My Footer
				</footer>
				</section>
			</div>
		</div>

		<!-- Surfaces -->
		<section id="scrim" class="blurred-container dark scrim"></section>
		<section 
			id="drawer" 
			class="drawer" 
			
			_="on drawer:open from body toggle .open on me then toggle .reveal on #scrim 
			on drawer:close toggle .open on me then toggle .reveal on #scrim"
		>
		</section>	

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