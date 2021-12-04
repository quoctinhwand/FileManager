import React from 'react';
// import './';
const pathModule = window.require('path')

const Fileview = ({ path, docFile }) => {
    let files = [];

    try {
        files = docFile(path);
        // console.log(files);
    } catch (error) {
    }
    return (
        <div className="container w-100 h-100">
            <div className="row">
                <div className="col-12 border-bottom border-1" style={{ height: '38px' }}>
                    <span>{path}</span>
                </div>
            </div>
            <div className="row">
                {
                    files.map(file => {
                        return <div className="col-2 d-flex justify-content-center flex-column p-3">
                            <div className="d-flex justify-content-center" style={{ height: '60px' }}>
                                {
                                    file.directory
                                        ? <img src="https://e1.pngegg.com/pngimages/525/771/png-clipart-next-folders-icon-blank-blue-folder-icon-thumbnail.png" style={{ height: '50px', width: '50px' }} />
                                        : <img src={pathModule.join(path, file.name)} style={{ height: '50px', width: '50px' }} />
                                }

                            </div>
                            <div className="text-center">
                                <span className="fs-6" style={{ fontSize: '8px' }}>{file.name}</span>
                            </div>

                        </div>
                    })
                }
            </div>
        </div>
    );

}

export default Fileview;
