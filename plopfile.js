module.exports = plop => {
    plop.setGenerator('组件', {
      description: '自定义组件',
      prompts: [
        {
          type: 'input',
          name: 'name',
          message: '组件名称',
          default: 'MyComponent'
        },
        {
          type: "confirm",
          message: "是否是组合组件",
          name: "combinationComponent",
          default:false
        }
      ],
      actions: [
        {
          type: 'add',
          path: 'packages/{{name}}/src/{{name}}.vue',
          templateFile: 'plop-template/component/src/component.hbs'
        },
        {
          type: 'add',
          path: 'packages/{{name}}/__tests__/{{name}}.test.ts',
          templateFile: 'plop-template/component/__tests__/component.test.hbs'
        },
        {
          type: 'add',
          path: 'packages/{{name}}/stories/{{name}}.stories.ts',
          templateFile: 'plop-template/component/stories/component.stories.hbs'
        },
        {
          type: 'add',
          path: 'packages/{{name}}/index.ts',
          templateFile: 'plop-template/component/index.hbs'
        },
        {
          type: 'add',
          path: 'packages/{{name}}/LICENSE',
          templateFile: 'plop-template/component/LICENSE'
        },
        {
          type: 'add',
          path: 'packages/{{name}}/package.json',
          templateFile: 'plop-template/component/package.hbs'
        },
        {
          type: 'add',
          path: 'packages/{{name}}/README.md',
          templateFile: 'plop-template/component/README.hbs'
        },
        {
          type: 'add',
          path: 'packages/theme-chalk/src/{{name}}.scss',
          templateFile: 'plop-template/component/template.hbs'
        }
      ]
    })
  }