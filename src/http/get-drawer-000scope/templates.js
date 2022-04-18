const templates = () => {
	return `
		<div class="layout-grid" id="drawer-templates" >
		
		<div class="container-drawer-heading flx aln-center jst-between">
			<h4 class="black wt-semibold">Templates</h4>
			<img _="on click send drawer:close to drawer" 
				id="drawer-close" 
				src="/_static/svg//arrow_back.svg" 
				alt="close menu drawer icon" />		
		</div>

		<div class="container-drawer-items">
			<div class="container-item-group">
				<h4 class="strong wt-semibold">Owner</h4>
				<p class="item selected">Organization</p>
				<p class="item">Community</p>
			</div>

			<div class="container-item-group">
				<h4 class="strong wt-semibold">Sort</h4>
				<p class="item selected">Name</p>
				<p class="item">Type</p>
				<p class="item">Author</p>
				<p class="item">Date</p>
			</div>
			
			<div class="container-item-group">
				<h4 class="strong wt-semibold">Task</h4>
				<p class="item selected">Start checklists from templates</p>
				<p class="item">Author/Edit templates</p>
			</div>

			<div class="container-item-group single">
				<h4 class="strong wt-semibold">My Account</h4>
			</div>

			<div class="container-item-group single">
				<h4 class="strong wt-semibold">Logout</h4>
			</div>		
		</div>

		<div class="container-version">
			Strongcloud Checklist / ${ process.env.APP_VERSION ?? '0' }
		</div>
		
	</div>
	`;
}

module.exports = templates;