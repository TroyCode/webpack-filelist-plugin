class FileListPlugin {
	apply(compiler) {
		// emit is asynchronous hook, tapping into it using tapAsync, you can use tapPromise/tap(synchronous) as well
		compiler.hooks.emit.tapAsync("FileListPlugin", (compilation, callback) => {
			// Create a header string for the generated file:
			var filelist = [];

			for (const [name, entry] of compilation.entrypoints) {
				filelist.push({
					pageName: name,
					files: entry.getFiles()
				});
			}

			// Insert this list into the webpack build as a new file asset:
			compilation.assets["filelist.json"] = {
				source: function () {
					return JSON.stringify(filelist);
				},
				size: function () {
					return filelist.length;
				}
			};

			callback();
		});
	}
}

module.exports = FileListPlugin;
