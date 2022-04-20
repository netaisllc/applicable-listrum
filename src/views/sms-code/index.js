const smsCode = ( use_case ) => {
	const first = use_case.charAt( 0 ).toUpperCase();
	const remainder = use_case.slice( 1 );
	const action = `${ first }${ remainder }`;

	return `
		<div class="flx flx-column">
			<h3>${ action }</h3>
			<form hx-post="/authenticate">
				<div class="flx aln-center jst-between">
					<label>Verify code</label>
					<input autocomplete="one-time-code" inputmode="numeric" type="text" name="smscode" required="required" />
				</div>
				<button type="submit">${ action }</button>
			</form>
		</div>
	`;
}

module.exports = smsCode;
