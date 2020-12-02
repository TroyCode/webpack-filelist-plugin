const url = require("url");

const defaults = {
	fileName: "assets-list.json",
	publicPath: ""
	// excludePage: []
};

class PageAssetsPlugin {
	constructor(opts = {}) {
		this.options = {
			...defaults,
			...opts
		};
	}

	apply(compiler) {
		// emit is asynchronous hook, tapping into it using tapAsync, you can use tapPromise/tap(synchronous) as well
		compiler.hooks.emit.tapAsync(
			"PageAssetsPlugin",
			(compilation, callback) => {
				// Create a header string for the generated file:
				const assetsList = [];
				console.log(compilation.options);

				for (const [name, entry] of compilation.entrypoints) {
					assetsList.push({
						pageName: name,
						files: entry
							.getFiles()
							.map(file =>
								url.resolve(compilation.options.output.publicPath, file)
							)
					});
				}

				// Insert this list into the webpack build as a new file asset:
				compilation.assets[this.options.fileName] = {
					source: function () {
						return JSON.stringify(assetsList, null, 2);
					},
					size: function () {
						return assetsList.length;
					}
				};

				callback();
			}
		);
	}
}

module.exports = PageAssetsPlugin;
