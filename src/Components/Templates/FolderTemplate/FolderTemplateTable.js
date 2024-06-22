import React from "react";
import "../foldertemp.css";
function FolderTemplateTbel({ handleCreateTemplate, folderTemplates, handleEdit }) {
  return (
    <div>
      <div className="create-folder">
        <button className="btn1" onClick={handleCreateTemplate}>
          Create Template
        </button>
      </div>
      <div className="folder-table">
        <table style={{width:'100%'}}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Used in pipeline</th>
            </tr>
          </thead>
          <tbody>
            {folderTemplates.map((template) => (
              <tr key={template._id}>
                <td onClick={() => handleEdit(template._id)} style={{ cursor: "pointer", color: "blue" }}>
                  {template.templatename}
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FolderTemplateTbel;
