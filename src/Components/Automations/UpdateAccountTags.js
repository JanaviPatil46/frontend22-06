import React, { useState, useEffect } from 'react';
import makeAnimated from 'react-select/animated';
import Select from "react-select";
const UpdateAccountTags = () => {
    const API_KEY = process.env.REACT_APP_API_IP;
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const animatedComponents = makeAnimated();
    const [combinedValue, setCombinedValue] = useState([]);
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
    //  for tags
    const calculateWidth = (label) => {
      const textWidth = label.length * 8;
      return Math.min(textWidth, 200);
    };
  
    const option = tags.map((tag) => ({
      value: tag._id,
      label: tag.tagName,
      colour: tag.tagColour,
  
      customStyle: {
        backgroundColor: tag.tagColour,
        color: "#fff",
        borderRadius: "5px",
        alignItems: "center",
        textAlign: "center",
        marginBottom: "5px",
        padding: "2px,8px",
  
        fontSize: "10px",
        width: `${calculateWidth(tag.tagName)}px`,
        margin: "7px",
      },
    }));
  
    const customStyles = {
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.data.customStyle.backgroundColor,
        color: state.data.customStyle.color,
        borderRadius: state.data.customStyle.borderRadius,
        width: state.data.customStyle.width,
        textAlign: state.data.customStyle.textAlign,
        marginBottom: state.data.customStyle.marginBottom,
  
        fontSize: state.data.customStyle.fontSize,
        padding: state.data.customStyle.padding,
        margin: state.data.customStyle.margin,
      }),
      multiValue: (provided, state) => ({
        ...provided,
        backgroundColor: state.data.customStyle.backgroundColor,
        color: state.data.customStyle.color,
        borderRadius: state.data.customStyle.borderRadius,
        textAlign: state.data.customStyle.textAlign,
        fontSize: state.data.customStyle.fontSize,
      }),
      multiValueLabel: (provided, state) => ({
        ...provided,
        color: state.data.customStyle.color,
        width: state.data.customStyle.width,
        textAlign: state.data.customStyle.textAlign,
        fontSize: state.data.customStyle.fontSize,
      }),
    };
  
  
    const handleTagChange = (selectedOptions) => {
      setSelectedTags(selectedOptions);
  
      // Map selected options to their values and send as an array
      const selectedValues = selectedOptions.map((option) => option.value);
  
      // Send selectedValues array to your backend
      console.log("Selected Values:", selectedValues);
      setCombinedValue(selectedValues);
    };
    return (
        <>
            <div className='folder-body' style={{ paddingTop: '20px' }}>
                <div style={{display:'flex', gap:'10px'}}>
                    <div style={{width:'50%'}}>
                        <div className='label-container'>
                            <label>Add accounts tags</label>
                        </div>
                        <Select
                        options={option}
                        components={animatedComponents}
                        isMulti // Enable multi-select
                        value={selectedTags}
                        onChange={handleTagChange}
                        placeholder="Select tags..."
                        isSearchable // Enable search
                        styles={customStyles}
                      />
                    </div>
                    <div style={{width:'50%'}}>
                        <div className='label-container'>
                            <label>Remove accounts tags</label>
                        </div>
                        <Select
                        options={option}
                        components={animatedComponents}
                        isMulti // Enable multi-select
                        value={selectedTags}
                        onChange={handleTagChange}
                        placeholder="Select tags..."
                        isSearchable // Enable search
                        styles={customStyles}
                      />
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateAccountTags
