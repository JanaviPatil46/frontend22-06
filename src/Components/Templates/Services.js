
import React, { useState, useEffect } from 'react'
import { RxCross2 } from "react-icons/rx";
import Select from 'react-select';
import Switch from "react-switch";
import { IoMdArrowRoundBack } from "react-icons/io";
import './services.css'
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Services = () => {

  const [servicename, setservicename] = useState("");
  const [discription, setdiscription] = useState("");
  const [rate, setrate] = useState("")
  const API_KEY = process.env.REACT_APP_API_IP;
  const navigate = useNavigate();

  const [isServiceFormOpen, setIsServiceFormOpen] = useState(false);
  const handleServices = () => {
    setIsServiceFormOpen(!isServiceFormOpen);
  };
  const handleServiceFormClose = () => {
    setIsServiceFormOpen(false);
  };

  const [service, setService] = useState(false)

  const handleServiceWitch = (checked) => {
    setService(checked)
  }

  const [category, setCategory] = useState(false)

  const handleCategory = () => {
    setCategory(!category);
    setcategorycreate("")
  };

  const handleCategoryFormClose = () => {
    setCategory(false);
  };

  const ratetypes = [
    { value: 'Item', label: 'Item' },
    { value: 'Hour', label: 'Hour' },
  ];

  const [categoryData, setCategoryData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // const url = `${API_KEY}/common/user/`;
      const url = `${API_KEY}/workflow/category`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data)
      setCategoryData(data.category);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // console.log(userdata);
  const categoryoptions = categoryData.map((category) => ({
    value: category._id,
    label: category.categoryName,
  }));

  const createservicetemp = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      serviceName: servicename,
      description: discription,
      rate: rate,
      ratetype: selectedratetypes.value,
      tax: service,
      // category: selectedCategory.value,
      category: selectedCategory ? selectedCategory.value : null,
      active: "true"

    });
    console.log(raw)
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    const url = `${API_KEY}/workflow/servicetemplate/`;
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.message)

        if (result && result.message === "ServiceTemplate created successfully") {
          toast.success("ServiceTemplate created successfully");
          setIsServiceFormOpen(false);
          fetchServicesData();
          // setTimeout(() => {
          //   // window.location.reload();
          // }, 1000);

        } else {
          toast.error(result.message || "Failed to create Service Template");
        }
      })
      .catch((error) => {
        console.log(error)
        const errorMessage = error.response && error.response.message ? error.response.message : "Failed to create invoice";
        toast.error(errorMessage);
      });
  }

  const [selectedratetypes, setSelectedratetypes] = useState();
  const handlerangeChange = (selectedOptions) => {
    setSelectedratetypes(selectedOptions);
  }
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategory(selectedOptions);
  }


  const [categorycreate, setcategorycreate] = useState()
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


  //get all templateName Record
  const [ServiceTemplates, setServiceTemplates] = useState([]);

  // useEffect(() => {
  //   async function fetchServiceTemplates() {
  //     try {
  //       const url = `${API_KEY}/workflow/servicetemplate/`;

  //       const response = await fetch(url);
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch service templates");
  //       }
  //       const data = await response.json();
  //       setServiceTemplates(data.serviceTemplate);
  //       console.log(data);
  //     } catch (error) {
  //       console.error("Error fetching service templates:", error);
  //     }
  //   }
  //   fetchServiceTemplates();
  // }, []);


  useEffect(() => {
    fetchServicesData()
  })

  const fetchServicesData = async () => {
    try {
      const url = `${API_KEY}/workflow/servicetemplate/`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch service templates");
      }
      const data = await response.json();
      setServiceTemplates(data.serviceTemplate);
      console.log(data);
    } catch (error) {
      console.error("Error fetching service templates:", error);
    }
  };

  console.log(ServiceTemplates);

  const [openMenuId, setOpenMenuId] = useState(null);
  const toggleMenu = (_id) => {
    setOpenMenuId(openMenuId === _id ? null : _id);
  };

  const handleEdit = (_id) => {
    // Implement logic for editing here
    // console.log("Edit action triggered for template id: ", templateId);
    navigate("ServiceTemplateUpdate/" + _id);
  };

  //delete template
  const handleDelete = (_id) => {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };
    const url = `${API_KEY}/workflow/servicetemplate/`;
    fetch(url + _id, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete item");
        }
        return response.text();
      })
      .then((result) => {
        console.log(result);
        toast.success("Item deleted successfully");
        fetchServicesData();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to delete item");
      })
      // .finally(() => {
      //   setTimeout(() => {
      //     // window.location.reload();
      //   }, 1000);
      // });
  };


  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(ServiceTemplates.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, ServiceTemplates.length);
  const currentTemplates = ServiceTemplates.slice(startIndex, endIndex);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };


  return (
    <>
      <div>
        <h1>Services</h1>
      </div>
      <div className='create-service-header'>
        <div className='service-actions-btns'>
          <button className='btn1' onClick={handleServices}>Create Service</button>
        </div>
      </div>

      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentTemplates.map((template) => (
            <tr key={template._id}>
              <td onClick={() => handleEdit(template._id)} style={{ cursor: "pointer", color: "var( --text-color)", }}>
                {template.serviceName}
              </td>
              <td>
                <div className="ci-menu-kebab" onClick={() => toggleMenu(template._id)} style={{ cursor: "pointer", fontSize: "20px", }}>
                  &#8942;
                </div>
                {openMenuId === template._id && (
                  <div className="service-menu-options">
                    <div onClick={() => handleEdit(template._id)} style={{ color: "blue", cursor: "pointer" }}>
                      Edit
                    </div>
                    <div onClick={(txt) => handleDelete(template._id)} style={{ color: "red", cursor: "pointer" }}>
                      Delete
                    </div>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={`service-form-container ${isServiceFormOpen ? "service-form-open" : ""}`}>
        <div className="service_header_title">
          <h3>Create invoice</h3>
          <RxCross2 onClick={handleServiceFormClose} style={{ cursor: 'pointer', fontSize: '25px', color: 'rgb(24, 118, 211)' }} />
        </div>

        <div className='services-form'>
          <div><h3>Service </h3></div>

          <div style={{ marginTop: '30px' }}>
            <label>Service Name</label>
            <input onChange={(e) => setservicename(e.target.value)} type="text" placeholder='Service name' />
          </div>


          <div >
            <label>Description</label>
            <input onChange={(e) => setdiscription(e.target.value)} type="text" placeholder='Description' />
          </div>


          <div className='input-box-service'>
            <div>
              <label>Rate</label>
              <input onChange={(e) => setrate(e.target.value)} type='text' placeholder='Rate' />
            </div>
            <div>
              <label style={{ marginBottom: '8px' }}>Rate Type</label>
              {/* <Select placeholder='Rate Type' /> */}
              <Select className='rate-type'
                placeholder="Rate Type"
                options={ratetypes}
                value={selectedratetypes}
                isSearchable // Enable search
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
              <input className='col-10' type="text" placeholder='Category Name' value={categorycreate} onChange={(e) => setcategorycreate(e.target.value)} />

            </div>

            <div style={{ margin: '30px' }} className='create-category-btn'>

              <button className='btn1' onClick={createCategory}>Create</button>
              <button onClick={handleCategoryFormClose} className='btn2'>Cancle</button>

            </div>
          </div>
        </div>
        <div className='billing-ivoice-buttons'>
          <button onClick={createservicetemp} className='btn1'>Save</button>
          <button onClick={handleServiceFormClose} className='btn2'>Cancel</button>

        </div>
      </div>
    </>
  )
}

export default Services;





