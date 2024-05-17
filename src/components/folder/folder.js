import React, { useEffect, useState } from "react";
import "./folder.css";
import Menu from "../menu/menu";
import Modal from "../modal/modal";
const Folder = ({
    interactive,
    setCopiedNode,
    folderData,
    setBreadCrumb,
    index,
    breadcrumb,
    folderTree,
    setFolderTree,
}) => {
    const [showMenu, setShowMenu] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    useEffect(() => {
        setShowMenu(false);
    }, [breadcrumb]);
    const alterBreadCrumb = () => {
        if (!interactive) {
            return;
        }
        const newBreadCrumb = {
            name: folderData.name,
            index: index,
        };
        let currentBreadCrumb = [...breadcrumb];
        currentBreadCrumb.push(newBreadCrumb);
        setBreadCrumb(currentBreadCrumb);
    };
    const alterMenuVisibility = () => {
        setShowMenu(!showMenu);
    };
    return (
        <>
            <div
                className="folder root"
                onDoubleClick={alterBreadCrumb}
                onClick={alterMenuVisibility}
            >
                <img
                    className="folder img"
                    src={require("../../constants/images/folder.png")}
                    alt="file"
                ></img>
                <div className="folder name">{folderData?.name}</div>
                {showMenu && (
                    <Menu
                        setCopiedNode={setCopiedNode}
                        setOpenModal={setOpenModal}
                        setShowMenu={setShowMenu}
                        folderData={folderData}
                        breadcrumb={breadcrumb}
                        folderTree={folderTree}
                        setFolderTree={setFolderTree}
                    />
                )}
            </div>
            {openModal && (
                <Modal
                    folderData={folderData}
                    folderTree={folderTree}
                    setFolderTree={setFolderTree}
                    breadcrumb={breadcrumb}
                    setOpenModal={setOpenModal}
                    rename={true}
                />
            )}
        </>
    );
};
export default Folder;
