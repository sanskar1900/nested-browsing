import React, { useEffect, useState } from "react";
import Folder from "../folder/folder";
import File from "../file/file";
import "./content.css"
import Modal from "../modal/modal";
import { getNode, updateNode } from "../../constants/general-functions";
const Content = ({ breadcrumb, folderTree, setFolderTree, setBreadCrumb, searchText }) => {
    const [openModal, setOpenModal] = useState(false);

    const alterModalOpening = () => {
        setOpenModal(!openModal);
    }
    const renderChildsOfCurrentFolder = () => {
        let path = breadcrumb.filter((data) => { return data.index >= 0 }).map((data) => data.index);
        const node = getNode(folderTree, path, "get");

        return node?.child?.filter((item) => item?.name.toLowerCase()?.includes(searchText?.toLowerCase())).map(
            (data, i) => {
                if (data.type === "folder")
                    return (
                        <Folder setFolderTree={setFolderTree} folderTree={folderTree} breadcrumb={breadcrumb} index={i} setBreadCrumb={setBreadCrumb} key={i} folderData={data} />
                    )
                else {
                    return <File setFolderTree={setFolderTree} folderTree={folderTree} breadcrumb={breadcrumb} key={i} fildData={data} />
                }
            })

    }
    return (
        <div>
            <div className="content childs">
                {renderChildsOfCurrentFolder()}
                <div className="content add-div"  ><img onClick={alterModalOpening} className="content add" src={require("../../constants/images/add_new_button.png")} alt="add" /></div>
            </div>
            {openModal && <Modal setOpenModal={setOpenModal} setFolderTree={setFolderTree} folderTree={folderTree} breadcrumb={breadcrumb} />}
        </div>
    )
}
export default Content;