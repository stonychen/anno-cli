# Anno-cli

## What is Anno-cli

Anno-cli is a cli tool which can be used with [Anno.js](https://stonychen.github.io/anno.js/) together.

## Getting Started

### Installation

Run `$ npm i -g anno-cli` or `$ npm i -save-dev anno-cli` to install the latest version of anno-cli.

### Generate template

Run `anno-cli t` to generate template. 

#### Step 1 Choose a template

```
$ anno-cli t
? What template would you like to generate? (Use arrow keys)
❯ foo-bar(local)
  foo-bar
```

#### Step 2 Input path

```
$ anno-cli t
? What template would you like to generate? foo-bar(local)
? What path would you like to generate to? path: foo-bar
```

#### Step 3 Input class name, and press enter. You will generate files according to your own defined template. NOTE: The class name can be defined in your own way.

```
$ anno-cli t
? What template would you like to generate? foo-bar(local)
? What path would you like to generate to? path: foo-bar
? What class name do you prefer? className: FooBar
```

```
$ anno-cli t
? What template would you like to generate? foo-bar(local)
? What path would you like to generate to? path: foo-bar
? What class name do you prefer? className: FooBar
/anno.js/tests/e2e/foo-bar/test.spec.js
/anno.js/src/foo-bar/bar/index.module.scss
/anno.js/src/foo-bar/bar/index.tsx
/anno.js/src/foo-bar/index.module.scss
/anno.js/src/foo-bar/index.page.tsx
/anno.js/tests/unit/foo-bar/test.spec.js
```

### Define Your Own Template

You can define your own local template in your local folder `./templates`.

#### Step 1 Template folder structure
```
templates
└── foo-bar
    ├── e2e
    │   └── test.spec.js 
    ├── src
    │   └── bar 
    │   │   ├── index.module.scss
    │   │   └── index.tsx
    │   ├── index.module.scss
    │   └── index.page.tsx
    ├── unit
    │   └── test.spec.js 
    └── config.js
```


#### Step 2 Config template

1. config.map is used for matching the template path to the destination path.
2. config.prompts is used for defining variables which can be input in questions, which might be used in template later. For more detail, refer to [inquirer](https://www.npmjs.com/package/inquirer). 
  
config.js
```
const config = {
  map: {
    src: 'src', 
    e2e: 'tests/e2e', 
    unit: 'tests/unit', 
  },
  prompts: [
    {
      name: 'className',
      type: 'input',
      message: 'What class name do you prefer? className:',
      validate: function (input) {
        if (/^([A-Za-z\-\_\d])+$/.test(input)) return true
        else return 'Class name may only include letters, numbers, underscores and hashes.'
      },
    },
  ]
}

module.exports = config
```


#### Step 3 Edit template file

1. We use [ejs](https://github.com/mde/ejs) to render remplate. For more detail, refer to [ejs](https://github.com/mde/ejs).
2. All variables are under root, like `root.className`, which should be same as it in `config.js`. We can get path from `root.$PATH` and get template which we selected from `root.$TEMPLATE`.

templates/foo-bar/src/index.page.tsx
```
import { Component, Vue } from 'vue-property-decorator'
import Bar from './bar'
import style from './index.module.scss'

@Component
export default class <%=root.className%> extends Vue {

  private render(h: CreateElement, context: any) {
    return (
      <div class={style.container} id="<%=root.className%>">
        Welcome to <%=root.className%>
        {h(Bar, {})}
      </div>
    )
  }
}

```


#### Step 3 The generated files likes below.

NOTE:If you don't wanna generate test files, we cannot decide except you don't define it in template folder. About this, We will improve it later, like prompting a question to let you to decide whether you generate test files.

src/foo-bar/index.page.tsx
```
import { Component, Vue } from 'vue-property-decorator'
import Bar from './bar'
import style from './index.module.scss'

@Component
export default class FooBar extends Vue {

  private render(h: CreateElement, context: any) {
    return (
      <div class={style.container} id="FooBar">
        Welcome to FooBar
        {h(Bar, {})}
      </div>
    )
  }
}

```


### Dependencies

- [inquirer](https://www.npmjs.com/package/inquirer)
- [ejs](https://github.com/mde/ejs)
