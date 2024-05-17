export const menuItem = [
    { name: "Open", id: 0, color: "black" },
    { name: "Copy", id: 1, color: "black" },
    { name: "Rename", id: 2, color: "black" },
    { name: "Delete", id: 3, color: "red" },

];
export const initialTree = {
    name: "root",
    child: [
        { name: "Apps", type: "folder", child: [] },
        { name: "me.jpg", type: "file", child: [] },
        {
            name: "Games",
            type: "folder",
            child: [{ name: "GTA.apk", type: "file", child: [] }],
        },
    ],
};
