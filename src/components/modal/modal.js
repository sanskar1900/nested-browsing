import React, { useState, useRef, useEffect } from "react";
import "./modal.css"
import { getNode, updateNode } from "../../constants/general-functions";
const Modal = ({ breadcrumb, folderTree, setFolderTree, setOpenModal, rename, folderData }) => {
    const modalRef = useRef(null);
    const [error, setError] = useState("");
    const [selectedOption, setSelectedOption] = useState(0);
    const [name, setName] = useState(rename ? folderData?.name : "");
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutsideModal);
        return () => {
            document.removeEventListener('mousedown', handleClickOutsideModal);
        };
    }, [])
    const changeOption = () => {
        setSelectedOption((prev) => prev === 1 ? 0 : 1);
    }
    const handleChangeName = (e) => {
        setName(e.target.value);
    }
    const create = () => {
        let path = breadcrumb
            .filter((data) => { return data.index >= 0 })
            .map((data) => data.index);
        let childs
        if (rename) {
            childs = getNode(folderTree, path, "get").child;
            console.log("childs are", childs);
        }
        const value = !rename ? {
            name: name,
            type: selectedOption === 0 ? "file" : "folder",
            child: []
        } : {
            name: name,
            type: folderData?.type,
            child: childs
        }

        console.log("path is", path);

        const updatedTree = rename ? updateNode(folderTree, path, "update", value, folderData) : updateNode(folderTree, path, "add", value);
        console.log("updated tree is", updatedTree);

        setFolderTree(updatedTree)
        setName("");


    }
    const handleClickOutsideModal = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setOpenModal(false);
        }
    };
    const closeModal = () => {
        setOpenModal(false);
    }
    return (
        <div ref={modalRef} className="modal root">
            <div className="modal content">
                <div className="modal cross" onClick={closeModal}>✖️</div>
                <div className="modal heading">{rename ? "Rename" : "Create New"}</div>
                {!rename && <div className="modal flex">
                    <div className={`modal ${selectedOption === 0 ? "selectedOption" : "unselectedOption"}`} onClick={changeOption}>File</div>
                    <div className={`modal ${selectedOption === 1 ? "selectedOption" : "unselectedOption"}`} onClick={changeOption}>Folder</div>

                </div>}
                <input placeholder="Name" className="modal input" value={name} onChange={handleChangeName} />
                <div className="modal create" onClick={create}>{rename ? "Rename" : "Create"}</div>
            </div>
        </div>
    )
}
export default Modal;