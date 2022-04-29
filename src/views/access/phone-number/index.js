const phoneNumber = ( use_case ) => {
	const task = use_case.split( ' ' )[ 0 ];
	const first = use_case.charAt( 0 ).toUpperCase();
	const remainder = use_case.slice( 1 );
	const action = `${ first }${ remainder }`;

	// TODO Use external PhoneNUmber component herein

	return `
		<div class="access-action animate__animated animate__fadeIn">
			<h2>${ action }</h2>
			<form hx-post="/access">
				<div class="input-container">
					<input autocomplete="tel" id="access-phone-number" inputmode="tel" type="text" name="phonenumber" placeholder=" " required="required" />
					<label class="placeholder-label" for="access-phone-number">Phone number</label>
				</div>
				<input id="task" class="hidden" name="task" type="text" value=${ task } />
				<button class="primary" type="submit">Continue</button>
			</form>
		</div>	
	`;
}

module.exports = phoneNumber;
