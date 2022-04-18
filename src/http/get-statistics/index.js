const arc = require( '@architect/functions' );
const headers = require( '@architect/shared/headers' );
const trigger_header = { 'HX-Trigger': 'scope:statistics' };

const handler = async ( req ) => {
	const body = `
		<div class="container-destination">
			<a class="destination flx-centered flx-column" hx-get="/templates" hx-target="#nav-bar">		
				<div class="container-pill flx-centered">
					<img src="/_static/svg/templates.svg" alt="templates icon" />
				</div>
				<h5>Templates</h5>
			</a>
		</div>

		<div class="container-destination">
			<a class="destination flx-centered flx-column" hx-get="/checklists" hx-target="#nav-bar">	
				<div class="container-pill flx-centered">
					<img src="/_static/svg/checklists.svg" alt="checklists icon" />
				</div>
				<h5>Checklists</h5>
			</a>
		</div>

		<div class="container-destination">
			<div class="destination flx-centered flx-column selected">
				<div class="container-pill flx-centered">
					<img src="/_static/svg/statistics_active.svg" alt="statistics icon" />	
				</div>
				<h5>Statistics</h5>
			</div>
		</div>
	`;

	return {
		statusCode: 200,
		headers: { ...headers, ...trigger_header },
		body
	}
}

exports.handler = arc.http.async( handler )