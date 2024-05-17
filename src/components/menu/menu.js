import React, { useEffect, useRef, useState } from "react";
import { menuItem } from "../../constants/data";
import "./menu.css";
import { updateNode } from "../../constants/utils";
import Modal from "../modal/modal";
const Menu = ({
    setCopiedNode,
    setShowMenu,
    folderData,
    breadcrumb,
    folderTree,
    setFolderTree,
    setOpenModal,
    alterBreadCrumb
}) => {
    const menuRef = useRef(null);
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutsideMenu);
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideMenu);
        };
    }, []);
    const handleClickOutsideMenu = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setShowMenu(false);
        }
    };
    const getOperationName = (operationId) => {
        let operation;
        switch (operationId) {
            case 1:
                operation = "copy";
                break;
            case 2:
                operation = "rename";
                break;
            case 3:
                operation = "remove";
                break;
            case 4:
                operation = "open"
            default:
                break;
        }
        return operation;
    };
    const handleOperation = (data) => {
        let operation = getOperationName(data?.id);

        if (operation === "remove") {
            let path = breadcrumb
                .filter((data) => {
                    return data.index >= 0;
                })
                .map((data) => data.index);

            const updatedTree = updateNode(folderTree, path, operation, folderData);
            setFolderTree(updatedTree);
        } else if (operation === "rename") {
            setOpenModal(true);
        } else if (operation === "copy") {
            setCopiedNode(folderData);
        }
        else {
            alterBreadCrumb();
        }
    };
    return (
        <>
            <div ref={menuRef} className={folderData?.type === "folder" ? "menu root" : "menu root-file"}>
                {menuItem.map((data) => {
                    if (!(data?.id === 0 && folderData?.type === "file"))
                        return (
                            <div
                                onClick={() => handleOperation(data)}
                                className="menu item"
                                style={{ color: data?.color }}
                                key={data?.id}
                            >
                                {data?.name}
                            </div>
                        );
                    else {
                        return <></>
                    }
                })}
            </div>
        </>
    );
};
export default Menu;
