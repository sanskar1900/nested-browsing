import React, { useState } from "react";
import "./header.css";
const Header = ({ setSearchText, breadCrumb, searchText, setBreadCrumb }) => {
    const goBack = () => {
        let newBreadCrumb = breadCrumb;
        newBreadCrumb.pop();
        console.log(newBreadCrumb);
        setBreadCrumb(newBreadCrumb);

    }
    return (
        <div className="header">
            <div>

                <div className="header breadCrumbs">
                    <div className="header backbtn" onClick={goBack}>back</div>
                    {breadCrumb?.map((data, i) => {
                        if (i === breadCrumb?.length - 1)
                            return (
                                <div className="header current">{data?.name}</div>
                            )
                        else {
                            return <div className="header prev">{data?.name + "/"}</div>
                        }
                    })}
                </div>
            </div>
            <input className="header input" value={searchText} onChange={(e) => { setSearchText(e.target.value) }} />
        </div>
    )
}
export default Header