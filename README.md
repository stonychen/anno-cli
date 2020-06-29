# anno-cli

## What is anno-cli

anno-cli is cli tool which can be used with [Anno.js](https://stonychen.github.io/anno.js/) together.

## Getting Started

### Installation

`npm i -g anno-cli` or `npm i -save-dev anno-cli` to install the latest version of anno-cli

### Generate template

Run `anno-cli t` to generate template, if you can define your own local template on local folder of `./templates`.

#### step 1 Choose a template

```
$ anno-cli t
? What template would you like to generate? (Use arrow keys)
❯ foo-bar(local)
  foo-bar
```

#### step 2 Input path

```
$ anno-cli t
? What template would you like to generate? foo-bar(local)
? What path would you like to generate to? path: sell/foo-bar
```

#### step 3 Input class name, and enter. You will successfully generate files according the template. NOTE: The class name can be defined in your own way.

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
/anno.js/tests/e2e/sell/foo-bar/test.spec.js
/anno.js/src/foo-bar/bar/index.module.scss
/anno.js/src/foo-bar/bar/index.tsx
/anno.js/src/foo-bar/index.module.scss
/anno.js/src/foo-bar/index.page.tsx
/anno.js/tests/unit/foo-bar/test.spec.js
```

### Define Your Own Template

#### Template folder structure
```
templates
├── foo-bar
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
    └── config.json
```


#### Config template

1. config.map is used for matching the template path './templates/src' to the destination path './src/(path)'
2. config.prompts is used for defining variables, which might be used in template. for more detail, refer to [inquirer](https://www.npmjs.com/package/inquirer). 
  
config.js
```
const config = {
  map: {
    src: 'src', // 
    e2e: 'tests/e2e', //
    unit: 'tests/unit', //
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


#### A template sample

All variables are under root, like `root.className`, Which is same it in `config.js`. We can get path which we input from `root.$PATH` and get template which we selected from `root.$TEMPLATE`

templates/foo-bar/src/index.page.tsx
```
import { Component, Vue } from 'vue-property-decorator'
import Bar from './components/bar'
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

#### A sample generated file, like below.  

NOTE:If you don't wanna generate test files, we cannot decide except you don't define in template folder. About this, We will improve it later, like prompting a question to let you to decide whether you generate test files.

src/foo-bar/index.page.tsx
```
import { Component, Vue } from 'vue-property-decorator'
import Bar from './components/bar'
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
