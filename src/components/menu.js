import React from 'react';
import 'antd/dist/antd.css';
import { Menu } from 'antd';
import { FolderTwoTone, FolderOpenTwoTone, FileTwoTone } from '@ant-design/icons';

const { SubMenu } = Menu;

const pathModule = window.require('path')

const MenuFile = ({ path, onPath, docFile }) => {

    const files = docFile(path);
    const handleClick = e => {
        onPath(e);
    };

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
                        <Menu
                            onClick={handleClick}
                            mode="inline"
                        >
                            {directory
                                ? fileNQT && fileNQT.filter(f => f.directory === true).length > 0
                                    ? <SubMenu key={pathModule.join(path, name)} icon={<FolderOpenTwoTone />} title={name} onTitleClick={handleClick}>
                                        <MenuFile key={pathNext} path={pathNext} onPath={onPath} docFile={docFile} />
                                    </SubMenu>
                                    : <Menu.Item key={pathModule.join(path, name)} icon={<FolderTwoTone />}>{name}</Menu.Item>
                                :
                                <Menu.Item key={pathModule.join(path, name)} icon={<FileTwoTone />}>{name}</Menu.Item>
                            }
                        </Menu>
                        {/* <Menu
                            onClick={handleClick}
                            mode="inline"
                        >
                            <SubMenu key="sub2" title="Navigation Two">
                                <Menu.Item key="5">Option 5</Menu.Item>
                                <Menu.Item key="6">Option 6</Menu.Item>
                                <SubMenu key="sub3" title="Submenu">
                                    <Menu.Item key="7">Option 7</Menu.Item>
                                    <Menu.Item key="8">Option 8</Menu.Item>
                                </SubMenu>
                            </SubMenu>
                        </Menu> */}
                    </div>
                )
            })}

        </div>
    );
};
export default MenuFile;