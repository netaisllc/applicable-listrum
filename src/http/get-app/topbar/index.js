const Checklists = require( './checklists' );
const Statistics = require( './statistics' );
const Templates = require( './templates' );

const topbar = () => {
	return `
		<div 
			class="full-width"

			_="on scope:templates from body remove .hidden from #menu-templates
			on scope:templates from body add .hidden to #menu-checklists
			on scope:templates from body add .hidden to #menu-statistics

			on scope:checklists from body add .hidden to #menu-templates
			on scope:checklists from body remove .hidden from #menu-checklists
			on scope:checklists from body add .hidden to #menu-statistics

			on scope:statistics from body add .hidden to #menu-templates
			on scope:statistics from body add .hidden to #menu-checklists
			on scope:statistics from body remove .hidden from #menu-statistics"
		>

			${ Templates() }
			${ Checklists() }
			${ Statistics() }	

		</div>
	`;
}

module.exports = topbar;