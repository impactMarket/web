# Impact Market web application

## Stack
- [Nextjs](https://nextjs.org/docs)
- [Styled Components](https://styled-components.com/docs)
- [Prismic](https://prismic.io/docs/technologies/javascript)
- [Typescript](https://www.typescriptlang.org/)

## Features
- Eslint extends → [eslint-config-im](https://github.com/impactMarket/eslint-config-im)
- Styled-components helper functions → [polished](https://polished.js.org/)
- Grid → [react-styled-flexboxgrid](https://github.com/LoicMahieu/react-styled-flexboxgrid)
- Icons management → [@psoares/svg-list](https://github.com/psoaresbj/svg-list)
- Add steroirds to Styled-components → [@psoares/svg-list](https://github.com/psoaresbj/styled-gen)

## Instructions
_Development_
```
$ nvm use
$ yarn
$ yarn dev
```

_Build and run_
```
$ nvm use
$ yarn
$ yarn build
$ yarn start
```

## Troubleshooting
If you face this error running yarn dev:

Something went wrong installing the "sharp" module

Cannot find module '../build/Release/sharp.node'
Require stack:
- /Users/paulosousa/Projects/web/node_modules/sharp/lib/constructor.js
- /Users/paulosousa/Projects/web/node_modules/sharp/lib/index.js
- /Users/paulosousa/Projects/web/node_modules/next/dist/server/image-optimizer.js
- /Users/paulosousa/Projects/web/node_modules/next/dist/server/next-server.js
- /Users/paulosousa/Projects/web/node_modules/next/dist/server/next.js
- /Users/paulosousa/Projects/web/node_modules/next/dist/server/lib/start-server.js
- /Users/paulosousa/Projects/web/node_modules/next/dist/cli/next-dev.js
- /Users/paulosousa/Projects/web/node_modules/next/dist/bin/next

- Remove the "node_modules/sharp" directory, run "npm install" and look for errors
- Consult the installation documentation at https://sharp.pixelplumbing.com/en/stable/install/
- Search for this error at https://github.com/lovell/sharp/issues

error Command failed with exit code 1.

First check the node version you're using, after this a solution might be, remove node_modules/sharp, then run yarn add false sharp