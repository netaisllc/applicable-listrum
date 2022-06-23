const scrim = ( classes ) => {
	const _classes = classes ?? '';
	return `<section id="scrim" class="blurred-container dark scrim ${ _classes }"></section>`;
}

module.exports = scrim;