import { readFile } from 'fs/promises'
import { resolve } from 'path'

export const renderTemplate = async (name: string, variables: Record<string, string>) => {
  const templatePath = resolve(process.cwd(), 'emails', `${name}.html`)
  let content = await readFile(templatePath, 'utf8')
  for (const [key, value] of Object.entries(variables)) {
    content = content.replace(new RegExp(`{{${key}}}`, 'g'), value)
  }
  return content
}
