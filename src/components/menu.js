import React from 'react';
import 'antd/dist/antd.css';
import { Menu } from 'antd';
import { FolderTwoTone, FolderOpenTwoTone, FileTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';


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

let rootSubmenuKeys = [];


const MenuFile = ({ path, files }) => {
    const [openKeys, setOpenKeys] = React.useState(['']);

    if (rootSubmenuKeys.length = 0)
        files.map((index) => {
            rootSubmenuKeys.push("sub" + path + index);
        })

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
                    fileNQT = docFile(pathNext);
                }

                return (
                    <div>

                        {directory ?
                            <Menu mode="inline" openKeys={openKeys} onOpenChange={onOpenChange} >
                                {fileNQT && fileNQT.filter(f => f.directory === true).length > 0
                                    ? <SubMenu key={"sub" + path + index} icon={<FolderOpenTwoTone />} title={name}>
                                        <MenuFile path={pathNext} files={fileNQT} />
                                    </SubMenu>
                                    : <Menu.Item key={"keyitem" + path + index} icon={<FolderTwoTone />}><Link to="/fileview">{name}</Link></Menu.Item>}
                            </Menu>
                            :
                            <Menu.Item key={"keyitem" + path + index} icon={<FileTwoTone />}><Link to="/fileview">{name}</Link></Menu.Item>
                            // <div key={"keyitem" + name}>{name}</div>

                        }
                    </div>
                )
            })}

        </div>
    );


};
export default MenuFile;