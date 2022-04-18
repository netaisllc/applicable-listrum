const templates = () => {
	return `
		<div class="hidden top-bar" id="menu-templates">
			<img 
				id="menu" 
				src="/_static/svg/menu.svg" 
				hx-get="/drawer/templates" 
				hx-target="#drawer"
			/>

			<div 
				class="container-title">	
				<h2>Templates</h2>
			</div>

			<img src="/_static/svg/search.svg" /> 

		</div>
	`;
}

module.exports = templates;