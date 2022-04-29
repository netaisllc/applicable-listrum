const EmailAddressForm = require( './email-address' );
const PhoneNumberForm = require( './phone-number' );

const access = ( use_case ) => {
	const with_email = `${ use_case } with email`;
	const with_phone = `${ use_case } with phone`;

	return `
		<main>
			<div class="container-access-form" 
				_="on login:email from body add .hidden to me 
					on login:phone from body remove .hidden from me
					on signup:email from body add .hidden to me 
					on signup:phone from body remove .hidden from me"
			>
				${ PhoneNumberForm( with_phone ) }
			</div>

			<div class="container-access-form hidden" 
				_="on login:email from body remove .hidden from me 
					on login:phone from body add .hidden to me
					on signup:email from body remove .hidden from me 
					on signup:phone from body add .hidden to me"
			>
				${ EmailAddressForm( with_email ) }
			</div>
	</main>
	`;
}

module.exports = access;