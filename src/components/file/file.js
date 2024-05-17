import React, { useEffect, useState } from "react";
import "./file.css";
import { getExtension } from "../../constants/general-functions";
import Menu from "../menu/menu";
import Modal from "../modal/modal";
const File = ({
    interactive,
    setCopiedNode,
    fildData,
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
    const alterMenuVisibility = () => {
        if (!interactive) {
            return;
        }
        setShowMenu(!showMenu);
    };
    return (
        <>
            <div className="file root" onClick={alterMenuVisibility}>
                <div className="file relative">
                    <div className="file absolute">{getExtension(fildData?.name)}</div>
                    <img
                        className="file img"
                        src={require("../../constants/images/file.png")}
                        alt="file"
                    ></img>
                </div>
                <div className="file name">{fildData?.name}</div>
                {showMenu && (
                    <Menu
                        setCopiedNode={setCopiedNode}
                        setOpenModal={setOpenModal}
                        setShowMenu={setShowMenu}
                        folderData={fildData}
                        breadcrumb={breadcrumb}
                        folderTree={folderTree}
                        setFolderTree={setFolderTree}
                    />
                )}
            </div>
            {openModal && (
                <Modal
                    folderData={fildData}
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
export default File;
