const config = {
  map: {
    '/': '/',
    src: 'src',
    e2e: 'tests/e2e',
    unit: 'tests/unit',
  },
  prompts: [
    {
      name: 'className',
      type: 'input',
      message: 'class name:',
      validate: function (input) {
        if (/^([A-Za-z\-\_\d])+$/.test(input)) return true
        else return 'Class name may only include letters, numbers, underscores and hashes.'
      },
    },
  ],
}

module.exports = config
