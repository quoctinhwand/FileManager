import './App.css';
import { useState, useMemo } from 'react'
import FilesViewer from './components/FilesViewer'
import MenuFile from './components/menu';
import { Routes, Route, Outlet, Link } from "react-router-dom";

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

function App() {

  // const showContentMenus = (routes) => {
  //   var result = null;
  //   if (routes.length > 0) {
  //     result = routes.map((route, index) => {
  //       return <Route
  //         key={index}
  //         path={route.path}
  //         exact={route.exact}
  //         element={route.main}
  //       />
  //     })

  //   }
  //   return <Routes>{result}</Routes>
  // }

  const [path, setPath] = useState(remote.app.getAppPath());

  const files = useMemo(
    () =>
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
        }),
    [path]
  )

  const onBack = () => setPath(pathModule.dirname(path))
  const onOpen = folder => setPath(pathModule.join(path, folder))

  const [searchString, setSearchString] = useState('')
  const filteredFiles = files.filter(s => s.name.startsWith(searchString))

  return (
    <div className="container-fluid m-2 w-100 h-100 border border-1">
      <div className="row">
        <div className="col-12 border-bottom border-1" style={{ height: '38px' }}>
          <span>{path}</span>
        </div>

        {/* <div className="col-8"> */}
        {/* {this.showContentMenus(routes)} */}

        {/* </div> */}
      </div>
      {/* <div className="form-group mt-4 mb-2">
            <input
              value={searchString}
              onChange={event => setSearchString(event.target.value)}
              className="form-control form-control-sm"
              placeholder="File search"
            />
          </div> */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
      {/* <FilesViewer path={path} files={filteredFiles} onBack={onBack} onOpen={onOpen} /> */}
      {/* <MenuFile /> */}
      {/* <Menu /> */}
    </div>
  );
  function Layout() {
    return (
      <div className="row">
        <div className="col-4 border-end border-1">
          <div className="form-group mt-4 mb-2">
            <input
              value={searchString}
              onChange={event => setSearchString(event.target.value)}
              className="form-control form-control-sm"
              placeholder="File search"
            />
          </div>
          <MenuFile path={path} files={filteredFiles} onBack={onBack} onOpen={onOpen} />
          {/* <FilesViewer path={path} files={filteredFiles} onBack={onBack} onOpen={onOpen} /> */}
        </div>
        <div className="col-8">
          <Outlet />

        </div>



      </div>
    );
  }

  function Home() {
    return (
      <div>
        <h2>Home</h2>
      </div>
    );
  }

  function About() {
    return (
      <div>
        <h2>About</h2>
      </div>
    );
  }

  function Dashboard() {
    return (
      <div>
        <h2>Dashboard</h2>
      </div>
    );
  }

  function NoMatch() {
    return (
      <div>
        <h2>Nothing to see here!</h2>
        <p>
          <Link to="/">Go to the home page</Link>
        </p>
      </div>
    );
  }

}

export default App;
