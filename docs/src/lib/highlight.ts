import { createHighlighterCoreSync } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import json from 'shiki/langs/json.mjs'
import shell from 'shiki/langs/shellscript.mjs'
import dark from 'shiki/themes/github-dark.mjs'
import light from 'shiki/themes/github-light.mjs'

export type CodeLanguage = 'shellscript' | 'json' | 'text'

const highlighter = createHighlighterCoreSync({
  langs: [shell, json],
  themes: [light, dark],
  engine: createJavaScriptRegexEngine(),
})

export const highlight = (text: string, lang: CodeLanguage) => {
  return highlighter.codeToTokens(text, {
    lang,
    themes: { light: 'github-light', dark: 'github-dark' },
  }).tokens
}

export const updateCode = (element: HTMLElement, text: string, lang: CodeLanguage) => {
  element.textContent = text
  // Keep large responses readable without blocking the UI with tokenization.
  if (lang === 'text' || text.length > 50_000) return
  try {
    const fragment = document.createDocumentFragment()
    const lines = highlight(text, lang)
    lines.forEach((line, index) => {
      if (index) fragment.append(document.createTextNode('\n'))
      for (const token of line) {
        const span = document.createElement('span')
        span.textContent = token.content
        for (const [property, value] of Object.entries(token.htmlStyle ?? {})) {
          span.style.setProperty(property, value)
        }
        fragment.append(span)
      }
    })
    element.replaceChildren(fragment)
  } catch {
    // Plain text remains available if highlighting fails.
  }
}
