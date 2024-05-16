import React, { useState } from "react";
import "./folder.css";
import Menu from "../menu/menu";
const Folder = ({ folderData, setBreadCrumb, index, breadcrumb, folderTree, setFolderTree }) => {
    const [showMenu, setShowMenu] = useState(false);
    const alterBreadCrumb = () => {
        const newBreadCrumb = {
            name: folderData.name,
            index: index
        }
        let currentBreadCrumb = [...breadcrumb];
        currentBreadCrumb.push(newBreadCrumb);
        setBreadCrumb(currentBreadCrumb);
    }
    const alterMenuVisibility = () => {
        setShowMenu(!showMenu);
    }
    return (
        <div className="folder root" onDoubleClick={alterBreadCrumb} onClick={alterMenuVisibility}>
            <img className="folder img" src={require("../../constants/images/folder.png")} alt="file" ></img>
            <div className="folder name">{folderData?.name}</div>
            {showMenu && <Menu setShowMenu={setShowMenu} folderData={folderData} breadcrumb={breadcrumb} folderTree={folderTree} setFolderTree={setFolderTree} />}
        </div>
    )

}
export default Folder;