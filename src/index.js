import { exec } from 'child_process'
import promisify from 'pify'
import { satisfies } from 'semver'

async function validateGitVersion(
  versionRange,
  onInvalid=() => false,
  onValid=() => true,
  isValid=(current, range) => satisfies(current, range)
) {
  const stdout = await promisify(exec)('git --version')
  const currentVersion = stdout.replace('git version ', '').trim()

  return isValid(currentVersion, versionRange) ?
   onValid(currentVersion) :
   onInvalid(currentVersion)
}

module.exports = validateGitVersion
