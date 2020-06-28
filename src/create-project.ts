import * as fs from 'fs'
import * as path from 'path'

const CURR_DIR = ''

const SKIP_FILES = ['node_modules', '.template.json']
export function createDirectoryContents(templatePath: string, projectName: string) {
  const filesToCreate = fs.readdirSync(templatePath)

  filesToCreate.map((file) => {
    const origFilePath = path.join(templatePath, file)

    const stats = fs.statSync(origFilePath)

    if (SKIP_FILES.indexOf(file) > -1) return

    if (stats.isFile()) {
      let contents = fs.readFileSync(origFilePath, 'utf8')
      const writePath = path.join(CURR_DIR, projectName, file)
      fs.writeFileSync(writePath, contents, 'utf8')
    } else if (stats.isDirectory()) {
      fs.mkdirSync(path.join(CURR_DIR, projectName, file))
      createDirectoryContents(path.join(templatePath, file), path.join(projectName, file))
    }
  })
}
