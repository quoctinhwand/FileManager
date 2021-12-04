import './App.css';
import { useState } from 'react'
import MenuFile from './components/menu';
import Fileview from './components/FileView';

const fs = window.require('fs')
const pathModule = window.require('path')

const formatSize = size => {
  var i = Math.floor(Math.log(size) / Math.log(1024))
  return (
    (size / Math.pow(1024, i)).toFixed(2) * 1 +
    ' ' +
    ['B', 'kB', 'MB', 'GB', 'TB'][i]
  )
}

function App() {

  const [path, setPath] = useState(undefined);////192.168.1.105/Retouch 05/thang 11/30.11/Anna
  const [link, setLink] = useState('');
  const [url, setUrl] = useState('');

  const docFile = path => {
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

  const onPath = path => {
    setUrl(path.key);
    // try {
    //   docFile(path.key);
    //   console.log(docFile(path.key));
    // } catch (error) {
    //   console.log(path.key);
    // }
  }

  return (
    <div className="container-fluid m-2 w-100 h-100 border border-1">
      <div className="row">
        <div className="col-12 py-3 border-bottom border-1" >
          <div className="mb-3">
            <label className="form-label">URL</label>
            <input
              value={link}
              onChange={event => setLink(event.target.value)}
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <button type="submit" className="btn btn-primary" onClick={() => { setPath(link) }}>Submit</button>
        </div>
      </div>
      <div className="row">
        <div className="col-4 border-end border-1">
          {path && <MenuFile key={path} path={path} onPath={onPath} docFile={docFile} />}
          {/* <MenuFile key={path} path={path} onPath={onPath} docFile={docFile} /> */}
        </div>
        <div className="col-8 p-0">
          <Fileview path={url} docFile={docFile} />
        </div>
      </div>
    </div>
  );

}

export default App;
