import React, { useState } from "react";
import "./folder.css";
const Folder = ({ folderData, setBreadCrumb, index, breadcrumb }) => {
    const alterBreadCrumb = () => {
        const newBreadCrumb = {
            name: folderData.name,
            index: index
        }
        let currentBreadCrumb = [...breadcrumb];
        currentBreadCrumb.push(newBreadCrumb);
        setBreadCrumb(currentBreadCrumb);
    }
    return (
        <div className="folder" onDoubleClick={alterBreadCrumb}>
            <img className="folder img" src={require("../../constants/images/folder.png")} alt="file" ></img>
            <div>{folderData?.name}</div>
        </div>
    )

}
export default Folder;