/* eslint-disable security/detect-non-literal-fs-filename */
const { resolve } = require('path');
const { readFileSync, writeFileSync } = require('fs');
const simpleGit = require('simple-git');

const options = {
  baseDir: process.cwd(),
  binary: 'git',
  maxConcurrentProcesses: 6,
  trimmed: false,
};

// when setting all options in a single object
const git = simpleGit(options);

// Get the latest commit hash of the current branch
const getCurrentCommitHash = async () => {
  try {
    const logSummary = await git.log();
    // get first 7 characters of the hash
    const commitHash = logSummary.latest.hash.slice(0, 7);
    console.log(`Current commit hash: ${commitHash}`);
    return commitHash;
  } catch (error) {
    console.error('Error occurred:', error);
  }
};

module.exports = {
  installCommand: () => 'npm i --prefer-offline --no-audit',
  buildCommand: () => null,
  versionUpdated: async ({ version, dir }) => {
    const commitHash = await getCurrentCommitHash();
    const packageJsonPath = resolve(dir, 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath).toString());
    packageJson.version = `${version}+${commitHash}`;
    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  },
  publishCommand: ({ tag }) => `echo "Releasing ${tag} version of the app"`,
  afterPublish: ({ exec }) => {
    exec(`git config --global user.email "action@github.com"`);
    exec(`git config --global user.name "GitHub Action"`);

    exec('git checkout dev');
    exec('git rebase main');
    exec('git push origin dev');
  },
};
