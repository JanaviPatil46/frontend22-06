import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import './OrganizerTemp.css'; // Import the CSS file for styling
import { HiOutlineDuplicate } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
const Section = ({ section, onDelete, onUpdate }) => {
  const [text, setText] = useState(section.text);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  // const [formElements, setFormElements] = useState(section.formElements);
  const [formElements, setFormElements] = useState(section.formElements || []);

  useEffect(() => {
    setText(section.text);
    setFormElements(section.formElements);
  }, [section]);

  //   useEffect(() => {
  //     console.log('Sections:', section);
  //     console.log('Selected Section:', selectedSection);
  // }, [section, selectedSection]);

  const handleDelete = () => {
    onDelete(section.id);

  };

  const handleTextChange = (event) => {
    const newText = event.target.value;
    setText(newText);
    onUpdate(section.id, newText, formElements);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleAddFormElement = (type) => {


    const newElement = { type, id: Date.now(), sectionid: section.id, options: [], text: '' };
    const updatedFormElements = [...formElements, newElement];
    setFormElements(updatedFormElements);
    onUpdate(section.id, text, updatedFormElements);
    setDropdownVisible(false);
  };

  console.log(formElements)
  console.log(section.id)

  const handleDeleteFormElement = (id) => {
    const updatedFormElements = formElements.filter(element => element.id !== id);
    setFormElements(updatedFormElements);
    onUpdate(section.id, text, updatedFormElements);
  };

  const handleAddOption = (elementId) => {
    const newOption = { id: Date.now(), text: '' };
    const updatedFormElements = formElements.map(element => {
      if (element.id === elementId) {
        return { ...element, options: [...(element.options || []), newOption] };
      }
      return element;
    });
    setFormElements(updatedFormElements);
    onUpdate(section.id, text, updatedFormElements);
  };

  const handleOptionChange = (elementId, optionId, newText) => {
    const updatedFormElements = formElements.map(element => {
      if (element.id === elementId) {
        const updatedOptions = element.options.map(option => {
          if (option.id === optionId) {
            return { ...option, text: newText };
          }
          return option;
        });
        return { ...element, options: updatedOptions };
      }
      return element;
    });
    setFormElements(updatedFormElements);
    onUpdate(section.id, text, updatedFormElements);
  };

  const handleDeleteOption = (elementId, optionId) => {
    const updatedFormElements = formElements.map(element => {
      if (element.id === elementId) {
        const updatedOptions = element.options.filter(option => option.id !== optionId);
        return { ...element, options: updatedOptions };
      }
      return element;
    });
    setFormElements(updatedFormElements);
    onUpdate(section.id, text, updatedFormElements);
  };

  const handleCheckboxTextChange = (elementId, newText) => {
    const updatedFormElements = formElements.map(element => {
      if (element.id === elementId) {
        return { ...element, text: newText };
      }
      return element;
    });
    setFormElements(updatedFormElements);
    onUpdate(section.id, text, updatedFormElements);
  };

  const handleElementTextChange = (elementId, newText) => {
    const updatedFormElements = formElements.map(element => {
      if (element.id === elementId) {
        return { ...element, text: newText };
      }
      return element;
    });
    setFormElements(updatedFormElements);
    onUpdate(section.id, text, updatedFormElements);
  };

  // console.log(onDelete,onUpdate,section)
  const renderOptions = (element) => {
    return (
      <div>
        <div>
          {element.options && element.options.map(option => (
            <div key={option.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <input
                type="text"
                placeholder="Option"
                value={option.text}
                onChange={(e) => handleOptionChange(element.id, option.id, e.target.value)}
                style={{ marginRight: '8px' }}
              />
              <RiDeleteBinLine onClick={() => handleDeleteOption(element.id, option.id)} className='deletesection' />
            </div>
          ))}
        </div>
        <div>
          <button type="button" onClick={() => handleAddOption(element.id)} style={{ padding: '8px', borderRadius: '4px' }}>Add Option</button>
        </div>
      </div>
    );
  };

  const renderFormElement = (element) => {
    switch (element.type) {
      case 'Free Entry':
        return (
          <div key={element.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <input type="text" placeholder="Free Entry" style={{ marginRight: '8px' }}
              value={element.text} onChange={(e) => handleElementTextChange(element.id, e.target.value)} />

            <RiDeleteBinLine onClick={() => handleDeleteFormElement(element.id)} className='deletesection' />

          </div>
        );
      case 'Email':
        return (
          <div key={element.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <input type="email" placeholder="Email" style={{ marginRight: '8px' }}
              value={element.text} onChange={(e) => handleElementTextChange(element.id, e.target.value)} />
            <RiDeleteBinLine onClick={() => handleDeleteFormElement(element.id)} className='deletesection' />

          </div>
        );
      case 'Number':
        return (
          <div key={element.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <input type="text" placeholder="Number" style={{ marginRight: '8px' }}
              value={element.text} onChange={(e) => handleElementTextChange(element.id, e.target.value)} />

            <RiDeleteBinLine onClick={() => handleDeleteFormElement(element.id)} className='deletesection' />

          </div>
        );
      case 'Date':
        return (
          <div key={element.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <input type="date" style={{ marginRight: '8px' }}
              value={element.text} onChange={(e) => handleElementTextChange(element.id, e.target.value)} />

            <RiDeleteBinLine onClick={() => handleDeleteFormElement(element.id)} className='deletesection' />

          </div>
        );
      case 'Radio Buttons':
        return (
          <div key={element.id} style={{ marginBottom: '8px' }}>
            <label>Radio Button:</label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input type="radio" name={`radio-${element.id}`} style={{ marginRight: '4px' }} />
              <input type="text" placeholder="Radio Buttons" style={{ marginRight: '8px' }}
                value={element.text} onChange={(e) => handleElementTextChange(element.id, e.target.value)} />

              <RiDeleteBinLine onClick={() => handleDeleteFormElement(element.id)} className='deletesection' />

            </div>
            <div>{renderOptions(element)}</div>
          </div>
        );
      case 'Checkboxes':
        return (
          <div key={element.id} style={{ marginBottom: '8px' }}>
            <label>Checkbox:</label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input type="checkbox" name={`checkbox-${element.id}`} style={{ marginRight: '4px' }} />
              <input
                type="text"
                placeholder="Checkboxes"
                value={element.text}
                onChange={(e) => handleCheckboxTextChange(element.id, e.target.value)}
                style={{ marginRight: '8px' }}
              />

              <RiDeleteBinLine onClick={() => handleDeleteFormElement(element.id)} className='deletesection' />

            </div>
            <div>{renderOptions(element)}</div>
          </div>
        );

      case 'Dropdown':
        return (
          <div key={element.id} style={{ marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>

              <label>Dropdown:</label>
              <input
                type="text"
                placeholder="Dropdown"
                value={element.text}
                onChange={(e) => handleCheckboxTextChange(element.id, e.target.value)}
                style={{ marginRight: '8px' }}
              />

              <RiDeleteBinLine onClick={() => handleDeleteFormElement(element.id)} className='deletesection' />

            </div>

            <div>{renderOptions(element)}</div>

          </div>
        );

      case 'Yes/No':
        return (
          <div key={element.id} style={{ marginBottom: '8px' }}>
            <label>Yes/No:</label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input type="radio" name={`radio-${element.id}`} style={{ marginRight: '4px' }} />
              <input type="text" placeholder="Yes/No" style={{ marginRight: '8px' }}
                value={element.text} onChange={(e) => handleElementTextChange(element.id, e.target.value)} />

              <RiDeleteBinLine onClick={() => handleDeleteFormElement(element.id)} className='deletesection' />

            </div>
            <div>{renderOptions(element)}</div>
          </div>
        );


      case 'File Upload':
        return (
          <div key={element.id} className="smooth-dnd-container vertical">
            <div className="draggable-list-item section__question _sectionQuestion_c7pto_10 smooth-dnd-draggable-wrapper">
              <div>
                <div className="section-option _sectionOption_1nkoi_1 section_selected">
                  <header className="section-option__header _header_1nkoi_6">
                    <div className="_fieldWrapper_geoll_1">
                      <div className="_field_geoll_1">
                        <label className="_root_1e7sb_1 _medium_1e7sb_19">
                          <span className="_label_1e7sb_67 _subtext_17kh3_89">File upload</span>
                          <div className="_fieldContainer_1e7sb_56">
                            <input className="_field_1e7sb_56 _text_17kh3_73" placeholder="File upload" type="text" value={element.text} onChange={(e) => handleElementTextChange(element.id, e.target.value)} />
                          </div>
                        </label>
                      </div>
                    </div>

                  </header>

                  <div className="_root_19cba_1 _secondary_19cba_76 _default_19cba_124 _medium_19cba_47 _button-medium_17kh3_169 _disabled_19cba_142">
                    Upload Documents
                  </div>

                </div>
              </div>
            </div>
          </div>
        );


      default:
        return null;
    }
  };


  const menuItems = [
    'Free Entry', 'Email', 'Number', 'Date', 'Radio Buttons', 'Checkboxes', 'Dropdown', 'Yes/No', 'File Upload'
  ];


  return (
    <div className="_root_1rqwx_1 _isColumn_1rqwx_57 _isWide_1rqwx_61" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <div className="_root_18ffc_1 _hasShadow_18ffc_40" data-test="section" style={{  marginBottom: '24px' }}>

        <div className="_root_7lm86_1" data-test="section-header" style={{ padding: '16px' }}>
          <div className="_content_7lm86_57" data-test="content" style={{ marginBottom: '16px' }}>
            <div className="_editableTextWrap_c7pto_21">
              <label className="_fieldContainer_zwyj7_37 _title2-semi_17kh3_25 _colors-core-neutral-1000_lnab1_41" style={{ display: 'block', position: 'relative', width: '100%' }}>
                <div className="_inputPreviewBorder_zwyj7_5" style={{ position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', border: '1px solid transparent', borderRadius: '8px' }}></div>
                <div className="_inputPreviewWrapper_zwyj7_15" style={{ position: 'relative', width: '100%' }}>
                  <div className="_inputPreview_zwyj7_5" style={{ position: 'relative', width: '100%' }}>
                    {/* <span className="_inputPreviewText_zwyj7_43 _empty_zwyj7_53" style={{ display: 'inline-block', verticalAlign: 'middle' }}>{section.name}</span> */}
                    <div className="_iconWrapper_zwyj7_112" style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '8px' }}>
                    </div>
                  </div>
                </div>
                <input
                  placeholder='Section Name'
                  className='input-section'
                  value={text}
                  onChange={handleTextChange}
                  
                />
              </label>
            </div>
          </div>

          <div className="_action_7lm86_40" data-test="action" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>

            <HiOutlineDuplicate />
            <RiDeleteBinLine onClick={handleDelete} className='deletesection' />
          </div>

        </div>

        <div className="_root_10tx0_1" data-test="add-field-container" style={{ padding: '16px' }}>
          <button
            type="button"
            className="_root_19cba_1 _ghost_19cba_92 _default_19cba_124 _medium_19cba_47 _button-medium_17kh3_169"
            data-test="shared-element__button"
            onClick={toggleDropdown}
          >
            Question
          </button>
          {dropdownVisible && (
            <div className="rc-dropdown rc-dropdown-open" style={{ position: 'absolute', left: '740px', top: '280px' }}>
              <ul className="rc-dropdown-menu" role="menu" style={{ backgroundColor: '#fff', borderRadius: '4px', padding: '8px' }}>
                {menuItems.map((item, index) => (
                  <li
                    key={index}
                    className="rc-dropdown-menu-item"
                    role="menuitem"
                    onClick={() => handleAddFormElement(item)}
                    style={{ padding: '8px', cursor: 'pointer' }}
                  >

                    {item}
                    <> {console.log(item)}</>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div>
          {/* {formElements.map(element => renderFormElement(element))} */}
          {formElements && formElements.map(element => renderFormElement(element))}

        </div>
      </div>
    </div>
  );

};

export default Section;
