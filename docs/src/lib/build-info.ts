import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const readBuildInfo = () => {
  let commit = process.env.BUILD_COMMIT
  let date = process.env.BUILD_COMMIT_DATE

  if (!commit && !date) {
    try {
      ;[commit, date] = execFileSync('git', ['show', '-s', '--format=%H%n%cI', 'HEAD'], {
        cwd: fileURLToPath(new URL('../../../', import.meta.url)),
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
      })
        .trim()
        .split('\n')
    } catch {
      return undefined
    }
  }

  if (!commit || !/^[a-f0-9]{40}$/.test(commit) || !date || Number.isNaN(Date.parse(date))) {
    return undefined
  }

  return {
    commit,
    shortCommit: commit.slice(0, 7),
    date: new Date(date).toISOString().slice(0, 10),
  }
}

export const buildInfo = readBuildInfo()
