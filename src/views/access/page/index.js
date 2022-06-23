const Form = require( '../form' );

const page = () => {
	return `
		<div class="full-page">
			<div class="app-shell">
				<section class="access layout-grid">
					<div class="hero">
						<div class="headings">
							<h4 class="secondary">Strongcloud</h4>
							<h1 class="jumbo">Checklist</h1>
						</div>
					</div>
		
					${ Form( 'login' ) }
		
					<div class="container-guidance">
						<div class="guidance">
							<a href="#" hx-get="/access-scenario?access=login&method=email" hx-swap="outerHTML">Login with email</a>
						</div>
						<div class="guidance">
							<p>Need an account?</p>
							<p>Use our <a href="/signup">passwordless signup</a> to get one.</p>
						</div>
					</div>
				</section>
			</div>
		</div>`;
}

module.exports = page;