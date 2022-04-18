const statistics = () => {
	return `
		<div class="layout-grid" id="drawer-templates" >
		
		<div class="container-drawer-heading flx aln-center jst-between">
			<h4 class="black wt-semibold">Statistics</h4>
			<img _="on click send drawer:close to drawer" 
				id="drawer-close" 
				src="/_static/svg//arrow_back.svg" 
				alt="close menu drawer icon" />				
		</div>

		<div class="container-version">
			Strongcloud Checklist / ${ process.env.APP_VERSION ?? '0' }
		</div>
		
	</div>
	`;
}

module.exports = statistics;