const phoneNumber = ( use_case ) => {
	const first = use_case.charAt( 0 ).toUpperCase();
	const remainder = use_case.slice( 1 );
	const action = `${ first }${ remainder }`;

	return `
		<div class="access-action">
			<h2>${ action }</h2>
			<form hx-post="/access">
				<div class="input-container">
					<input autocomplete="tel" id="access-phone-number" inputmode="tel" type="text" name="phonenumber" placeholder=" " required="required" />
					<label class="placeholder-label" for="access-phone-number">Phone number</label>
				</div>
				<button class="primary" type="submit">Continue</button>
			</form>
		</div>	
	`;
}

module.exports = phoneNumber;
