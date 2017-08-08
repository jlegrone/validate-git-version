const { exec } = require('child_process')
const { satisfies } = require('semver')

function validateGitVersion(
  versionRange,
  onInvalid=() => null,
  onValid=() => null,
  isValid=(current, range) => satisfies(current, range)
) {
  exec('git --version', (err, stdout, stderr) => {
    const error = err || stderr
    if (error) {
      throw new Error(error)
    } else {
      const currentVersion = stdout.replace('git version ', '').trim()
      return isValid(currentVersion, versionRange) ?
       onValid(currentVersion) :
       onInvalid(currentVersion)
    }
  })
}

module.exports = validateGitVersion
