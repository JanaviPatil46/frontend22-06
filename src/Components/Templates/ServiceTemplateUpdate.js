import React, { useState, useEffect } from 'react'
import { RxCross2 } from "react-icons/rx";
import Select from 'react-select';
import Switch from "react-switch";
import { IoMdArrowRoundBack } from "react-icons/io";
import './services.css'
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate, useParams } from "react-router-dom";
const ServiceTemplateUpdate = () => {




    const ratetypes = [
        { value: 'Item', label: 'Item' },
        { value: 'Hour', label: 'Hour' },
    ];
    const [selectedratetypes, setSelectedratetypes] = useState();
    const handlerangeChange = (selectedOptions) => {
        setSelectedratetypes(selectedOptions);
    }
    const [service, setService] = useState(false)
    const handleServiceWitch = (checked) => {
        setService(checked)
    }

    const [categoryData, setCategoryData] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
       
            const url = `${API_KEY}/workflow/category`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data)
            setCategoryData(data.category);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const categoryoptions = categoryData.map((category) => ({
        value: category._id,
        label: category.categoryName,
    }));

    const [selectedCategory, setSelectedCategory] = useState();
    const handleCategoryChange = (selectedOptions) => {
        setSelectedCategory(selectedOptions);
    }
    const [category, setCategory] = useState(false)

    const [categorycreate, setcategorycreate] = useState()

    const handleCategory = () => {
        setCategory(!category);
        setcategorycreate("")
    };

    const handleCategoryFormClose = () => {
        setCategory(false);
    };

    // fetch 
    const navigate = useNavigate();

    const API_KEY = process.env.REACT_APP_API_IP;

    const { _id } = useParams();
    const [templateData, setTemplateData] = useState(null);
    const [ServiceName, setServiceName] = useState("");
    const [Discription, setDiscription] = useState("");
    const [Rate, setRate] = useState("")

    useEffect(() => {
        fetchidwiseData();
    }, []);

    //get id wise template Record

    const fetchidwiseData = async () => {
        try {
            // const url = `${API_KEY}/workflow/servicetemplate/`;
            const url = `${API_KEY}/workflow/servicetemplate/servicetemplatebyid/`
            const response = await fetch(url + _id);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            console.log(data)
            setTemplateData(data.serviceTemplate);
            setServiceName(data.serviceTemplate.serviceName)
            setDiscription(data.serviceTemplate.description)
            setRate(data.serviceTemplate.rate)
            setSelectedratetypes({ value: data.serviceTemplate.ratetype, label: data.serviceTemplate.ratetype });
            setService(data.serviceTemplate.tax)
            const categoryName = ({
                value: data.serviceTemplate.category._id,
                label: data.serviceTemplate.category.categoryName,
            });
            setSelectedCategory(categoryName)

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

   
    //data send
    const updateservicetemp = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            serviceName: ServiceName,
            description: Discription,
            rate: Rate,
            ratetype: selectedratetypes.value,
            tax: service,
            category: selectedCategory.value,
            active: "true"
        });
        console.log(raw)
        const requestOptions = {
            method: "PATCH",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
        const url = `${API_KEY}/workflow/servicetemplate/${templateData._id}`;
        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                toast.success("ServiceTemplate Updated successfully");
                // navigate('/services');
                // if (result && result.message === "ServiceTemplate Updated successfully") {
                //     toast.success("ServiceTemplate Updated successfully");
                //     navigate('/services')
                //     // setTimeout(() => {
                //     //     // window.location.reload();
                //     // }, 1000);

                // } else {
                //     toast.error(result.message || "Failed to update Service Template");
                // }
            })
            .catch((error) => {
                console.log(error)
                const errorMessage = error.response && error.response.message ? error.response.message : "Failed to update invoice";
                toast.error(errorMessage);
            });
    };


    const createCategory = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            categoryName: categorycreate
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
        const url = `${API_KEY}/workflow/category/`;
        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                if (result && result.message === "Category created successfully") {
                    toast.success("Category created successfully");
                    setCategory(false);
                    fetchData();
                } else {
                    toast.error(result.message || "Failed to create Service Template");
                }
            })
            .catch((error) => console.error(error));

    }


    return (
        <>

            <div className='create-service-header'>
                <div >
                    <h3>Edit job Template</h3>
                </div>
            </div>



            <div className="service_header_title">
                <h3>Create Service</h3>
                {/* <RxCross2  style={{ cursor: 'pointer', fontSize: '25px', color: 'rgb(24, 118, 211)' }} /> */}
            </div>

            <div className='services-form'>
                <div><h3>Service </h3></div>

                <div style={{ marginTop: '30px' }}>
                    <label>Service Name</label>
                    <input onChange={(e) => setServiceName(e.target.value)} value={ServiceName} type="text" placeholder='Service name' />
                </div>


                <div >
                    <label>Description</label>
                    <input onChange={(e) => setDiscription(e.target.value)} value={Discription} type="text" placeholder='Description' />
                </div>


                <div className='input-box-service'>
                    <div>
                        <label>Rate</label>
                        <input onChange={(e) => setRate(e.target.value)} value={Rate} type='text' placeholder='Rate' />
                    </div>
                    <div>
                        <label style={{ marginBottom: '8px' }}>Rate Type</label>
                        {/* <Select placeholder='Rate Type' /> */}
                        <Select className='rate-type'
                            placeholder="Rate Type"
                            options={ratetypes}
                            value={selectedratetypes}
                            isSearchable // Enable search
                            isClearable
                            onChange={handlerangeChange}
                        />
                    </div>
                </div>

                <div style={{ marginTop: '20px' }} className='service-switch'>
                    <Switch
                        onChange={handleServiceWitch}
                        checked={service}
                        onColor="#3A91F5"
                        onHandleColor="#FFF"
                        handleDiameter={10}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        height={20}
                        width={32}
                        className="job-template-react-switch"
                        label='Tax'
                    />
                    <span style={{ marginLeft: '20px' }}>Tax</span>
                </div>

            </div>
            <div className='service-category'>
                <div >
                    <h3 >Category</h3>
                </div>


                <div className='service-category-input'>
                    <div style={{ marginTop: '20px' }}>
                        <label style={{ marginBottom: '8px' }}>Category  Name</label>
                        <Select options={categoryoptions}
                            placeholder="Category Name"
                            value={selectedCategory}
                            isSearchable // Enable search
                            onChange={handleCategoryChange}
                            isClearable
                        />
                    </div>


                </div>

                <div>
                    <h4 style={{ cursor: 'pointer', color: '#1976d3', marginLeft: '30px', marginTop: '20px' }} onClick={handleCategory}>Create category</h4>
                </div>


                <div className={`category-form-container ${category ? "category-form-open" : ""}`}>

                    <div className="category-form_header_title">
                        <IoMdArrowRoundBack onClick={handleCategoryFormClose} style={{ cursor: 'pointer', fontSize: '25px', marginRight: '10px' }} />
                    </div>

                    <div style={{ margin: '30px' }}>
                        <label>Category Name</label>
                        <input type='text' className='col-10' placeholder='Category Name' value={categorycreate} onChange={(e) => setcategorycreate(e.target.value)} />
                    </div>

                    <div style={{ margin: '30px' }} className='create-category-btn'>
                        <button className='btn1' onClick={createCategory} >Create</button>
                        <button onClick={handleCategoryFormClose} className='btn2'>Cancle</button>
                    </div>
                </div>
            </div>
            <div className='billing-ivoice-buttons'>
            <Link to='/services'> <button onClick={updateservicetemp} className='btn1'>Save</button>   </Link>
                <Link to='/services'><button  className='btn2'>Cancel</button></Link>
                
            </div>
        </>
    )
}

export default ServiceTemplateUpdate

