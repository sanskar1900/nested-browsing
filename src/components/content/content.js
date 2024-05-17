import React, { useEffect, useState } from "react";
import Folder from "../folder/folder";
import File from "../file/file";
import "./content.css";
import Modal from "../modal/modal";
import {
    checkConflict,
    getNode,
    searchNodes,
    updateNode,
} from "../../constants/general-functions";
const Content = ({
    copiedNode,
    setCopiedNode,
    breadcrumb,
    folderTree,
    setFolderTree,
    setBreadCrumb,
    searchText,
    setFilteredResults,
    showSearchInfo,
}) => {
    const [openModal, setOpenModal] = useState(false);
    console.log("i recieved", copiedNode);
    useEffect(() => {
        const handlePaste = () => {
            console.log(copiedNode, "is", copiedNode);
            if (copiedNode) {
                let path = breadcrumb
                    .filter((data) => data.index >= 0)
                    .map((data) => data.index);
                const updatedTree = updateNode(folderTree, path, "add", copiedNode);
                const conflicted = checkConflict(folderTree, path, copiedNode?.name);
                if (!conflicted) {
                    setFolderTree(updatedTree);
                }
            }
        };

        window.addEventListener("paste", handlePaste);

        return () => {
            window.removeEventListener("paste", handlePaste);
        };
    }, [copiedNode, breadcrumb]);
    const alterModalOpening = () => {
        setOpenModal(!openModal);
    };
    const renderChildsOfCurrentFolder = () => {
        if (showSearchInfo) {
            const filteredNodes = searchNodes(folderTree, searchText);
            setFilteredResults(filteredNodes?.length);
            return (
                searchText?.length > 0 &&
                filteredNodes?.map((data, i) => {
                    if (data.type === "folder")
                        return (
                            <Folder
                                setCopiedNode={setCopiedNode}
                                setFolderTree={setFolderTree}
                                folderTree={folderTree}
                                breadcrumb={breadcrumb}
                                index={i}
                                setBreadCrumb={setBreadCrumb}
                                key={i}
                                folderData={data}
                                interactive={!showSearchInfo}
                            />
                        );
                    else {
                        return (
                            <File
                                setCopiedNode={setCopiedNode}
                                setFolderTree={setFolderTree}
                                folderTree={folderTree}
                                breadcrumb={breadcrumb}
                                key={i}
                                fildData={data}
                                interactive={!showSearchInfo}
                            />
                        );
                    }
                })
            );
        }
        {
            let path = breadcrumb
                .filter((data) => {
                    return data.index >= 0;
                })
                .map((data) => data.index);
            const node = getNode(folderTree, path, "get");

            return node?.child?.map((data, i) => {
                if (data.type === "folder")
                    return (
                        <Folder
                            setCopiedNode={setCopiedNode}
                            setFolderTree={setFolderTree}
                            folderTree={folderTree}
                            breadcrumb={breadcrumb}
                            index={i}
                            setBreadCrumb={setBreadCrumb}
                            key={i}
                            folderData={data}
                            interactive={!showSearchInfo}
                        />
                    );
                else {
                    return (
                        <File
                            setCopiedNode={setCopiedNode}
                            setFolderTree={setFolderTree}
                            folderTree={folderTree}
                            breadcrumb={breadcrumb}
                            key={i}
                            fildData={data}
                            interactive={!showSearchInfo}
                        />
                    );
                }
            });
        }
    };
    return (
        <div>
            <div className="content childs">
                {renderChildsOfCurrentFolder()}
                {!showSearchInfo && (
                    <div className="content add-div">
                        <img
                            onClick={alterModalOpening}
                            className="content add"
                            src={require("../../constants/images/add_new_button.png")}
                            alt="add"
                        />
                    </div>
                )}
            </div>
            {openModal && (
                <Modal
                    setOpenModal={setOpenModal}
                    setFolderTree={setFolderTree}
                    folderTree={folderTree}
                    breadcrumb={breadcrumb}
                />
            )}
        </div>
    );
};
export default Content;
