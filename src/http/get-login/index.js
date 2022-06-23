const arc = require( '@architect/functions' );
const headers = require( '@architect/shared/headers' );
const trigger_header = { 'HX-Trigger': 'login:phone' };

const Conflict = require( '@architect/views/access/conflict' );
const Dependencies = require( '@architect/views/dependencies' );
const Head = require( '@architect/views/head' );
const Page = require( '@architect/views/access/page' );
const { HtmlOpen, HtmlClose } = require( '@architect/views/html' );

const handler = ( req ) => {
	const body = `
		${ HtmlOpen() }
		${ Head() }
		
		<body>
			<!-- App -->
			${ Page() }

			<!-- Surfaces -->
			${ Conflict() }
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