# vscode-apilint

vscode-apilint is a vs code extension designed to work with the [API linter](github.com/thought-machine/protolint) already installed on machines

## Installation
This extension is not available on the vscode extension market place and must be installed by downloading the extension and installing it manually

1. Go to the [releases page](https://github.com/thought-machine/vscode-protolint/releases) and download the latest version
2. Run `code --install-extension vscode-apilint-{version}.vsix` in the directory the extension was downloaded
3. The extension should be running and should highlight any api errors in your proto files

## Local Development

To compile the solution locally run `npm run compile`

To run the unit tests run `npm run test`

To run the extension in a Visual Studio Code development environment press `F5` in Visual Studio Code