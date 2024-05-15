import React, { useState } from "react";
import Folder from "../folder/folder";
import File from "../file/file";
import "./content.css"
import Modal from "../modal/modal";
import { getNode, updateNode } from "../../constants/general-functions";
const Content = ({ breadcrumb, folderTree, setFolderTree, setBreadCrumb }) => {
    const [openModal, setOpenModal] = useState(false);
    const alterModalOpening = () => {
        setOpenModal(!openModal);
    }
    const renderChilds = () => {
        let path = breadcrumb
            .filter((data) => { return data.index >= 0 })
            .map((data) => data.index);
        const node = getNode(folderTree, path, "get");
        console.log("node is", node);
        return node?.child?.map(
            (data, i) => {
                if (data.type === "folder")
                    return (
                        <Folder breadcrumb={breadcrumb} index={i} setBreadCrumb={setBreadCrumb} key={i} folderData={data} />
                    )
                else {
                    return <File breadcrumb={breadcrumb} key={i} fildData={data} />
                }
            })

    }

    return (
        <div>
            {breadcrumb?.length === 1 ?
                <div className="content childs">
                    {folderTree.child.map((data, i) => {
                        if (data.type === "folder")
                            return (
                                <Folder breadcrumb={breadcrumb} index={i} setBreadCrumb={setBreadCrumb} key={i} folderData={data} />
                            )
                        else {
                            return <File breadcrumb={breadcrumb} key={i} fildData={data} />
                        }
                    })}
                    <div onClick={alterModalOpening} ><img className="content add" src={require("../../constants/images/add_new_button.png")} alt="add" /></div>
                </div>
                :
                <div className="content childs">
                    {renderChilds()}
                    <div onClick={alterModalOpening} ><img className="content add" src={require("../../constants/images/add_new_button.png")} alt="add" /></div>
                </div>}
            {openModal && <Modal setFolderTree={setFolderTree} folderTree={folderTree} breadcrumb={breadcrumb} />}
        </div>
    )
}
export default Content;