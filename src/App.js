import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/header/header';
import Content from './components/content/content';

function App() {
  const [searchText, setSearchText] = useState("");
  const [breadcrumb, setBreadCrumb] = useState([{ name: "root" }]);
  const [folderTree, setFolderTree] = useState(
    {
      name: "root",
      child: [{ name: "Apps", type: "folder", child: [] }, { name: "me.jpg", type: "file", child: [] }, { name: "Games", type: "folder", child: [{ name: "GTA.apk", type: "file", child: [] }] }]
    }
  )

  return (
    <div >
      <Header searchText={searchText} setBreadCrumb={setBreadCrumb} setSearchText={setSearchText} breadcrumb={breadcrumb} />
      <div className='divide'></div>
      <Content searchText={searchText} breadcrumb={breadcrumb} setBreadCrumb={setBreadCrumb} folderTree={folderTree} setFolderTree={setFolderTree} />

    </div>
  );
}

export default App;
