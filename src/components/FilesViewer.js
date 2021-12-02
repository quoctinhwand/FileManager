import { IconFolder, IconFile, IconFolderOpen } from './Icons'
import React, { useState, useMemo } from 'react';

const fs = window.require('fs')
const pathModule = window.require('path')

const remote = window.require('@electron/remote')

const formatSize = size => {
  var i = Math.floor(Math.log(size) / Math.log(1024))
  return (
    (size / Math.pow(1024, i)).toFixed(2) * 1 +
    ' ' +
    ['B', 'kB', 'MB', 'GB', 'TB'][i]
  )
}

const FilesViewer = ({ path, files, onBack, onOpen }) => {

  function docFile(path) {
    const teptin =
      fs
        .readdirSync(path)
        .map(file => {
          const stats = fs.statSync(pathModule.join(path, file))
          return {
            name: file,
            size: stats.isFile() ? formatSize(stats.size ?? 0) : null,
            directory: stats.isDirectory()
          }
        })
        .sort((a, b) => {
          if (a.directory === b.directory) {
            return a.name.localeCompare(b.name)
          }
          return a.directory ? -1 : 1
        })
    return teptin;
  }

  return (
    <table className="table">
      <tbody>
        <tr className="clickable" onClick={onBack}>
          <td className="icon-row">
            <i className="far fa-folder-open text-warning"></i>
          </td>
          <td>...</td>
          <td></td>
        </tr>
        {files.map(({ name, directory, size }) => {
          var fileNQT = undefined;
          if (directory) {
            var pathNext = pathModule.join(path, name);
            fileNQT =
              fs
                .readdirSync(pathNext)
                .map(file => {
                  const stats = fs.statSync(pathModule.join(pathNext, file))
                  return {
                    name: file,
                    size: stats.isFile() ? formatSize(stats.size ?? 0) : null,
                    directory: stats.isDirectory()
                  }
                })
                .sort((a, b) => {
                  if (a.directory === b.directory) {
                    return a.name.localeCompare(b.name)
                  }
                  return a.directory ? -1 : 1
                })
            // var seach = fileNQT.filter(f => f.directory === true);
            // console.log(seach);
          }

          return (
            <tr className="clickable" onClick={() => directory && onOpen(name)}>
              <td className="icon-row">
                {directory ? <span className="d-flex flex-row">
                  {fileNQT && fileNQT.filter(f => f.directory === true).length > 0 ? <i className="fas fa-angle-down me-2"></i> : <i className="me-3"></i>}
                  <i className="fas fa-folder-open text-warning"></i>
                </span>
                  : <IconFile />}
              </td>
              <td>{name}</td>
              <td>
                <span className="float-end">{size}</span>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  );
}

export default FilesViewer;

