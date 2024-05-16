import React, { useState } from "react";
import "./header.css";
const Header = ({ setSearchText, breadcrumb, searchText, setBreadCrumb }) => {
    const goBack = () => {
        if (breadcrumb?.length === 1) return;
        let newBreadCrumb = breadcrumb;
        newBreadCrumb.pop();
        setBreadCrumb([...newBreadCrumb]);

    }
    const redirectToParent = (index) => {
        let newBreadCrumbs = breadcrumb?.filter((item, i) => { return (i === 0 || i <= index) })
        setBreadCrumb(newBreadCrumbs)
    }
    return (
        <div className="header">
            <div>

                <div className="header breadCrumbs">
                    <div className="header backbtn" onClick={goBack}>⬅️</div>
                    {breadcrumb?.map((data, i) => {
                        if (i === breadcrumb?.length - 1)
                            return (
                                <div key={i} className="header current">{data?.name}</div>
                            )
                        else {
                            return <div key={i} onClick={() => redirectToParent(i)} className="header prev">{data?.name + " /"}</div>
                        }
                    })}
                </div>
            </div>
            <input placeholder="🔍 Search for anything" className="header input" value={searchText} onChange={(e) => { setSearchText(e.target.value) }} />
        </div>
    )
}
export default Header