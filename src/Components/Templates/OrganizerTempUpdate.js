import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from "react-router-dom";
import './OrganizerTemp.css';
import Section from './organizertempSection'; // Import the Section component

const OrganizerTempUpdate = () => {
    const API_KEY = process.env.REACT_APP_API_IP;
    const navigate = useNavigate();
    const { _id } = useParams();

    const [templateName, setTemplateName] = useState('');
    const [organizerName, setOrganizerName] = useState('');
    const [sections, setSections] = useState([]);
    const [selectedSection, setSelectedSection] = useState(null);
    const [templateData, setTemplateData] = useState(null);

    useEffect(() => {
        fetchidwiseData();
    }, []);

    const fetchidwiseData = async () => {
        try {
            const url = `${API_KEY}/workflow/organizertemplate/${_id}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            setTemplateData(data.organizerTemplate);
            setTemplateName(data.organizerTemplate.templatename);
            setOrganizerName(data.organizerTemplate.organizerName);
            console.log(data.organizerTemplate.sections)
            setSections(data.organizerTemplate.sections || []);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const addSection = () => {
        const newSection = { id: Date.now(), name: `Section ${sections.length + 1}`, text: '', formElements: [] };
        setSections([...sections, newSection]);
        setSelectedSection(newSection); // Select the newly added section
    };

    const handleSectionClick = (section) => {
        // const newSection = {
        //     id: section.sectionId, name: section.sectionname, text: section.sectionname, formElements: section.questions
        // };
        setSelectedSection(section);
    };

    const handleDeleteSection = (sectionId) => {
        const newSections = sections.filter(section => section.id !== sectionId);
        setSections(newSections);
        if (selectedSection && selectedSection.id === sectionId) {
            setSelectedSection(null); // Clear selected section if it's deleted
        }
    };

    const handleUpdateSection = (id, newText, newFormElements) => {
        setSections(prevSections => prevSections.map(section =>
            section.id === id ? { ...section, text: newText, formElements: newFormElements } : section
        ));
    };

    const saveOrganizerTemp = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            templatename: templateName,
            organizerName: organizerName,
            sections: sections.map(section => ({
                name: section.text,
                text: section.text,
                id: section.id.toString(),
                formElements: section.formElements.map(element => ({
                    type: element.type,
                    id: element.id,
                    sectionid: element.sectionid,
                    options: element.options.map(option => ({
                        id: option.id,
                        text: option.text
                    })),
                    text: element.text
                }))
            })),
            active: true
        });

        const requestOptions = {
            method: "PATCH",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        console.log(raw)
        const url = `${API_KEY}/workflow/organizertemplate/${_id}`;
        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                if (result && result.message === "OrganizerTemplate Updated successfully") {
                    toast.success("Organizer Template Updated successfully");
                    
                    setTimeout(() => {
                        navigate('/firmtemplates/organizers');
                    }, 1000);
                } else {
                    toast.error(result.error || "Failed to Update Organizer Template");
                }
            })
            .catch((error) => console.error(error));
    };

    const handleCancel = () => {
        setTimeout(() => {
            navigate('/firmtemplates/organizers');
        }, 1000);
    };


    console.log(selectedSection, 'selectedSection')


    return (
        <div>
            <h2>Update Organizer Template</h2>
            <div>
                <label>
                    Template name:
                    <input
                        type="text"
                        value={templateName}
                        onChange={(e) => setTemplateName(e.target.value)}
                    />
                </label>
                <label>
                    Organizer name:
                    <input
                        type="text"
                        value={organizerName}
                        onChange={(e) => setOrganizerName(e.target.value)}
                    />
                </label>
            </div>



            <div className="organizer-container" style={{ display: "flex", marginTop: "40px", height: "auto", width: "100%" }}>
                <div className="left-org-container" style={{ padding: '10px',  width: "30%", height: "315px" }}>
                    <div className="smooth-dnd-container vertical">
                        {sections.map((section) => (
                            <div key={section.id} style={{ display: "flex", alignItems: "center" }}>
                                <input
                                    placeholder={`Section Name`}
                                    className='section-name'
                                    value={section.text}
                                    readOnly
                                    onClick={() => handleSectionClick(section)}
                                />
                            </div>
                        ))}
                    </div>
                    <div style={{ width: "50%", height: "25px", marginTop: "20px" }}>
                        <button
                            type="button"
                            className="_root_19cba_1 _ghost_19cba_92 _default_19cba_124 _medium_19cba_47 _button-medium_17kh3_169"
                            data-test="shared-element__button"
                            onClick={addSection}
                        >
                            New section
                        </button>
                    </div>
                </div>
                <div className="right-container" style={{  width: "70%", height: "auto" }}>
                    {selectedSection ? (
                        <>
                            <Section
                                section={selectedSection}
                                onDelete={handleDeleteSection}
                                onUpdate={handleUpdateSection}
                            />
                        </>
                    ) : (
                        <div>Select a section to see its details</div>
                    )}
                </div>
            </div>

            <div className="bottom-buttons-group col-6" style={{ display: "flex", gap: "10px", marginLeft: "10px", marginBottom: "20px" }}>
                <button type="submit" className="btn1 col-2" onClick={saveOrganizerTemp}>
                    Save
                </button>
                <button type="reset" onClick={handleCancel} className="btn2 col-2">
                    Cancel
                </button>
            </div>
            <ToastContainer />
        </div>
    );
}

export default OrganizerTempUpdate;
