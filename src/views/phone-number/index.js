const phoneNumber = ( use_case ) => {
	const first = use_case.charAt( 0 ).toUpperCase();
	const remainder = use_case.slice( 1 );
	const action = `${ first }${ remainder }`;

	return `
		<div class="flx flx-column">
			<h3>${ action }</h3>
			<form hx-post="/access">
				<div class="flx aln-center jst-between">
					<label>Phone number</label>
					<input autocomplete="tel" inputmode="tel" type="text" name="phonenumber" required="required" />
				</div>
				<button type="submit">${ action }</button>
			</form>
		</div>		
	`;
}

module.exports = phoneNumber;