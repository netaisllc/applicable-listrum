const checklists = () => {
	return `
		<div class="hidden top-bar" id="menu-checklists">
		<img 
			id="menu" 
			src="/_static/svg//menu.svg" 
			hx-get="/drawer/checklists" 
			hx-target="#drawer"
		/>

		<div 
			class="container-title">	
			<h2>Checklists</h2>
		</div>

		<img src="/_static/svg/search.svg" /> 

	</div>
	`;
}