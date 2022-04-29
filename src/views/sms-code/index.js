const smsCode = ( use_case, ingress_method_id ) => {
	const first = use_case.charAt( 0 ).toUpperCase();
	const remainder = use_case.slice( 1 );
	const action = `${ first }${ remainder }`;

	return `
		<div class="access-action animate__animated animate__fadeIn">
			<h2>Verify</h2>
			<form hx-post="/authenticate">
				<div class="input-container">
					<input autocomplete="one-time-code" id="access-sms-code" inputmode="numeric" type="text" name="smscode" placeholder=" " required="required" />					
					<label class="placeholder-label" for="access-sms-code">Code</label>

					<input class="hidden" type="text" name="ingress_method_id" value="${ ingress_method_id }" />
				</div>
				<button class="primary" type="submit">${ action }</button>
			</form>
		</div>	
	`;
}

module.exports = smsCode;
