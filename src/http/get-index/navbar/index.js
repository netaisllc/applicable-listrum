const navbar = () => {
	return `
		<!-- Trigger sets initial app scope to Templates -->
		<div 
			class="nav-bar" 
			hx-get="/templates" 
			hx-target="#nav-bar"
			hx-trigger="load after:100ms"
			id="nav-bar" 
		>
		</div>
	`;
}

module.exports = navbar;