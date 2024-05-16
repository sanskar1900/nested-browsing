import React, { useState, useRef, useEffect } from "react";
import "./modal.css"
import { updateNode } from "../../constants/general-functions";
const Modal = ({ breadcrumb, folderTree, setFolderTree, setOpenModal }) => {
    const modalRef = useRef(null);
    const [error, setError] = useState("");
    const [selectedOption, setSelectedOption] = useState(0);
    const [name, setName] = useState("");
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
                <div className="modal heading">Create New</div>
                <div className="modal flex">
                    <div className={`modal ${selectedOption === 0 ? "selectedOption" : "unselectedOption"}`} onClick={changeOption}>File</div>
                    <div className={`modal ${selectedOption === 1 ? "selectedOption" : "unselectedOption"}`} onClick={changeOption}>Folder</div>

                </div>
                <input placeholder="Name" className="modal input" value={name} onChange={handleChangeName} />
                <div className="modal create" onClick={create}>Create</div>
            </div>
        </div>
    )
}
export default Modal;