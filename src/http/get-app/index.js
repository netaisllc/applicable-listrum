const arc = require( '@architect/functions' );
const headers = require( '@architect/shared/headers' );

const Dependencies = require( '@architect/views/dependencies' )
const Head = require( '@architect/views/head' )
const NavBar = require( './navbar' );
const TopBar = require( './topbar' );
const guard = require( '@architect/views/guard' );
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
						<header>
							${ TopBar() }
						</header>
						<main class="animate__animated animate__fadeIn flx-centered">My Main</main>
						<footer>
							${ NavBar() }
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

exports.handler = arc.http.async( guard, handler )