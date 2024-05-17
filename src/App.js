import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/header/header";
import Content from "./components/content/content";
import { initialTree } from "./constants/data";

function App() {
  const [searchText, setSearchText] = useState("");
  const [breadcrumb, setBreadCrumb] = useState([{ name: "root" }]);
  const [filteredResults, setFilteredResults] = useState(0);
  const [showSearchInfo, setShowSearchInfo] = useState(false);
  const [copiedNode, setCopiedNode] = useState(null);
  const [folderTree, setFolderTree] = useState(initialTree);
  useEffect(() => {
    console.log("changes", copiedNode);
  }, [copiedNode]);
  return (
    <div>
      <Header
        showSearchInfo={showSearchInfo}
        setShowSearchInfo={setShowSearchInfo}
        filteredResults={filteredResults}
        searchText={searchText}
        setBreadCrumb={setBreadCrumb}
        setSearchText={setSearchText}
        breadcrumb={breadcrumb}
      />
      <div className="divide"></div>
      <Content
        copiedNode={copiedNode}
        setCopiedNode={setCopiedNode}
        showSearchInfo={showSearchInfo}
        setFilteredResults={setFilteredResults}
        searchText={searchText}
        breadcrumb={breadcrumb}
        setBreadCrumb={setBreadCrumb}
        folderTree={folderTree}
        setFolderTree={setFolderTree}
      />
    </div>
  );
}

export default App;
