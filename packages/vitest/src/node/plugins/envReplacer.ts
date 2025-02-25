import MagicString from 'magic-string'
import type { Plugin } from 'vite'

export const EnvReplacerPlugin = (): Plugin => {
  return {
    name: 'vitest:env-replacer',
    enforce: 'pre',
    transform(code) {
      let s: MagicString | null = null

      const envs = code.matchAll(/\bimport\.meta\.env\b/g)

      for (const env of envs) {
        s ||= new MagicString(code)

        const startIndex = env.index!
        const endIndex = startIndex + env[0].length

        s.overwrite(startIndex, endIndex, 'process.env')
      }

      if (s) {
        return {
          code: s.toString(),
          map: s.generateMap({ hires: true }),
        }
      }
    },
  }
}
