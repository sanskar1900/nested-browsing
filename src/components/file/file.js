import React, { useState } from "react";
import "./file.css"
import { getExtension } from "../../constants/general-functions";
import Menu from "../menu/menu";
const File = ({ fildData, setBreadCrumb, index, breadcrumb, folderTree, setFolderTree }) => {
    const [showMenu, setShowMenu] = useState(false);
    const alterMenuVisibility = () => {
        setShowMenu(!showMenu);
    }
    return (
        <div className="file root" onClick={alterMenuVisibility}>
            <div className="file relative">
                <div className="file absolute">{getExtension(fildData?.name)}</div>
                <img className="file img" src={require("../../constants/images/file.png")} alt="file" ></img>
            </div>
            <div className="file name">{fildData?.name}</div>
            {showMenu && <Menu setShowMenu={setShowMenu} folderData={fildData} breadcrumb={breadcrumb} folderTree={folderTree} setFolderTree={setFolderTree} />}
        </div>
    )

}
export default File;