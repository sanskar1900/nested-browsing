import React, { useState } from "react";
import "./modal.css"
import { updateNode } from "../../constants/general-functions";
const Modal = ({ breadcrumb, folderTree, setFolderTree }) => {

    const [selectedOption, setSelectedOption] = useState(0);
    const [name, setName] = useState("");
    const changeOption = () => {
        setSelectedOption((prev) => prev === 1 ? 0 : 1);
    }
    const handleChangeName = (e) => {
        setName(e.target.value);
    }
    const create = () => {
        const value = {
            name: name,
            type: selectedOption === 0 ? "file" : "folder",
            child: []
        }
        let path = breadcrumb
            .filter((data) => { return data.index >= 0 })
            .map((data) => data.index);
        console.log(path);
        const updatedTree = updateNode(folderTree, path, "add", value);
        setFolderTree(updatedTree)

    }
    return (
        <div className="modal root">
            <div>Create New</div>
            <div className="modal flex">
                <div className={`modal ${selectedOption === 0 ? "selectedOption" : "unselectedOption"}`} onClick={changeOption}>File</div>
                <div className={`modal ${selectedOption === 1 ? "selectedOption" : "unselectedOption"}`} onClick={changeOption}>Folder</div>

            </div>
            <input className="modal input" value={name} onChange={handleChangeName} />
            <button className="modal create" onClick={create}>Create</button>
        </div>
    )
}
export default Modal;