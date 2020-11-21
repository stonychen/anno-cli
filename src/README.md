# Useful commands

- Create a folder for our project and enter the project directory on our terminal.

`mkdir cli-project && cd cli-project`

- Initialize a node project

`npm init -y`

- Create an index.js file

`touch index.js`

- Create a symlink in the global folder {prefix}/lib/node_modules/<package> that links to the package

`npm link`

- If show "Refusing to delete /usr/local/bin/anno-cli", when run npm link. Run below

`sudo rm -rf /usr/local/bin/anno-cli`


- Bumps version, updates README, adds git tag
`npm version patch` (major|minor|patch) 

- Publish it to npm

`npm publish`

- References
[https://oclif.io/](https://oclif.io/)
