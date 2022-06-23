const conflict = () => {
	return `
		<section id="scrim" class="blurred-container dark scrim"></section>
		<section id="modal" class="hidden modal animate__animated animate__zoomIn"
			_="on conflict(channel, task, value) from body 
				log event.detail then 

				toggle .hidden on me then 
				toggle .reveal on #scrim then

				if task === 'login' add .login to me else add .signup to me end
				if channel === 'phone' add .phone to me else add .email to me end
				
				put value into .conflict-value"
		>
			<!-- for top spacing only -->
			<div class="modal-head"></div>

			<div class="modal-body">
				<div class="modal-body-login-phone">
					<h2>Phone Number Does Not Exist</h2>
					<div class="content">
						<p>We don't recognize the phone number <b><span class="conflict-value">value</span></b>.</p>
						<p>Only phone numbers already on file can be used to login.</p>
					</div>
				</div>

				<div class="modal-body-signup-phone">
					<h2>Phone Number Already Exists</h2>
					<p>The phone number <b><span class="conflict-value">value</span></b> is already in use.</p>
					<p>Only phone numbers not already on file can be used to signup.</p>
				</div>

				<div class="container-command flx-centered">
					<button _="on click go to url /login">OK</button>
				</div>
			</div>

			<!-- for bottom spacing only -->
			<div class="modal-tail"></div>

		</section>
		`;
}

module.exports = conflict;