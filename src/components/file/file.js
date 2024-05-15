import React, { useState } from "react";
import "./file.css"
import { getExtension } from "../../constants/general-functions";
const File = ({ fildData }) => {

    return (
        <div className="file">
            <div className="file relative">
                <div className="file absolute">{getExtension(fildData?.name)}</div>
                <img className="file img" src={require("../../constants/images/file.png")} alt="file" ></img>
            </div>
            <div>{fildData?.name}</div>
        </div>
    )

}
export default File;