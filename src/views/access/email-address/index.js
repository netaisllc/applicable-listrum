const email = ( use_case ) => {
	const task = use_case.split( ' ' )[ 0 ];
	const first = use_case.charAt( 0 ).toUpperCase();
	const remainder = use_case.slice( 1 );
	const action = `${ first }${ remainder }`;

	// TODO Use external Email component herein

	return `
		<div class="access-action animate__animated animate__fadeIn">
			<h2>${ action }</h2>
			<form hx-post="/access">
				<div class="input-container">
					<input autocomplete="email" id="access-email-address" inputmode="email" type="text" name="emailaddress" placeholder=" " required="required" />
					<label class="placeholder-label" for="access-email-address">Email address</label>
				</div>
				<input id="task" class="hidden" name="task" type="text" value=${ task } />
				<button class="primary" type="submit">Continue</button>
			</form>
		</div>	
	`;
}

module.exports = email;
