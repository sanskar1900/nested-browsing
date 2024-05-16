import React, { useEffect, useRef, useState } from "react";
import { menuItem } from "../../constants/data";
import "./menu.css";
import { updateNode } from "../../constants/general-functions";
const Menu = ({ setShowMenu, folderData, breadcrumb, folderTree, setFolderTree }) => {

    const menuRef = useRef(null);
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutsideMenu);
        return () => {
            document.removeEventListener('mousedown', handleClickOutsideMenu);
        };
    }, []);
    const handleClickOutsideMenu = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setShowMenu(false);
        }
    };
    const handleOperation = (data) => {
        let operation;
        switch (data?.id) {
            case 1:
                operation = "copy"
                break;
            case 2:
                operation = "rename"
                break;
            case 3:
                operation = "remove"
                break;
            default:
                break
        }
        if (operation === "remove") {
            let path = breadcrumb
                .filter((data) => { return data.index >= 0 })
                .map((data) => data.index);

            const updatedTree = updateNode(folderTree, path, operation, folderData);
            setFolderTree(updatedTree)
        }
    }
    return (
        <div ref={menuRef} className="menu root">

            {menuItem.map((data) => {
                return (
                    <div onClick={() => handleOperation(data)} className="menu item" style={{ color: data?.color }} key={data?.id}>{data?.name}</div>)
            })}
        </div>
    )
}
export default Menu;