import { generateTemplateFiles } from "generate-template-files"

export const options = [
  {
    option: "Component",
    defaultCase: "(pascalCase)",
    entry: {
      folderPath: "./tools/templates/component/__name__/",
    },
    stringReplacers: [{ question: "Insert name", slot: "__name__" }],
    output: {
      path: "./components/__name__",
      overwrite: true,
    },
  },
  {
    option: "Columns",
    defaultCase: "(pascalCase)",
    entry: {
      folderPath: "./tools/templates/columns/__name__/",
    },
    stringReplacers: [{ question: "Insert name", slot: "__name__" }],
    output: {
      path: "./components/__name__",
      overwrite: true,
    },
  },
  {
    option: "Columns Schema",
    defaultCase: "(pascalCase)",
    entry: {
      folderPath: "./tools/templates/columnsSchema/",
    },
    stringReplacers: [{ question: "Insert name", slot: "__name__" }],
    output: {
      path: "./schemas/objects/",
      overwrite: true,
    },
    onComplete: () => {
      // TODO: doing this automatically would be great
      // A codemod is overkill. Maybe a bash script is good enough.
      // https://github.com/facebook/jscodeshift
      // Modify lib/renderBlock.tsx
      // This probably belongs in the 'Columns' template
      /*
      const __name__ = dynamic(() => import('components/block/__name__'))
      ...
      case '__name__':
        return <__name__ key={key} {...block} />
      */
      // Modify schemas/index.ts
      /*
      import __name__ from './objects/__name__'
      import __name__Item from './objects/__name__Item'
      ...
      export { __name__ }
      export { __name__Item }
      ...
      export const schemas = [
      ...
        __name__,
        __name__Item,
      ]
      */
    },
  },
]

generateTemplateFiles(options)
