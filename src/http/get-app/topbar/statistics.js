const statistics = () => {
	return `
		<div class="hidden top-bar" id="menu-statistics">
		<img 
			id="menu" 
			src="/_static/svg/menu.svg" 
			hx-get="/drawer/statistics" 
			hx-target="#drawer"
		/>

		<div 
			class="container-title">	
			<h2>Statistics</h2>
		</div>

		<img src="/_static/svg/search.svg" /> 

		</div>
	`;
}

module.exports = statistics;