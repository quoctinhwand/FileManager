import React from 'react';
import 'antd/dist/antd.css';
import { Menu } from 'antd';
import { FolderTwoTone, FolderOpenTwoTone, FileTwoTone } from '@ant-design/icons';

const { SubMenu } = Menu;

const pathModule = window.require('path')

const MenuFile = ({ path, onPath, docFile }) => {

    let rootSubmenuKeys = [];
    const [openKeys, setOpenKeys] = React.useState([]);

    const onOpenChange = keys => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    const files = docFile(path);
    const handleClick = e => {
        // console.log(e);
        onPath(e);
    };

    return (
        <div >
            <Menu
                onClick={handleClick}
                mode="inline"
                openKeys={openKeys}
                onOpenChange={onOpenChange}
            >
                {files.map(({ name, directory, size }, index) => {

                    var fileNQT = undefined;
                    if (directory) {
                        var pathNext = pathModule.join(path, name);
                        fileNQT = docFile(pathNext);
                        if (fileNQT && fileNQT.filter(f => f.directory === true).length > 0) {
                            rootSubmenuKeys.push(pathModule.join(path, name));
                            return <SubMenu key={pathModule.join(path, name)} icon={<FolderOpenTwoTone />} title={name} onTitleClick={handleClick}>
                                <MenuFile key={pathNext} path={pathNext} onPath={onPath} docFile={docFile} />
                            </SubMenu>
                        }

                        else
                            return <Menu.Item key={pathModule.join(path, name)} icon={<FolderTwoTone />}>{name}</Menu.Item>
                    }
                    else
                        return <Menu.Item key={pathModule.join(path, name)} className="d-flex align-items-center"><img src={pathModule.join(path, name)} style={{ height: '20px', width: '20px' }} /> {name}</Menu.Item>

                    // return (
                    //     <div>

                    //         {directory
                    //             ? fileNQT && fileNQT.filter(f => f.directory === true).length > 0
                    //                 ? <SubMenu key={pathModule.join(path, name)} icon={<FolderOpenTwoTone />} title={name} onTitleClick={handleClick}>
                    //                     <MenuFile key={pathNext} path={pathNext} onPath={onPath} docFile={docFile} />
                    //                 </SubMenu>
                    //                 : <Menu.Item key={pathModule.join(path, name)} icon={<FolderTwoTone />}>{name}</Menu.Item>
                    //             :
                    //             <Menu.Item key={pathModule.join(path, name)} className="d-flex align-items-center"><img src={pathModule.join(path, name)} style={{ height: '20px', width: '20px' }} /> {name}</Menu.Item>
                    //         }


                    //     </div>
                    // )
                })}
            </Menu>
        </div>
    );
};
export default MenuFile;