import React, { useEffect, useState } from "react";
import "./header.css";
const Header = ({
    setSearchText,
    breadcrumb,
    searchText,
    setBreadCrumb,
    filteredResults,
    showSearchInfo,
    setShowSearchInfo,
}) => {
    const goBack = () => {
        if (breadcrumb?.length === 1) return;
        let newBreadCrumb = breadcrumb;
        newBreadCrumb.pop();
        setBreadCrumb([...newBreadCrumb]);
    };
    const redirectToParent = (index) => {
        let newBreadCrumbs = breadcrumb?.filter((item, i) => {
            return i === 0 || i <= index;
        });
        setBreadCrumb(newBreadCrumbs);
    };
    const toggleSearchItems = () => {
        setSearchText("");
        setShowSearchInfo(!showSearchInfo);
    };
    return (
        <div className="header root">
            <div>
                <div className="header breadCrumbs">
                    {!showSearchInfo ? (
                        <div className="header backbtn" onClick={goBack}>
                            ⬅️
                        </div>
                    ) : searchText?.length === 0 ? (
                        <div className="header info">
                            {" "}
                            <span onClick={toggleSearchItems} className="header cross">X</span>     Search Page : Type atleast 1 character.{" "}
                        </div>
                    ) : (
                        <div className="header info">
                            {" "}
                            <span onClick={toggleSearchItems} className="header cross">X</span>  {`Found results : ${filteredResults} items`}
                        </div>
                    )}
                    {!showSearchInfo &&
                        breadcrumb?.map((data, i) => {
                            if (i === breadcrumb?.length - 1)
                                return (
                                    <div key={i} className="header current">
                                        {data?.name}
                                    </div>
                                );
                            else {
                                return (
                                    <div
                                        key={i}
                                        onClick={() => redirectToParent(i)}
                                        className="header prev"
                                    >
                                        {data?.name + " /"}
                                    </div>
                                );
                            }
                        })}
                </div>
            </div>
            <input
                onBlur={toggleSearchItems}
                onFocus={toggleSearchItems}
                placeholder="🔍 Search for anything"
                className="header input"
                value={searchText}
                onChange={(e) => {
                    setSearchText(e.target.value);
                }}
            />
        </div>
    );
};
export default Header;
