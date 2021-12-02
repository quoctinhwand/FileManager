import React, { useState, useMemo } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Menu } from 'antd';
import { AppstoreOutlined, FolderOpenTwoTone, SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { IconFolder, IconFile, IconFolderOpen } from './Icons'


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

const { SubMenu } = Menu;

// submenu keys of first level
let rootSubmenuKeys = [];


const MenuFile = ({ path, files, onBack, onOpen }) => {
    const [openKeys, setOpenKeys] = React.useState(['sub0']);

    if (rootSubmenuKeys.length = 0)
        files.map((index) => {
            rootSubmenuKeys.push("sub" + index.toString());
        })
    console.log(rootSubmenuKeys)
    const onOpenChange = keys => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

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
        <div >
            {files.map(({ name, directory, size }, index) => {

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
                    <Menu mode="inline" openKeys={openKeys} onOpenChange={onOpenChange} >
                        {directory ?
                            <div>
                                {fileNQT && fileNQT.filter(f => f.directory === true).length > 0
                                    ? <SubMenu key={"sub" + index.toString()} icon={<FolderOpenTwoTone />} title={"sub" + index.toString()}>
                                        <Menu.Item key={"key1" + index}><Link to="/">{"key1" + index.toString()}</Link></Menu.Item>
                                        <Menu.Item key={"key2" + index}><Link to="/about">{"key2" + index.toString()}</Link></Menu.Item>
                                        <Menu.Item key={"key3" + index}><Link to="/dashboard">{"key3" + index.toString()}</Link></Menu.Item>
                                        <Menu.Item key={"key4" + index}><Link to="/nothing-here">{"key4" + index.toString()}</Link></Menu.Item>
                                    </SubMenu>
                                    : <Menu.Item key={"keyitem" + index}><Link to="/">{"keyitem" + index.toString()}</Link></Menu.Item>}
                            </div>

                            :
                            <span></span>}
                        {/* <SubMenu key={"sub" + index.toString()} icon={<FolderOpenTwoTone />} title={"sub" + index.toString()}>
                            <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
                            <Menu.Item key="2"><Link to="/about">About</Link></Menu.Item>
                            <Menu.Item key="3"><Link to="/dashboard">Dashboard</Link></Menu.Item>
                            <Menu.Item key="4"><Link to="/nothing-here">Nothing Here</Link></Menu.Item>
                        </SubMenu> */}
                        {/* <SubMenu key={"sub" + index.toString()} icon={<AppstoreOutlined />} title={"sub" + index.toString()}>
                            <Menu.Item key="5">Option 5</Menu.Item>
                            <Menu.Item key="6">Option 6</Menu.Item>
                            <SubMenu key="sub3" title="Submenu">
                                <Menu.Item key="7">Option 7</Menu.Item>
                                <Menu.Item key="8">Option 8</Menu.Item>
                            </SubMenu>
                        </SubMenu>
                        <SubMenu key={"sub" + index.toString()} icon={<SettingOutlined />} title={"sub" + index.toString()}>
                            <Menu.Item key="9">Option 9</Menu.Item>
                            <Menu.Item key="10">Option 10</Menu.Item>
                            <Menu.Item key="11">Option 11</Menu.Item>
                            <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu> */}
                    </Menu>

                    // <SubMenu key={name} icon={<MailOutlined />} title="Navigation One">

                    // </SubMenu>
                    // <tr className="clickable" onClick={() => directory && onOpen(name)}>
                    //   <td className="icon-row">
                    // {directory ? <span className="d-flex flex-row">
                    //   {fileNQT && fileNQT.filter(f => f.directory === true).length > 0 ? <i className="fas fa-angle-down me-2"></i> : <i className="me-3"></i>}
                    //   <i className="fas fa-folder-open text-warning"></i>
                    // </span>
                    //   : <IconFile />}
                    //   </td>
                    //   <td>{name}</td>
                    //   <td>
                    //     <span className="float-end">{size}</span>
                    //   </td>
                    // </tr>
                )
            })}

        </div>
    );
};
export default MenuFile;