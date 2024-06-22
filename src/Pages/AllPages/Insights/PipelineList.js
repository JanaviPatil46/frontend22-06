import React, { useEffect, useState, useRef } from 'react';
import './pipelinelist.css';
import { Link, useParams } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Select, { components } from 'react-select';
import { BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import makeAnimated from "react-select/animated";
import Priority from '../../../Components/Templates/priority.js';
import Switch from "react-switch";
import DatePicker from 'react-datepicker'; // Import date picker
import 'react-datepicker/dist/react-datepicker.css'; // Import date picker stylesheet
import { SlQuestion } from "react-icons/sl";
import { ToastContainer, toast } from 'react-toastify';
import { useDrag, DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios from 'axios';
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { EditorState, convertToRaw, ContentState, Modifier } from "draft-js";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { RiDeleteBin5Line } from 'react-icons/ri';
import { differenceInMinutes, differenceInHours, differenceInDays } from 'date-fns';
import { useNavigate } from 'react-router-dom';
// import { RiDeleteBin6Line } from "react-icons/ri";
const PipelineList = () => {
    const [startsin, setstartsin] = useState("");
    const [startsinduration, setstartsinduration] = useState("");
    const [duein, setduein] = useState("");
    const [dueinduration, setdueinduration] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [dueDate, setDueDate] = useState(null);
    const [absoluteDate, setAbsoluteDates] = useState(false);
    const [pipelinedata, setpipelinedata] = useState([]);
    const [selectedpipeline, setSelectedPipeline] = useState();

  



    useEffect(() => {
        fetchPipelineData();
    }, []);

    const fetchPipelineData = async () => {
        try {
            const response = await fetch(`${API_KEY}/workflow/pipeline`);
            const data = await response.json();
            setpipelinedata(data.pipeline);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const pipelineoptions = Array.isArray(pipelinedata)
        ? pipelinedata.map((pipeline) => ({
            value: pipeline._id,
            label: pipeline.pipelineName,
        }))
        : [];

    const API_KEY = process.env.REACT_APP_API_IP;
    const [pipelineData, setPipelineData] = useState([]);
    // const [selectedpipeline, setSelectedPipeline] = useState();
    const [stages, setStages] = useState([]);
    const [selectedPipelineOption, setSelectedPipelineOption] = useState(null);
    const [isAddJobForm, setIsAddJobForm] = useState(false);

    console.log(pipelineData)
    const handleAddJobsToBoard = () => {
        setIsAddJobForm(!isAddJobForm);

    };
    const handleAddJobFormClose = () => {
        setIsAddJobForm(false);
    };

    useEffect(() => {
        const fetchPipelineData = async () => {
            try {
                const url = `${API_KEY}/workflow/pipeline/`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch pipeline data');
                }
                const data = await response.json();
                setPipelineData(data.pipeline);
            } catch (error) {
                console.error('Error fetching pipeline data:', error);
            }
        };

        fetchPipelineData();
    }, [API_KEY]);

    const [pipelineid, setpipelineid] = useState();
    const [selectedStage, setSelectedStage] = useState(null);
    const handleBoardsList = async (pipeline, stage) => {


        setSelectedPipeline(pipeline);
        setSelectedPipelineOption({ value: pipeline.pipelineName, label: pipeline.pipelineName });

        const selectedValues = (pipeline._id);
        setpipelineid(selectedValues);

        const fetchedStages = await fetchStages(pipeline._id);
        setStages(fetchedStages); // Set the fetched stages


    };

    const fetchStages = async (pipelineId) => {
        try {
            const url = `${API_KEY}/workflow/pipeline/${pipelineId}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch stages');
            }
            const data = await response.json();
            return data.pipeline.stages; // Return the fetched stages
        } catch (error) {
            console.error('Error fetching stages:', error);
            return []; // Return an empty array in case of error
        }
    };
    const stagesoptions = stages.map(stage => ({ value: stage._id, label: stage.name }));

    const handleBackToPipelineList = () => {
        setSelectedPipeline(null);
        setStages([]);
        setSelectedPipelineOption(null);
    };

    const handleSelectChange = (selectedPipelineOption) => {
        // setSelectedStage(selectedStage);
        setSelectedPipelineOption(selectedPipelineOption);
        if (selectedPipelineOption) {
            const pipeline = pipelineData.find(p => p.pipelineName === selectedPipelineOption.value);
            if (pipeline) {
                handleBoardsList(pipeline);
            }
        } else {
            handleBackToPipelineList();
        }
    };
    const handleStageChange = (selectedStage) => {
        setSelectedStage(selectedStage);
    };
    const pipelineOptions = pipelineData.map(pipeline => ({
        value: pipeline.pipelineName,
        label: pipeline.pipelineName
    }));


    //****************Accounts */
    const animatedComponents = makeAnimated();
    const [accountdata, setaccountdata] = useState([]);
    const [selectedaccount, setSelectedaccount] = useState();
    const [combinedaccountValues, setCombinedaccountValues] = useState([]);

    const handleAccountChange = (selectedOptions) => {
        setSelectedaccount(selectedOptions);
        // Map selected options to their values and send as an array
        const selectedValues = selectedOptions.map((option) => option.value);
        setCombinedaccountValues(selectedValues);
    }

    useEffect(() => {
        fetchAccountData();
    }, []);

    const fetchAccountData = async () => {
        try {

            const url = `${API_KEY}/admin/accountdetails`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch pipeline data');
            }
            const data = await response.json();
            setaccountdata(data.accounts);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // console.log(userdata);
    const accountoptions = accountdata.map((account) => ({
        value: account._id,
        label: account.accountName
    }));
    console.log(accountoptions);

    //******************************Job Template */

    const [jobtemplatedata, setjobtemplatedata] = useState([]);
    const [selectedjobtemplate, setSelectedjobtemplate] = useState();
    const [jobName, setJobName] = useState("");
    // const [jobAssignees, setJobAssignees] = useState('');
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const [userdata, setUserData] = useState([]);
    const [selecteduser, setSelectedUser] = useState();
    const [combinedValues, setCombinedValues] = useState([]);


    const handleJobTemplateChange = async (selectedOptions) => {
        setSelectedjobtemplate(selectedOptions);
        // Update job name with the selected template's name
        const selectedTemplate = jobtemplatedata.find(template => template._id === selectedOptions?.value);
        if (selectedTemplate) {
            setAbsoluteDates(selectedTemplate.
                absolutedates
            );
            setJobName(selectedTemplate.jobname);
        }
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${API_KEY}/workflow/jobtemplate/jobtemplateList/${selectedOptions.value}`,
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                const jobAssignees = response.data.jobTemplate.jobassignees.map((assignee) => ({
                    value: assignee._id,
                    label: assignee.username,
                }));
                setSelectedUser(jobAssignees);

                const selectedValues = jobAssignees.map((option) => option.value);
                setCombinedValues(selectedValues);

                const priority = response.data.jobTemplate.priority;
                // console.log(priority);
                setPriority(priority);

                const contentBlock = htmlToDraft(response.data.jobTemplate.description);
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                setEditorState(EditorState.createWithContent(contentState));



                const startdate = response.data.jobTemplate.startdate;
                // console.log(startdate);
                setStartDate(startdate);

                const enddate = response.data.jobTemplate.enddate;
                // console.log(enddate);
                setDueDate(enddate);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        fetchJobTemplateData();
    }, []);

    const fetchJobTemplateData = async () => {
        try {
            const url = `${API_KEY}/workflow/jobtemplate`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch job template data');
            }
            const data = await response.json();
            setjobtemplatedata(data.JobTemplates);






        } catch (error) {
            console.error("Error fetching job template data:", error);
        }
    };


    console.log(jobtemplatedata)

    const jobtemplateoptions = Array.isArray(jobtemplatedata)
        ? jobtemplatedata.map((jobtemplate) => ({
            value: jobtemplate._id,
            label: jobtemplate.templatename,
        })) : [];


    //****************Users */



    const handleuserChange = (selectedOptions) => {
        setSelectedUser(selectedOptions);
        // Map selected options to their values and send as an array
        const selectedValues = selectedOptions.map((option) => option.value);
        setCombinedValues(selectedValues);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const url = `${API_KEY}/common/user`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch pipeline data');
            }
            const data = await response.json();
            setUserData(data);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // console.log(userdata);
    const useroptions = userdata.map((user) => ({
        value: user._id,
        label: user.username

    }));


    // Custom styles for the select component
    const customStyles = {
        control: (provided) => ({
            ...provided,
            border: '1px solid #ced4da',
            borderRadius: '10px',
            padding: '2px 8px',
            width: '500px',
            boxShadow: 'none',
            '&:hover': {
                borderColor: '#80bdff'
            }
        }),
        input: (provided) => ({
            ...provided,
            margin: '0 2px'
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#6c757d'
        }),
        singleValue: (provided) => ({
            ...provided,
            color: '#495057'
        }),
        menu: (provided) => ({
            ...provided,
            zIndex: 2
        }),
        menuList: (provided) => ({
            ...provided,
            maxHeight: '200px'
        })
    };
    const [jobs, setJobs] = useState([]);

    // useEffect(() => {
    //     fetch(`${API_KEY}/workflow/job/joblist/list/`)
    //         .then(response => response.json())
    //         .then(data => setJobs(data.jobList))
    //         .catch(error => console.error('Error fetching data:', error));
    // }, []);
 useEffect(()=>{
    fetchJobData();
 }, [])
 const fetchJobData = async () => {
    try {

        const url = `${API_KEY}/workflow/job/joblist/list/`;
        const response = await fetch(url);
        const data = await response.json();
        setJobs(data.jobList);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
    const updateJobStage = async (stage, item) => {
        let data = JSON.stringify({
            "stageid": stage._id
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${API_KEY}/workflow/job/jobpipeline/updatestageid/${item.id}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const JobCard = ({ job, }) => {
        // console.log(job)
        const [{ isDragging }, drag] = useDrag({
            type: 'JOB_CARD', // Define the type property
            item: { id: job.id, },
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
            }),
        });
        const [isHovered, setIsHovered] = useState(false);
        const handleDelete = (_id) => {



            const requestOptions = {
                method: "DELETE",
                redirect: "follow"
            };

            fetch(`${API_KEY}/workflow/job/` + _id, requestOptions)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to delete item');
                    }
                    return response.text();
                })
                .then((result) => {
                    // console.log(result);
                    toast.success('Job deleted successfully');
                    fetchJobData();
                })
                .catch((error) => {
                    console.error(error);
                    toast.error('Failed to delete item');
                })
                // .finally(() => {
                //     setTimeout(() => {
                //         window.location.reload();
                //     }, 1000);
                // });
        };
        const formatDate = (dateString) => {
            if (!dateString) return '';
            const date = new Date(dateString);
            const options = { month: 'short', day: '2-digit', year: 'numeric' };
            return date.toLocaleDateString('en-US', options);
        };
        const startDateFormatted = formatDate(job.StartDate);
        const dueDateFormatted = formatDate(job.DueDate);
        const getPriorityStyle = (priority) => {
            switch (priority.toLowerCase()) {
                case 'urgent':
                    return { color: 'white', backgroundColor: '#0E0402', fontSize: '12px', borderRadius: '50px', padding: '3px 7px' };
                case 'high':
                    return { color: 'white', backgroundColor: '#fe676e', fontSize: '12px', borderRadius: '50px', padding: '2px 6px' }; // light red background
                case 'medium':
                    return { color: 'white', backgroundColor: '#FFC300', fontSize: '12px', borderRadius: '50px', padding: '2px 6px' }; // light orange background
                case 'low':
                    return { color: 'white', backgroundColor: '#56c288', fontSize: '12px', borderRadius: '50px', padding: '2px 6px' }; // light green background
                default:
                    return {};
            }
        };
        const [isFormOpen, setIsFormOpen] = useState(false);
        // const navigate = useNavigate();
        const [selectedStage, setSelectedStage] = useState([]);

        //get all templateName Record 
        const [JobsData, setJobsData] = useState([]);
        const [jobid, setjobid] = useState();
        // console.log(JobsData);
        const [JobDescription, setJobDescription] = useState();

        const [editorState, setEditorState] = useState(EditorState.createEmpty());
        const insertText = (text) => {
            const contentState = editorState.getCurrentContent();
            const selectionState = editorState.getSelection();
            const newContentState = Modifier.insertText(contentState, selectionState, text);
            const newEditorState = EditorState.push(editorState, newContentState, 'insert-characters');
            setEditorState(newEditorState);
        };


        //************Pipeline */

        const [pipelinedata, setpipelinedata] = useState([]);
        const [selectedpipeline, setSelectedpipeline] = useState();

        const handlePipelineChange = (selectedOptions) => {
            setSelectedpipeline(selectedOptions);

        }




        useEffect(() => {
            fetchPipelineData();
        }, []);

        const fetchPipelineData = async () => {
            try {
                const response = await fetch(`${API_KEY}/workflow/pipeline`);
                const data = await response.json();
                setpipelinedata(data.pipeline);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        const pipelineoptions = Array.isArray(pipelinedata)
            ? pipelinedata.map((pipeline) => ({
                value: pipeline._id,
                label: pipeline.pipelineName,
            }))
            : [];
        const [piplineId, setPipelineId] = useState();
        useEffect(() => {
            fetchPipelineDataid();
        }, []);
        const [setpipelineid, setpipelinedataId] = useState();
        const [stages, setstages] = useState();
        const fetchPipelineDataid = async (piplineId) => {
            try {
                const response = await fetch(`${API_KEY}/workflow/pipeline/` + piplineId);
                const data = await response.json();

                setpipelinedataId(data.pipeline);

                if (data.pipeline && data.pipeline.stages) {
                    const stagesdata = data.pipeline.stages.map(stage => ({
                        value: stage._id,
                        label: stage.name
                    }));
                    setstages(stagesdata);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        const handleEditJobCard = async (jobid) => {

            setIsFormOpen(!isFormOpen);
            setjobid(jobid)

            const response = await fetch(`${API_KEY}/workflow/job/joblist/listbyid/` + jobid);

            if (!response.ok) {
                throw new Error('Failed to fetch job data');
            }
            const data = await response.json();
            setJobsData(data.jobList);

            if (data.jobList && data.jobList.Account) {
                const accountIds = data.jobList.Account.map(account => account._id);
                //edit tag hint
                console.log(accountIds);


                const tags = data.jobList.Account[0].tags.map(tag => ({
                    value: tag._id,
                    label: tag.tagName,
                    colour: tag.tagColour,

                    customStyle: {
                        backgroundColor: tag.tagColour,
                        color: "#fff",
                        borderRadius: "8px",
                        alignItems: "center",
                        textAlign: "center",
                        marginBottom: "5px",
                        padding: "2px,8px",

                        fontSize: '10px',
                        width: `${calculateWidth(tag.tagName)}px`,
                        margin: '7px'
                    },
                }));

                setSelectedTags(tags);
            }
            setPriority(data.jobList.Priority);
            setDueDate(data.jobList.DueDate)
            setStartDate(data.jobList.StartDate)

            if (data.jobList && data.jobList.Pipeline) {
                const pipelineData = ({
                    value: data.jobList.Pipeline._id,
                    label: data.jobList.Pipeline.Name
                });
                setSelectedpipeline(pipelineData);
                setPipelineId(data.jobList.Pipeline._id)
                fetchPipelineDataid(data.jobList.Pipeline._id);
            }


            setJobDescription(data.jobList.Description);

            const contentBlock = htmlToDraft(data.jobList.Description);
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            setEditorState(EditorState.createWithContent(contentState));

            if (data.jobList && data.jobList.JobAssignee) {
                const jobAssignees = data.jobList.JobAssignee.map(assignee => ({
                    value: assignee._id,
                    label: assignee.username
                }));

                setSelectedUser(jobAssignees);
                const selectedValues = jobAssignees.map((option) => option.value);
                setCombinedValues(selectedValues);
            }



            setSelectedStage([{ label: job.Stage, value: job.Stage }]);
        };
        const handleFormClose = () => {
            setIsFormOpen(false);
        };


        const handleNewStageChange = (selectedOption) => {
            setSelectedStage(selectedOption);

        };
        const [tags, setTags] = useState([]);

        useEffect(() => {
            fetchData();
        }, []);

        const fetchData = async () => {
            try {
                const response = await fetch(`${API_KEY}/common/tag?=` + tagValues);
                const data = await response.json();
                setTags(data.tags);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        let tagValues = [];
        //  for tags
        const calculateWidth = (label) => {
            const textWidth = label.length * 8;
            return Math.min(textWidth, 200);
        };

        const tagoptions = tags.map((tag) => ({
            value: tag._id,
            label: tag.tagName,
            colour: tag.tagColour,

            customStyle: {
                backgroundColor: tag.tagColour,
                color: "#fff",
                borderRadius: "8px",
                alignItems: "center",
                textAlign: "center",
                marginBottom: "5px",
                padding: "2px,8px",

                fontSize: '10px',
                width: `${calculateWidth(tag.tagName)}px`,
                margin: '7px'
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



        const [selectedTags, setSelectedTags] = useState([]);
        const handleTagChange = (selectedOptions) => {
            setSelectedTags(selectedOptions);

            // Map selected options to their values and send as an array
            const selectedTagsValues = selectedOptions.map((option) => option.value);

            // Send selectedValues array to your backend
            console.log("Selected Values:", selectedTagsValues);
            setCombinedTagsValues(selectedTagsValues);

        };

        const handleSaveExitClick = () => {

            updatejobdata();

            console.log('Job AccountId:', job.AccountId);
            const tagvalues = selectedTags.map(item => item.value);
            console.log('Job AccountId:', tagvalues);

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                tags: combinedTagsValues,
            });

            const requestOptions = {
                method: "PATCH",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            fetch(`${API_KEY}/admin/accountdetails/${job.AccountId}`, requestOptions)
                .then((response) => response.text())
                .then((result) => console.log(result))
                .catch((error) => console.error(error));

                setIsFormOpen(false);


        }

        const handleSaveClick = () => {
            setSave(!Save)
        }
        const updatejobdata = () => {
            const rawContentState = convertToRaw(editorState.getCurrentContent());
            const htmlContent = draftToHtml(rawContentState);
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                stageid: selectedStage.value,
                jobassignees: combinedValues,
                priority: priority,
                description: htmlContent,
                startdate: startDate,
                enddate: dueDate,

            });

            // console.log(raw)

            const requestOptions = {
                method: "PATCH",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };
            console.log(jobid)
            console.log(job.AccountId)
            fetch(`${API_KEY}/workflow/job/` + jobid, requestOptions)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then((result) => {

                    // Handle success
                    toast.success("Job updated successfully");
                    fetchJobData();
                    setSaveExit(!SaveExit)
                    // window.location.reload();


                })
                .catch((error) => {
                    // Handle errors
                    console.error(error);
                    toast.error("Failed to create Job Template");
                })
        }
        const [SaveExit, setSaveExit] = useState(false);
        const [Save, setSave] = useState(false);

        const animatedComponents = makeAnimated();
        const [userdata, setUserData] = useState([]);
        const [selecteduser, setSelectedUser] = useState();
        const [combinedValues, setCombinedValues] = useState([]);
        const [combinedTagsValues, setCombinedTagsValues] = useState([]);
        const handleuserChange = (selectedOptions) => {
            setSelectedUser(selectedOptions);
            // Map selected options to their values and send as an array
            const selectedUsersValues = selectedOptions.map((option) => option.value);
            setCombinedValues(selectedUsersValues);
        }

        useEffect(() => {
            fetchuserData();
        }, []);

        const fetchuserData = async () => {
            try {
                const response = await fetch(`${API_KEY}/common/user`);
                const data = await response.json();
                // console.log(data)
                setUserData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        // console.log(userdata);
        const useroptions = userdata.map((user) => ({
            value: user._id,
            label: user.username

        }));
        const [startDate, setStartDate] = useState(null);
        const [dueDate, setDueDate] = useState(null);
        const [priority, setPriority] = useState('');
        const handlePriorityChange = (selectedOption) => {
            setPriority(selectedOption.value);
        };

        const priorityOptions = [
            { value: 'urgent', label: 'Urgent' },
            { value: 'high', label: 'High' },
            { value: 'medium', label: 'Medium' },
            { value: 'low', label: 'Low' }
        ];

        const [lastUpdatedTime, setLastUpdatedTime] = useState(new Date(job.createdAt));

        useEffect(() => {
            if (job.updatedAt) {
                setLastUpdatedTime(new Date(job.updatedAt));
            }
        }, [job.updatedAt]);

        useEffect(() => {
            const intervalId = setInterval(() => {
                setLastUpdatedTime(prevTime => new Date(prevTime)); // This will trigger re-render
            }, 1000); // Update every second

            return () => clearInterval(intervalId); // Cleanup interval on component unmount
        }, []);

        const updateLastUpdatedTime = () => {
            setLastUpdatedTime(new Date());
            console.log(new Date());
        };

        const timeAgo = () => {
            const currentTime = new Date();
            const jobTime = lastUpdatedTime;

            const minutesDiff = differenceInMinutes(currentTime, jobTime);
            const hoursDiff = differenceInHours(currentTime, jobTime);
            const daysDiff = differenceInDays(currentTime, jobTime);

            if (minutesDiff < 1) {
                return 'just now';
            } else if (minutesDiff < 60) {
                return `${minutesDiff} minute${minutesDiff === 1 ? '' : 's'} ago`;
            } else if (hoursDiff < 24) {
                return `${hoursDiff} hour${hoursDiff === 1 ? '' : 's'} ago`;
            } else {
                return `${daysDiff} day${daysDiff === 1 ? '' : 's'} ago`;
            }
        };

        const stripHtmlTags = (html) => {
            const doc = new DOMParser().parseFromString(html, 'text/html');
            return doc.body.textContent || "";
        };

        const truncateDescription = (description, maxLength = 50) => {
            if (description.length > maxLength) {
                return description.slice(0, maxLength) + '...';
            }
            return description;
        };
        const truncateName = (name) => {
            const maxLength = 20; // Adjust the maximum length as needed
            if (name.length > maxLength) {
                return name.substring(0, maxLength) + '...';
            }
            return name;
        };


        return (
            <>

                <div ref={drag} className={`job-card ${isDragging ? 'dragging' : ''}`} onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)} onDrop={updateLastUpdatedTime}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                        <p >{job.Account.join(', ')}</p>
                        {isHovered ? (
                            <RiDeleteBin5Line onClick={() => handleDelete(job.id)} />
                        ) : (
                            <span className='automation-batch'>1</span>
                        )}
                    </div>
                    <hr />
                    <div onClick={() => handleEditJobCard(job.id)}>
                        <div style={{ margin: '8px 0' }}>
                            {truncateName(job.Name)}
                        </div>
                        <div style={{ marginBottom: '8px' }}>
                            {job.JobAssignee.join(', ')}
                        </div>
                        <div style={{ marginBottom: '5px' }}>
                            {truncateDescription(stripHtmlTags(job.Description))}
                        </div>
                        <div style={{ margin: '10px 0' }}>
                            <span style={getPriorityStyle(job.Priority)}>{job.Priority}</span><br />
                        </div>
                        <div className='jobtime-created' style={{ marginBottom: '5px', marginTop: '5px', }}>
                            Starts :  {startDateFormatted}
                        </div>
                        <div className='jobtime-created' style={{ marginBottom: '5px', marginTop: '5px', }}>
                            Due : {dueDateFormatted}
                        </div>
                        <div className='jobtime-created'>
                            {timeAgo()}
                        </div>
                    </div>
                </div>
                <div className={`edit-job-container ${isFormOpen ? "edit-jobform-open" : ""}`}>
                    <div className='edit-job-header'>
                        <div >
                            <h4 >{job.Name}</h4>
                            <div > <Link to={`/accountsdash/overview/${job.AccountId}`} style={{ textDecoration: 'none', color: 'blue', fontSize: '16px', fontWeight: '600', cursor: 'pointer', marginRight: '5px' }}>{job.Account}</Link>  {timeAgo()} in the current stage</div>
                        </div>
                        {/* <span style={{ color: 'blue', fontSize: '15px', fontWeight: '600', cursor: 'pointer', marginRight: '5px' }} ></span> */}
                        <RxCross2 onClick={handleFormClose} className='form-close' />
                    </div>

                    <div className="job-from">

                        <div className='add-jobs-select-container'>
                            <div className='add-jobs-label-container'>
                                <label>Pipeline</label>
                            </div>
                            <Select className='pipeline'
                                placeholder="Pipeline"
                                options={pipelineoptions}
                                components={animatedComponents}
                                value={selectedpipeline}
                                isSearchable // Enable search
                                isClearable
                                onChange={handlePipelineChange} />
                        </div>
                        <div className='add-jobs-select-container'>
                            <div className='add-jobs-label-container'>
                                <label>Stages</label>
                            </div>
                            <Select
                                className='add-jobs-select-dropdown'
                                placeholder='Stages'
                                options={stagesoptions}
                                value={selectedStage}
                                onChange={handleNewStageChange}
                            />
                        </div>
                        <div className='add-jobs-select-container'>
                            <div className='add-jobs-label-container'>
                                <label>Account tags</label>
                            </div>
                            <Select className='account-tags'
                                options={tagoptions}
                                components={animatedComponents}
                                isMulti // Enable multi-select
                                value={selectedTags}
                                onChange={handleTagChange}
                                placeholder="Select tags..."
                                isSearchable // Enable search
                                styles={customStyles}
                            />
                        </div>
                        <div className='add-jobs-select-container'>
                            <div className='add-jobs-label-container'>
                                <label>Assignees</label>
                            </div>
                            <Select className='Assignees'
                                placeholder="Assignees"
                                options={useroptions}
                                components={animatedComponents}
                                isMulti // Enable multi-select
                                value={selecteduser}
                                isSearchable // Enable search
                                onChange={handleuserChange} />
                        </div>
                        <div className='add-jobs-select-container'>
                            <div className='add-jobs-label-container'>
                                <label>priority</label>
                            </div>
                            <Priority selectedPriority={priority} onPriorityChange={handlePriorityChange} className='priority' value={priorityOptions.find(option => option.value === priority)} />
                        </div>

                        <div style={{ border: "1px solid #fff", alignContent: 'center', marginTop: "20px", borderRadius: "12px", background: "white", width: '100%' }}>
                            <Editor editorStyle={{ height: "200px", }} editorState={editorState} wrapperClassName="demo-wrapper" editorClassName="demo-editor" onEditorStateChange={setEditorState} />
                        </div>
                        <div style={{ display: 'flex', gap: '20px', margin: '25px 0 15px 20px' }}>
                            <div>
                                <div className='label-container' >
                                    <label>Start Date</label>
                                </div>
                                <DatePicker
                                    dateFormat="MMMM-dd-yyyy"
                                    selected={startDate}
                                    onChange={date => setStartDate(date)}
                                    placeholderText="Select Start Date"
                                    className='start-date'
                                />
                            </div>

                            <div>
                                <div className='label-container' >
                                    <label>Due Date</label>
                                </div>
                                <DatePicker
                                    dateFormat="MMMM-dd-yyyy"
                                    selected={dueDate}
                                    onChange={date => setDueDate(date)}
                                    placeholderText="Select Due Date"
                                    className='due-date'

                                />
                            </div>
                        </div>




                        <div className="form-btns">
                        <button onClick={handleSaveExitClick} type="button" className="btn1" > Save & Exit</button>
                            <button onClick={handleSaveClick} type="button" className="btn1" >Save </button>
                            <button onClick={handleFormClose} type="button" className="btn2" >Cancel</button>
                           
                        </div>
                    </div>
                </div>
            </>
        );
    };

    const Stage = ({ stage, selectedPipeline, handleDrop }) => {

        const [{ isOver }, drop] = useDrop({
            accept: 'JOB_CARD',
            drop: (item, monitor) => {
                handleDrop(item.id, stage.name);
                console.log(item.id);
                console.log(stage.name);
                console.log(stage._id);
                updateJobStage(stage, item);
            },
            collect: (monitor) => ({
                isOver: !!monitor.isOver(),
            }),
        });

        // Filter jobs for the current stage
        const stageJobs = jobs.filter(job => job.Pipeline === selectedPipeline.pipelineName && job.Stage.includes(stage.name));
        // load more jobs 
        const [displayCount, setDisplayCount] = useState(5);
        const displayedJobs = stageJobs.slice(0, displayCount);
        return (
            <div ref={drop} className={`stage ${isOver ? 'drag-over' : ''}`} style={{ minWidth: '250px', }}  >

                <div className="stage-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px' }}>
                    <span>{stage.name}</span>
                    {stageJobs.length > 0 && <span>({stageJobs.length})</span>}
                </div>
                <hr />

                <div className='stage-header'>
                    <AiOutlineThunderbolt style={{ fontSize: '20px', color: 'gray', pointerEvents: 'none', }} />

                </div>
                {/* {stageJobs.map(job => (<JobCard key={job.id} job={job}
                />))} */}
                {displayedJobs.map(job => (
                    <JobCard key={job.id} job={job} />
                ))}

                {stageJobs.length > displayCount && (
                    <button onClick={() => setDisplayCount(displayCount + 5)} style={{ margin: '20px 0', marginLeft: '30%' }}>
                        Load More
                    </button>
                )}
            </div>
        );
    };


    const handleDrop = (jobId, stageName) => {
        const updatedJobs = jobs.map(job => {
            if (job.id === jobId) {
                return { ...job, Stage: [stageName] };
            }
            return job;
        });
        setJobs(updatedJobs);
        // fetchJobData();
    setTimeout(() => {
        fetchJobData();
        }, 1000);
    };
    const [priority, setPriority] = useState(" ");

    // Handler function to update state when priority changes
    const handlePriorityChange = (selectedOption) => {
        setPriority(selectedOption);
    };


    // Combine day, month, and year options
    const dayoptions = [
        { label: 'Days', value: 'Days' },
        { label: 'Months', value: 'Months' },
        { label: 'Years', value: 'Years' }
    ];

    // Handler function to update state when dropdown value changes
    const handlestartindateChange = (selectedOption) => {
        setstartsinduration(selectedOption.value);
    };

    // Handler function to update state when dropdown value changes
    const handledueindateChange = (selectedOption) => {
        setdueinduration(selectedOption.value);
    };










    const handleAbsolutesDates = (checked) => {
        setAbsoluteDates(checked)
    }
    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleDueDateChange = (date) => {
        setDueDate(date);
    };



    // console.log(combinedaccountValues)
    // console.log(selectedpipeline)
    // console.log(selectedStage)
    // console.log(selectedjobtemplate)
    // console.log(jobName)
    // console.log(combinedValues)
    // console.log(priority)

    // console.log(absoluteDate)
    // console.log(startsin)

    // console.log(startsinduration)
    // console.log(duein)
    // console.log(dueinduration)
    // console.log(startDate)
    // console.log(dueDate)
const handleClearJobForm=()=>{
    setSelectedaccount([]);
    setSelectedStage(null);
    setSelectedjobtemplate(null);
    setJobName('');
    setSelectedUser([]);
    setPriority('');
    setEditorState(EditorState.createEmpty());
    setAbsoluteDates(false);
    setDueDate(null);
    setStartDate(null);
}
    const createjobcard = () => {
        if (absoluteDate === true) {
            const rawContentState = convertToRaw(editorState.getCurrentContent());
            const htmlContent = draftToHtml(rawContentState);
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                accounts: combinedaccountValues,
                pipeline: pipelineid,

                templatename: selectedjobtemplate.value,

                jobname: jobName,
                jobassignees: combinedValues,
                priority: priority,
                stageid: selectedStage.value,

                description: htmlContent,
                absolutedates: absoluteDate,
                comments: "",
                startdate: startDate,
                enddate: dueDate,
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            };
            fetch(`${API_KEY}/workflow/job/`, requestOptions)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.text();
                })
                .then((result) => {
                    // Handle success
                    toast.success("Job added successfully");
                    setIsAddJobForm(false);
                    fetchJobData();
                    handleClearJobForm();
                    // console.log("Job Template created successfully", result);
                    // window.location.reload();
                })
                .catch((error) => {
                    // Handle errors
                    console.error("Failed to create Job Template", error);
                });
        } else if (absoluteDate === false) {
            const rawContentState = convertToRaw(editorState.getCurrentContent());
            const htmlContent = draftToHtml(rawContentState);
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                accounts: combinedaccountValues,
                pipeline: pipelineid,

                templatename: selectedjobtemplate.value,

                jobname: jobName,
                jobassignees: combinedValues,
                priority: priority,
                stageid: selectedStage.value,

                description: htmlContent,
                absolutedates: absoluteDate,
                startsin: startsin,
                startsinduration: startsinduration,
                duein: duein,
                dueinduration: dueinduration,
                comments: "",

            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            };
            const url = `${API_KEY}/workflow/job/`;
            fetch(url, requestOptions)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.text();
                })
                .then((result) => {
                    // Handle success

                    // console.log("Job Template created successfully", result);
                    // window.location.reload();

                    // Additional logic after successful creation if needed
                })
                .catch((error) => {
                    // Handle errors
                    console.error(error);
                    toast.error("Failed to create Job Template");
                });
        }
    };
    const navigate = useNavigate();
    const [openMenuId, setOpenMenuId] = useState(null);
    const toggleMenu = (_id) => {
        setOpenMenuId(openMenuId === _id ? null : _id);
    };
    const handleEdit = (_id) => {
        // Implement logic for editing here
        // console.log("Edit action triggered for template id: ", templateId);
        navigate('/firmtemplates/pipelines/PipelineTemplateUpdate/' + _id)
    };
    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <div className="pipeline-container">
                    {selectedpipeline ? (
                        <>
                            <div className="board-header">
                                <Select
                                    value={selectedPipelineOption}
                                    onChange={handleSelectChange}
                                    options={pipelineOptions}
                                    isClearable
                                    placeholder="Search pipelines..."
                                    className="pipeline-select"
                                    isSearchable

                                    styles={customStyles}
                                />
                                <button className="btn1" onClick={handleBackToPipelineList}>Back to Pipeline List</button>

                            </div>

                            <div className='board-header-second' onClick={handleAddJobsToBoard}>

                                <AiOutlinePlusCircle />
                                <span>Add Jobs</span>

                            </div>
                            <div className="boards-list">
                                {stages.map((stage, index) => (
                                    <Stage key={index} stage={stage} selectedPipeline={selectedpipeline} handleDrop={handleDrop} />
                                ))}
                            </div>

                        </>
                    ) : (
                        <>
                            <h2>Pipeline List</h2>
                            <table className="pipeline-table" style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th>PIPELINE NAME</th>
                                        <th>JOBS</th>
                                        <th>SCHEDULE</th>
                                        <th>START DATE</th>
                                        <th>END DATE</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pipelineData.map((pipeline, index) => (
                                        <tr key={index} >
                                            <td onClick={() => handleBoardsList(pipeline)} style={{ color: 'blue', cursor: 'pointer', fontWeight: '750' }} value={pipeline._id}>{pipeline.pipelineName}</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            {/* <td style={{ textAlign: 'center' }}><BsThreeDotsVertical /></td> */}
                                            <td>
                                        <div className="ci-menu-kebab" onClick={() => toggleMenu(pipeline._id)} style={{ cursor: 'pointer', fontSize: '20px' }}>
                                            &#8942;
                                        </div>
                                        {openMenuId === pipeline._id && (
                                            <div className="pipeline-menu-options">
                                                <div className="menu-option edit-option" onClick={() => handleEdit(pipeline._id)}>Edit</div>
                                                {/* <div className="menu-option delete-option" onClick={() => handleDelete(pipeline._id)}>Delete</div> */}
                                            </div>
                                        )}

                                    </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </>
                    )}
                </div>
                <div className={`addjob-form-container ${isAddJobForm ? "job-form-open" : ""}`}>
                    <div className="job-header_title">
                        <h3>Add job to {selectedpipeline ? selectedpipeline.pipelineName : ''} </h3>
                        <RxCross2 onClick={handleAddJobFormClose} style={{ cursor: 'pointer' }} />
                    </div>
                    <div className='job-from'>
                        <div className='add-jobs-select-container'>
                            <div className='add-jobs-label-container'>
                                <label>Accounts</label>
                            </div>
                            <Select className='add-jobs-select-dropdown'
                                placeholder="Accounts"
                                options={accountoptions}
                                components={animatedComponents}
                                isMulti // Enable multi-select
                                value={selectedaccount}
                                isSearchable // Enable search
                                onChange={handleAccountChange} />
                        </div>
                        <div className='add-jobs-select-container'>
                            <div className='add-jobs-label-container'>
                                <label>Stages</label>
                            </div>
                            <Select
                                className='add-jobs-select-dropdown'
                                placeholder='Stages'
                                options={stagesoptions}
                                value={selectedStage}
                                onChange={handleStageChange}
                            />
                        </div>


                        <div className='add-jobs-select-container'>
                            <div className='add-jobs-label-container'>
                                <label>Template</label>
                            </div>
                            <Select className='add-jobs-select-dropdown'
                                placeholder="Template"
                                options={jobtemplateoptions}
                                components={animatedComponents}
                                value={selectedjobtemplate}
                                isSearchable // Enable search
                                isClearable
                                onChange={handleJobTemplateChange} />
                        </div>
                        <div>
                            <label style={{ fontSize: '14px' }}>Name</label>
                            <input
                                type='text'
                                className='job-input'
                                value={jobName} // Use job name as the value for the input field
                                onChange={(e) => setJobName(e.target.value)} // Optionally, enable editing of job name
                            />
                        </div>
                        <div className='add-jobs-select-container'>
                            <div className='add-jobs-label-container'>
                                <label>Job Assignees</label>
                            </div>
                            <Select className='Assignees'
                                placeholder="Assignees"
                                options={useroptions}
                                components={animatedComponents}
                                isMulti // Enable multi-select
                                value={selecteduser}
                                isSearchable // Enable search
                                onChange={handleuserChange} />
                        </div>
                        <div className='add-jobs-select-container'>
                            <div className='add-jobs-label-container'>
                                <label>Priority</label>
                            </div>
                            <Priority onPriorityChange={handlePriorityChange} className='add-jobs-select-dropdown' selectedPriority={priority} />
                        </div>
                        <div style={{ marginTop: '20px', }}>

                            <Editor editorStyle={{ height: "250px" }}
                                editorState={editorState}
                                onEditorStateChange={setEditorState}
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"

                            />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                            <h3>Start and Due Date</h3>
                            <div className="add-jobs-switch-container" style={{ marginTop: '10px' }}>
                                <Switch
                                    onChange={handleAbsolutesDates}
                                    checked={absoluteDate}
                                    onColor="#3A91F5"
                                    onHandleColor="#FFF"
                                    handleDiameter={10}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    height={20}
                                    width={32}
                                    className="add-jobs-react-switch"
                                />
                                <span className="add-jobs-switch-label" style={{ cursor: "pointer" }}>Absolutes Dates</span>
                            </div>

                        </div>
                        {!absoluteDate && (
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className='col-2'> <p>Starts In </p>
                                        <SlQuestion style={{ color: 'blue' }} />
                                    </div>
                                    <div className='col-5'>
                                        <input type='text' className='date-input' placeholder='0' onChange={(e) => setstartsin(e.target.value)} />
                                    </div>
                                    <div className='col-5'>
                                        <Select className='add-jobs-select-dropdown ' options={dayoptions}
                                            onChange={handlestartindateChange} />
                                    </div>

                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '20px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className='col-2'> <p>Due In </p>
                                        <SlQuestion style={{ color: 'blue' }} />
                                    </div>
                                    <div className='col-5'>
                                        <input type='text' className='date-input' placeholder='0' onChange={(e) => setduein(e.target.value)} />
                                    </div>
                                    <div className='col-5'>
                                        <Select className='add-jobs-select-dropdown '
                                            options={dayoptions}
                                            onChange={handledueindateChange} />
                                    </div>

                                </div>
                            </div>
                        )}
                        <div>
                            {absoluteDate && (
                                <div style={{ display: 'flex', gap: '5px', }}>
                                    <div className='col-6' >
                                        <label style={{ fontSize: '14px' }}>Start Date</label>
                                        <div>
                                            <DatePicker
                                                selected={startDate}
                                                onChange={handleStartDateChange}
                                                className="date-picker-input "
                                                placeholderText='Start Date'
                                            />
                                        </div>

                                    </div>
                                    <div className='col-6'>
                                        <label style={{ fontSize: '14px' }}>Due Date</label>
                                        <div>
                                            <DatePicker selected={dueDate} onChange={handleDueDateChange} className="date-picker-input " placeholderText='Due Date' />
                                        </div>

                                    </div>
                                </div>


                            )}

                        </div>
                        <div>
                            <button onClick={createjobcard} className='btn1'>Save</button>
                            <button className='btn2' onClick={handleAddJobFormClose}>Cancel</button>
                        </div>

                    </div>
                </div>
                <ToastContainer />

            </DndProvider>
        </>
    );
};

export default PipelineList;