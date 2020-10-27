# webpack-page-assets-plugin

webpack plugin for generating file list every page.

## Install 

```bash
yarn install webpack-page-assets-plugin
```

## Usage

Create a `webpack.config.js` file:

```javascript
const AssetsPlugin = require("webpack-page-assets-plugin");
const options = {};

module.exports = {
  plugins: [
    new AssetsPlugin(options)
  ]
}
```

And run webpack:

```bash
$ npx webpack
```

With default options, it will create a `filelist.json` file in the output directory for the build. This will contain the name of page and its corresponding entry file paths.  

For example:

```json
[
  {
    "pageName": "App",
    "files": [
      "chunk-vendors.5764437f3776509621e4.js",
      "app.3971705be3aede5e7cac.js"
    ]
  }
]
```

### Options

#### `fileName`

Type: `String`

Default: `filelist.json`

Specifies the file name to use for the resulting file list. By default, the plugin will emit filelist.json to your output directory. Passing an absolute path to the fileName option will override both the file name and path.

#### `publicPath`

Type: `String`

Default: `<webpack-config>.output.publicPath`

A path prefix that will be added to values of the manifest.

#### `exclude`

Type: `Array<RegExp | String>`

Default: `[]`
