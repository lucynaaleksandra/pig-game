#!/usr/bin/env node

var Git = require("nodegit")
var fs = require("fs")
var exec = require("child_process").execSync
var rimraf = require("rimraf")

var args = process.argv.slice(2)
var dirname = args[0]

console.log("::App Starter::")

if (!dirname || "string" !== typeof dirname || dirname.trim() === "") {
  console.log(
    "project name required.  example:",
    "npx app-starter my-new-project"
  )
  return process.exit(1)
}

if (fs.existsSync(dirname)) {
  console.log("project already exists:", dirname)
  return process.exit(1)
}

console.log("creating ", dirname)

// Git.Clone("https://github.com/ItsLeeOwen/app-starter.git", dirname)
//   .then(function() {
//     process.chdir(dirname)
//     ls()

//     removeGitHistory(function() {
//       npmInstallAndExit()

//       // removeBinary(function() {
//       //   npmInstallAndExit()
//       // })
//     })
//   })
//   .catch(exitOnError)

// function removeGitHistory(cb) {
//   if (!fs.existsSync(".git")) {
//     exitOnError(new Error("expected .git"))
//     return process.exit(1)
//   }

//   rimraf("./.git", function(err) {
//     if (err) {
//       return exitOnError(err)
//     }
//     cb()
//   })
// }

// function removeBinary(cb) {
//   if (!fs.existsSync("./index.js")) {
//     exitOnError(new Error("expected index.js"))
//     return process.exit(1)
//   }

//   rimraf("./index.js", function(err) {
//     if (err) {
//       return exitOnError(err)
//     }
//     cb()
//   })
// }

// function npmInstallAndExit() {
//   exec("npm i --loglevel warn", { stdio: "inherit" })
//   console.log("you're good!")
//   process.exit(0)
// }

// function exitOnError(err) {
//   console.log(err)
//   process.exit(1)
// }

// function ls() {
//   console.log("ls")
//   fs.readdirSync("./", (err, files) => {
//     if (err) {
//       return console.log(err)
//     }
//     files.forEach(file => {
//       console.log(file)
//     })
//   })
// }
