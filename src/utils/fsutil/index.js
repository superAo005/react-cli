/**
 * @Author superAo
 * @Date 2022/3/4
 * @Version 1.0.0
 * @Last Modified by superAo
 * @Last Modified Time 2022/3/4
 */
const path = require('path')
const fs = require('fs')

function isFileExist(filePath) {
  if (fs.existsSync(filePath)) {
    return true
  }
  return false
}

function readFileSync(filePath) {
  return fs.readFileSync(filePath, 'utf-8')
}

function mkdir(path) {
  fs.mkdirSync(path)
}

function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content, 'UTF-8')
}

function deleteFile(curPath) {
  fs.unlinkSync(curPath)
}
function copyFile(path, toPath) {
  fs.copyFileSync(path, toPath)
}
function renameSync(oldPath, path) {
  fs.renameSync(oldPath, path)
}

module.exports = {
  isFileExist,
  mkdir,
  writeFile,
  readFileSync,
  deleteFile,
  copyFile,
  renameSync,
}
