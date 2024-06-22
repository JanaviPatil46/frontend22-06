// import React, { useState } from 'react'
// import { LuPlusCircle } from "react-icons/lu";
// import Select from "react-select";
// import { AiOutlineSearch } from "react-icons/ai";
// import { IoMdArrowRoundBack } from "react-icons/io";
// const ApplyFolder = () => {
//     const [isConditionsFormOpen, setIsConditionsFormOpen] = useState(false);
//     const [isAnyCheckboxChecked, setIsAnyCheckboxChecked] = useState(false);
//     const handleAddConditions = () => {
//         setIsConditionsFormOpen(!isConditionsFormOpen);
//     };
//     const handleGoBack = () => {
//         setIsConditionsFormOpen(false);
//     };
//     const handleCheckboxChange = () => {
//         // Function to check if any checkbox is checked
//         const checkboxes = document.querySelectorAll('.conditions-content input[type="checkbox"]');
//         let isChecked = false;
//         checkboxes.forEach(checkbox => {
//             if (checkbox.checked) {
//                 isChecked = true;
//             }
//         });
//         setIsAnyCheckboxChecked(isChecked);
//     };

//     return (
//         <>
//                 <div  className="folder-card" >

//                     <div className='folder-body' style={{ paddingTop: '20px' }}>
//                         <div >
//                             <div className='label-container'>
//                                 <label>Select template</label>
//                             </div>
//                             <Select className='select-dropdown' placeholder="Select template" />
//                         </div>
//                         <div className='conditions' style={{ marginTop: '20px' }}>
//                             <li style={{ listStyle: 'none', cursor: 'pointer', color: 'blue', fontWeight: '550' }} onClick={handleAddConditions}
//                             >add conditions</li>
//                         </div>
//                     </div>
//                 </div>
           

//             <div className={`conditions-form-container ${isConditionsFormOpen ? "conditions-form-open" : ""}`}>
//                 <div className="conditions-header_title" style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'center' }}>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'center' }}>
//                         <IoMdArrowRoundBack style={{ color: 'blue', fontSize: '35px', cursor: 'pointer' }} onClick={handleGoBack} />
//                         <div className="conditions-title">Add conditions</div>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', gap: '5px', color: 'blue', cursor: 'pointer' }}>
//                         <LuPlusCircle />
//                         <h3 style={{ fontSize: '12px' }}>Add tag</h3>
//                     </div>

//                 </div>

//                 <div className='conditions-content col-12' style={{ padding: '20px' }}>
//                     <div style={{ padding: '10px' }}>
//                         <p>Apply automation only for accounts with these tags</p>
//                         <div style={{ position: 'relative', marginTop: '20px', }}>
//                             <input type="text" placeholder="Search..." style={{ paddingLeft: '30px' }} className="tagsearch" />
//                             <AiOutlineSearch style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', fontSize: '20px', }} />
//                         </div>
//                         <div style={{ marginTop: '20px' }}>
//                             <hr />
//                             <div style={{ margin: '5px 0 5px 0', display: 'flex', gap: '30px' }}>
//                                 <input type="checkbox" onChange={handleCheckboxChange} />
//                                 <p>Option 1</p>
//                             </div>
//                             <hr />
//                             <div style={{ margin: '5px 0 5px 0', display: 'flex', gap: '30px' }}>
//                                 <input type="checkbox" onChange={handleCheckboxChange} />
//                                 <p>Option 2</p>
//                             </div>
//                             <hr />
//                             <div style={{ margin: '5px 0 5px 0', display: 'flex', gap: '30px' }}>
//                                 <input type="checkbox" onChange={handleCheckboxChange} />
//                                 <p>Option 3</p>
//                             </div>
//                             <hr />
//                             <div style={{ margin: '5px 0 5px 0', display: 'flex', gap: '30px' }}>
//                                 <input type="checkbox" onChange={handleCheckboxChange} />
//                                 <p>Option 4</p>
//                             </div>
//                             <hr />

//                         </div>
//                         <div className="conditions-btns col-6" style={{ marginTop: '20px', display: 'flex', gap: '20px' }}>

//                             <button type="submit" style={{ padding: '10px', borderRadius: '10px', cursor: isAnyCheckboxChecked ? 'pointer' : 'not-allowed', border: 'none', background: isAnyCheckboxChecked ? 'blue' : '#ccc', color: '#fff', fontSize: '15px', width: '80px' }}>Add</button>
//                             <button type="button" onClick={handleGoBack} style={{ background: 'none', padding: '10px', borderRadius: '10px', cursor: 'pointer', border: '1px solid blue', fontSize: '15px', color: 'blue' }}>Cancle</button>
//                         </div>

//                     </div>

//                 </div>

//             </div>


//         </>
//     )
// }

// export default ApplyFolder



import React, { useState, useEffect } from 'react';
import { LuPlusCircle } from "react-icons/lu";
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdArrowRoundBack } from "react-icons/io";

const ApplyFolder = () => {
    const API_KEY = process.env.REACT_APP_API_IP;

    const [isConditionsFormOpen, setIsConditionsFormOpen] = useState(false);
    const [isAnyCheckboxChecked, setIsAnyCheckboxChecked] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [tempSelectedTags, setTempSelectedTags] = useState([]);

    const handleAddConditions = () => {
        setIsConditionsFormOpen(!isConditionsFormOpen);
    };

    const handleGoBack = () => {
        setIsConditionsFormOpen(false);
    };

    const handleCheckboxChange = (tagId) => {
        const updatedSelectedTags = tempSelectedTags.includes(tagId)
            ? tempSelectedTags.filter(id => id !== tagId)
            : [...tempSelectedTags, tagId];
        setTempSelectedTags(updatedSelectedTags);
        setIsAnyCheckboxChecked(updatedSelectedTags.length > 0);
    };

    const handleAddTags = () => {
        setSelectedTags([...selectedTags, ...tempSelectedTags.filter(tagId => !selectedTags.includes(tagId))]);
        setIsConditionsFormOpen(false);
        setTempSelectedTags([]);
    };

    const animatedComponents = makeAnimated();
    const [FolderData, setFolderData] = useState([]);
    const [selectedFolder, setSelectedFolder] = useState();
  
    const handleFolderChange = (selectedOptions) => {
      setSelectedFolder(selectedOptions);
      // Map selected options to their values and send as an array
    };
  
    useEffect(() => {
      fetchFolderData();
    }, []);
  
    const fetchFolderData = async () => {
      try {
        const url = `${API_KEY}/common/folder/`;
        const response = await fetch(url);
        const data = await response.json();
  
        setFolderData(data.folderTemplates);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    // console.log(userdata);
    const folderoptions = FolderData.map((folder) => ({
      value: folder._id,
      label: folder.templatename,
    }));
 

    const [tags, setTags] = useState([]);
  
    useEffect(() => {
        fetchDatas();
    }, []);

    const fetchDatas = async () => {
        try {
            const url = `${API_KEY}/common/tag/`;
            const response = await fetch(url);
            const data = await response.json();
            setTags(data.tags);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const calculateWidth = (label) => {
        const textWidth = label.length * 8;
        return Math.min(textWidth, 200);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredTags = tags.filter(tag => 
        tag.tagName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const selectedTagElements = selectedTags.map(tagId => {
        const tag = tags.find(tag => tag._id === tagId);
        return tag ? (
            <div key={tag._id} style={{ backgroundColor: tag.tagColour, borderRadius: '20px', color: '#fff', fontSize: '12px', fontWeight: '600', textAlign: 'center', border: 'none', padding: '3px', marginBottom: '5px', marginRight: '5px', display: 'inline-block', width: `${calculateWidth(tag.tagName)}px` }}>
                {tag.tagName}
            </div>
        ) : null;
    });

    return (
        <>
            <div className='folder-body' style={{ paddingTop: '20px' }}>
                <div>
                    <div className='label-container'>
                        <label>Select template</label>
                    </div>
                    <Select
                        options={folderoptions}
                        components={animatedComponents}
                        isMulti={false} // Enable multi-select
                        value={selectedFolder}
                        onChange={handleFolderChange}
                        placeholder="Select Folder..."
                        isSearchable
                        isClearable //
                      />
                </div>
                <div style={{ marginTop: '20px' }}>
                    {selectedTagElements.length > 0 && (
                        <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                            <label>only for:</label>
                            <div style={{ marginTop: '10px' }}>
                                {selectedTagElements}
                            </div>
                        </div>
                    )}
                </div>
                <div className='conditions' style={{ marginTop: '20px' }}>
                    <li style={{ listStyle: 'none', cursor: 'pointer', color: 'blue', fontWeight: '550' }} onClick={handleAddConditions}>
                        Add conditions
                    </li>
                </div>
            </div>

            <div className={`conditions-form-container ${isConditionsFormOpen ? "conditions-form-open" : ""}`}>
                <div className="conditions-header_title" style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'center' }}>
                        <IoMdArrowRoundBack style={{ color: 'blue', fontSize: '35px', cursor: 'pointer' }} onClick={handleGoBack} />
                        <div className="conditions-title">Add conditions</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '5px', color: 'blue', cursor: 'pointer' }}>
                        <LuPlusCircle />
                        <h3 style={{ fontSize: '12px' }}>Add tag</h3>
                    </div>
                </div>

                <div className='conditions-content col-12' style={{ padding: '20px' }}>
                    <div style={{ padding: '10px' }}>
                        <p>Apply automation only for accounts with these tags</p>
                        <div style={{ position: 'relative', marginTop: '20px' }}>
                            <input 
                                type="text" 
                                placeholder="Search..." 
                                style={{ paddingLeft: '30px' }} 
                                className="tagsearch" 
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <AiOutlineSearch style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', fontSize: '20px' }} />
                        </div>
                        <div style={{ marginTop: '20px' }}>
                          <hr/>
                            {filteredTags.map(tag => (
                                <div key={tag._id} style={{ margin: '5px 0 5px 0', display: 'flex', gap: '30px', borderBottom:'1px solid grey',}}>
                                    <input type="checkbox" onChange={() => handleCheckboxChange(tag._id)} checked={tempSelectedTags.includes(tag._id)} />
                                    <p style={{backgroundColor: tag.tagColour,  width: `${calculateWidth(tag.tagName)}px`,  borderRadius:'20px',  color:'#fff', fontSize:'12px', fontWeight:'600', textAlign:'center', border:'none',padding:'3px',marginBottom:'5px'}}>{tag.tagName}</p>
                                </div>
                            ))}
                        </div>
                        <div className="conditions-btns col-6" style={{ marginTop: '20px', display: 'flex', gap: '20px' }}>
                            <button type="button" onClick={handleAddTags} style={{ padding: '10px', borderRadius: '10px', cursor: isAnyCheckboxChecked ? 'pointer' : 'not-allowed', border: 'none', background: isAnyCheckboxChecked ? 'blue' : '#ccc', color: '#fff', fontSize: '15px', width: '80px' }}>Add</button>
                            <button type="button" onClick={handleGoBack} style={{ background: 'none', padding: '10px', borderRadius: '10px', cursor: 'pointer', border: '1px solid blue', fontSize: '15px', color: 'blue' }}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ApplyFolder;