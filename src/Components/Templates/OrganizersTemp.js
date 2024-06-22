import React from 'react'
import { Link } from 'react-router-dom'

const OrganizersTemp = () => {
  return (
    <>
    <div>
      <table style={{width:'100%'}}>
        <thead>
          <tr>
            <th>organizer</th>
            <th>setting</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Link to='/staticorganizer'><td>1040</td></Link>
            <td>edit</td>

          </tr>
        </tbody>
      </table>
      
    </div>
    </>
  )
}

export default OrganizersTemp

// import React, { useState } from 'react';
// import { IoChevronBackOutline } from "react-icons/io5";
// import { VscOpenPreview } from "react-icons/vsc";
// import { FiSettings } from "react-icons/fi";
// import { RiAddCircleLine } from "react-icons/ri";
// import { PiDotsSixVerticalThin } from "react-icons/pi";
// import './organizertemp.css';
// import { LuCopy } from "react-icons/lu";
// import { RiDeleteBin6Line } from "react-icons/ri";

// const OrganizersTemp = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [sections, setSections] = useState([{ id: 1, name: '' }]);

//   const handleButtonClick = () => {
//     setShowForm(true);
//   };

//   const handleBackClick = () => {
//     setShowForm(false);
//   };

//   const addSection = () => {
//     const newSection = { id: sections.length + 1, name: '' };
//     setSections([...sections, newSection]);
//   };

//   const removeSection = (indexToRemove) => {
//     const updatedSections = sections.filter((_, index) => index !== indexToRemove);
//     setSections(updatedSections);
//   };

//   const handleSectionNameChange = (index, newName) => {
//     const updatedSections = sections.map((section, idx) => (
//       idx === index ? { ...section, name: newName } : section
//     ));
//     setSections(updatedSections);
//   };

//   return (
//     <>
//       {!showForm ? (
//         <div>
//           <button onClick={handleButtonClick} className='btn1'>create template</button>
//           <table style={{ width: '100%' }}>
//             <thead>
//               <tr>
//                 <th></th>
//                 <th></th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td></td>
//                 <td></td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <div>
//           <div className='organizer-temp-header'>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//               <IoChevronBackOutline onClick={handleBackClick} style={{ fontSize: '20px', cursor: 'pointer' }} />
//               <h2>Create organizer template</h2>
//             </div>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: 'blue' }}>
//                 <VscOpenPreview />
//                 <p style={{ color: 'blue' }}>Preview</p>
//               </div>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: 'blue' }}>
//                 <FiSettings />
//                 <p style={{ color: 'blue' }}>Settings</p>
//               </div>
//             </div>
//           </div>
//           <div className='organizer-template-form'>
//             <div>
//               <label style={{ fontSize: '14px' }}>Template Name</label>
//               <div>
//                 <input type='text' placeholder='Template Name' style={{ width: '60%' }} />
//               </div>
//             </div>
//             <div style={{ display: 'flex', justifyItems: "center", width: '60%', gap: '20px' }} >
//               <div style={{ width: '100%' }}>
//                 <label style={{ fontSize: '14px' }}>Organizer Name</label>
//                 <input type='text' placeholder='Organizer Name' />
//               </div>
//               <div style={{ display: 'flex', gap: '10px', alignItems: 'center', cursor: 'pointer' }}>
//                 <RiAddCircleLine />
//                 <p>Add shortcode</p>
//               </div>
//             </div>
//             <div style={{ border: '2px solid red', padding: '10px', display: 'flex', gap: '15px' }}>
//               <div className='Organizer-section' >
//                 {sections.map((section, index) => (
//                   <div key={section.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}>
//                     <PiDotsSixVerticalThin style={{ fontSize: '30px' }} />
//                     <input
//                       placeholder={`Section Name`}
//                       className='section-name'
//                       value={section.name}
//                       readOnly
//                     />
//                   </div>
//                 ))}
//                 <div style={{ display: 'flex', gap: '10px', alignItems: 'center', cursor: 'pointer', margin: '15px' }} onClick={addSection}>
//                   <RiAddCircleLine />
//                   <p>Add Section</p>
//                 </div>
//               </div>
//               <div className='section-details'>
//                 {sections.map((section, index) => (
//                   <div key={section.id} className='section-details-header'>
//                     <input
//                       placeholder='Section Name'
//                       className='input-section'
//                       value={section.name}
//                       onChange={(e) => handleSectionNameChange(index, e.target.value)}
//                     />
//                     <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
//                       <LuCopy style={{ cursor: 'pointer' }} />
//                       <FiSettings style={{ cursor: 'pointer' }} />
//                       {sections.length > 1 && (
//                         <RiDeleteBin6Line
//                           onClick={() => removeSection(index)}
//                           style={{ color: 'red', cursor: 'pointer' }}
//                         />
//                       )}
//                     </div>
//                   </div>
//                 ))}
//                 <hr />
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '30px', margin: '10px' }}>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: 'blue' }}>
//                     <RiAddCircleLine />
//                     <p style={{ color: 'blue' }}>Question</p>
//                   </div>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: 'blue' }}>
//                     <RiAddCircleLine />
//                     <p style={{ color: 'blue' }}>Text Block</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <button type="button" onClick={handleBackClick}>Back</button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default OrganizersTemp;

// import React, { useState } from 'react';
// import { IoChevronBackOutline } from "react-icons/io5";
// import { VscOpenPreview } from "react-icons/vsc";
// import { FiSettings } from "react-icons/fi";
// import { RiAddCircleLine } from "react-icons/ri";
// import { PiDotsSixVerticalThin } from "react-icons/pi";
// import './organizertemp.css';
// import { LuCopy } from "react-icons/lu";
// import { RiDeleteBin6Line } from "react-icons/ri";

// const OrganizersTemp = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [sections, setSections] = useState([{ id: 1, name: '' }]);
//   const [activeSection, setActiveSection] = useState(0);

//   const handleButtonClick = () => {
//     setShowForm(true);
//   };

//   const handleBackClick = () => {
//     setShowForm(false);
//   };

//   const addSection = () => {
//     const newSection = { id: sections.length + 1, name: '' };
//     setSections([...sections, newSection]);
//     setActiveSection(sections.length);
//   };

//   const removeSection = (indexToRemove) => {
//     const updatedSections = sections.filter((_, index) => index !== indexToRemove);
//     setSections(updatedSections);
//     if (activeSection >= indexToRemove && activeSection > 0) {
//       setActiveSection(activeSection - 1);
//     }
//   };

//   const handleSectionNameChange = (index, newName) => {
//     const updatedSections = sections.map((section, idx) => (
//       idx === index ? { ...section, name: newName } : section
//     ));
//     setSections(updatedSections);
//   };

//   return (
//     <>
//       {!showForm ? (
//         <div>
//           <button onClick={handleButtonClick} className='btn1'>Create Template</button>
//           <table style={{ width: '100%' }}>
//             <thead>
//               <tr>
//                 <th></th>
//                 <th></th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td></td>
//                 <td></td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <div>
//           <div className='organizer-temp-header'>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//               <IoChevronBackOutline onClick={handleBackClick} style={{ fontSize: '20px', cursor: 'pointer' }} />
//               <h2>Create Organizer Template</h2>
//             </div>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: 'blue' }}>
//                 <VscOpenPreview />
//                 <p style={{ color: 'blue' }}>Preview</p>
//               </div>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: 'blue' }}>
//                 <FiSettings />
//                 <p style={{ color: 'blue' }}>Settings</p>
//               </div>
//             </div>
//           </div>
//           <div className='organizer-template-form'>
//             <div>
//               <label style={{ fontSize: '14px' }}>Template Name</label>
//               <div>
//                 <input type='text' placeholder='Template Name' style={{ width: '60%' }} />
//               </div>
//             </div>
//             <div style={{ display: 'flex', justifyItems: "center", width: '60%', gap: '20px' }} >
//               <div style={{ width: '100%' }}>
//                 <label style={{ fontSize: '14px' }}>Organizer Name</label>
//                 <input type='text' placeholder='Organizer Name' />
//               </div>
//               <div style={{ display: 'flex', gap: '10px', alignItems: 'center', cursor: 'pointer' }}>
//                 <RiAddCircleLine />
//                 <p>Add Shortcode</p>
//               </div>
//             </div>
//             <div style={{ border: '2px solid red', padding: '10px', display: 'flex', gap: '15px' }}>
//               <div className='Organizer-section' >
//                 {sections.map((section, index) => (
//                   <div key={section.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}>
//                     <PiDotsSixVerticalThin style={{ fontSize: '30px' }} />
//                     <input
//                       placeholder={`Section Name`}
//                       className='section-name'
//                       value={section.name}
//                       readOnly
//                       onClick={() => setActiveSection(index)}
//                     />
//                   </div>
//                 ))}
//                 <div style={{ display: 'flex', gap: '10px', alignItems: 'center', cursor: 'pointer', margin: '15px' }} onClick={addSection}>
//                   <RiAddCircleLine />
//                   <p>Add Section</p>
//                 </div>
//               </div>
//               <div className='section-details'>
//                 {sections.length > 0 && (
//                   <div className='section-details-header'>
//                     <input
//                       placeholder='Section Name'
//                       className='input-section'
//                       value={sections[activeSection].name}
//                       onChange={(e) => handleSectionNameChange(activeSection, e.target.value)}
//                     />
//                     <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
//                       <LuCopy style={{ cursor: 'pointer' }} />
//                       <FiSettings style={{ cursor: 'pointer' }} />
//                       {sections.length > 1 && (
//                         <RiDeleteBin6Line
//                           onClick={() => removeSection(activeSection)}
//                           style={{ color: 'red', cursor: 'pointer' }}
//                         />
//                       )}
//                     </div>
//                   </div>
//                 )}
//                 <hr />
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '30px', margin: '10px' }}>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: 'blue' }}>
//                     <RiAddCircleLine />
//                     <p style={{ color: 'blue' }}>Question</p>
//                   </div>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: 'blue' }}>
//                     <RiAddCircleLine />
//                     <p style={{ color: 'blue' }}>Text Block</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <button type="button" onClick={handleBackClick}>Back</button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default OrganizersTemp;


// import React, { useState } from 'react';
// import { IoChevronBackOutline } from "react-icons/io5";
// import { VscOpenPreview } from "react-icons/vsc";
// import { FiSettings } from "react-icons/fi";
// import { RiAddCircleLine } from "react-icons/ri";
// import { PiDotsSixVerticalThin } from "react-icons/pi";
// import './organizertemp.css';
// import { LuCopy } from "react-icons/lu";
// import { RiDeleteBin6Line } from "react-icons/ri";

// const OrganizersTemp = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [sections, setSections] = useState([{ id: 1, name: '' }]);
//   const [activeSection, setActiveSection] = useState(0);

//   const handleButtonClick = () => {
//     setShowForm(true);
//   };

//   const handleBackClick = () => {
//     setShowForm(false);
//   };

//   const addSection = () => {
//     const newSection = { id: sections.length + 1, name: '' };
//     setSections([...sections, newSection]);
//     setActiveSection(sections.length);
//   };

//   const removeSection = (indexToRemove) => {
//     const updatedSections = sections.filter((_, index) => index !== indexToRemove);
//     setSections(updatedSections);
//     if (activeSection >= indexToRemove && activeSection > 0) {
//       setActiveSection(activeSection - 1);
//     }
//   };

//   const handleSectionNameChange = (index, newName) => {
//     const updatedSections = sections.map((section, idx) => (
//       idx === index ? { ...section, name: newName } : section
//     ));
//     setSections(updatedSections);
//   };

//   const handleDuplicateSection = (index) => {
//     const sectionToDuplicate = sections[index];
//     const newSection = { ...sectionToDuplicate, id: sections.length + 1 };
//     const updatedSections = [...sections];
//     updatedSections.splice(index + 1, 0, newSection);
//     setSections(updatedSections);
//     setActiveSection(index + 1);
//   };

//   return (
//     <>
//       {!showForm ? (
//         <div>
//           <button onClick={handleButtonClick} className='btn1'>Create Template</button>
//           <table style={{ width: '100%' }}>
//             <thead>
//               <tr>
//                 <th></th>
//                 <th></th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td></td>
//                 <td></td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <div>
//           <div className='organizer-temp-header'>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//               <IoChevronBackOutline onClick={handleBackClick} style={{ fontSize: '20px', cursor: 'pointer' }} />
//               <h2>Create Organizer Template</h2>
//             </div>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: 'blue' }}>
//                 <VscOpenPreview />
//                 <p style={{ color: 'blue' }}>Preview</p>
//               </div>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: 'blue' }}>
//                 <FiSettings />
//                 <p style={{ color: 'blue' }}>Settings</p>
//               </div>
//             </div>
//           </div>
//           <div className='organizer-template-form'>
//             <div>
//               <label style={{ fontSize: '14px' }}>Template Name</label>
//               <div>
//                 <input type='text' placeholder='Template Name' style={{ width: '60%' }} />
//               </div>
//             </div>
//             <div style={{ display: 'flex', justifyItems: "center", width: '60%', gap: '20px' }} >
//               <div style={{ width: '100%' }}>
//                 <label style={{ fontSize: '14px' }}>Organizer Name</label>
//                 <input type='text' placeholder='Organizer Name' />
//               </div>
//               <div style={{ display: 'flex', gap: '10px', alignItems: 'center', cursor: 'pointer' }}>
//                 <RiAddCircleLine />
//                 <p>Add Shortcode</p>
//               </div>
//             </div>
//             <div style={{ border: '2px solid red', padding: '10px', display: 'flex', gap: '15px' }}>
//               <div className='Organizer-section' >
//                 {sections.map((section, index) => (
//                   <div key={section.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}>
//                     <PiDotsSixVerticalThin style={{ fontSize: '30px' }} />
//                     <input
//                       placeholder={`Section Name`}
//                       className='section-name'
//                       value={section.name}
//                       readOnly
//                       onClick={() => setActiveSection(index)}
//                     />
//                   </div>
//                 ))}
//                 <div style={{ display: 'flex', gap: '10px', alignItems: 'center', cursor: 'pointer', margin: '15px' }} onClick={addSection}>
//                   <RiAddCircleLine />
//                   <p>Add Section</p>
//                 </div>
//               </div>
//               <div className='section-details'>
//                 {sections.length > 0 && (
//                   <div className='section-details-header'>
//                     <input
//                       placeholder='Section Name'
//                       className='input-section'
//                       value={sections[activeSection].name}
//                       onChange={(e) => handleSectionNameChange(activeSection, e.target.value)}
//                     />
//                     <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
//                       <LuCopy 
//                         style={{ cursor: 'pointer' }} 
//                         onClick={() => handleDuplicateSection(activeSection)}
//                       />
//                       <FiSettings style={{ cursor: 'pointer' }} />
//                       {sections.length > 1 && (
//                         <RiDeleteBin6Line
//                           onClick={() => removeSection(activeSection)}
//                           style={{ color: 'red', cursor: 'pointer' }}
//                         />
//                       )}
//                     </div>
//                   </div>
//                 )}
//                 <hr />
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '30px', margin: '10px' }}>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: 'blue' }}>
//                     <RiAddCircleLine />
//                     <p style={{ color: 'blue' }}>Question</p>
//                   </div>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: 'blue' }}>
//                     <RiAddCircleLine />
//                     <p style={{ color: 'blue' }}>Text Block</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <button type="button" onClick={handleBackClick}>Back</button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default OrganizersTemp;
