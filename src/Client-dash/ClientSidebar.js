import React, { useEffect, useState, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import "../Components/Sidebar/sidebar.css";
import { FaAngleLeft, FaAngleDown, FaAngleUp, FaBars,  FaSun } from "react-icons/fa";
import Companylogo from "../Static/Images/logo.svg";
import { menuItems } from "./ClinentSidebarData";

// import Switch from "react-switch";
import { LoginContext } from "../../src/Components/ContextProvider/Context"
import { useNavigate } from "react-router-dom";
// import NewSidebar from "./NewSidebar";
import { IoSearch } from "react-icons/io5";
import { FiPlusCircle } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
//import CreateContact from "../../Pages/AllPages/Insights/Contact";
//import CreateAccount from "../../Pages/AllPages/Insights/CreateAccount";
import user from '../Static/Images/user.jpeg'
import Cookies from "js-cookie";
import { AiOutlineLogout } from "react-icons/ai";
import { CgDarkMode } from "react-icons/cg";
import { toast, ToastContainer } from "react-toastify";

function Sidebar() {
  const API_KEY = process.env.REACT_APP_API_IP;
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    setOpenSubMenu(null);
  };
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const toggleSubMenu = (index) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };


  //Logout

  const { logindata, setLoginData } = useContext(LoginContext);

  const history = useNavigate();

  const logoutuser = async () => {
    console.log("logout");
    let token = localStorage.getItem("usersdatatoken");
    const url = `${API_KEY}/common/login/logout/`;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    const res = await fetch(url, requestOptions);
    const data = await res.json();

    if (data.status === 200) {
      console.log("user logout");
      localStorage.removeItem("usersdatatoken");
      Cookies.remove("userToken");
      setLoginData(false);

      history("/clientlogin");
    } else {
      console.log("error");
    }
  };

  const [theme, setTheme] = useState("light-theme");
  const toggleTheme = () => {
    if (theme === "dark-theme") {
      setTheme("light-theme");
    } else {
      setTheme("dark-theme");
    }
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const [data, setData] = useState(false);
  const [loginsData, setloginsData] = useState("");
  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");
    // Cookies.set("userToken", res.result.token); // Set cookie with duration provided
    // console.log(token);
    const url = `${API_KEY}/common/login/verifytoken/`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    //console.log(token);

    const data = await res.json();
    //console.log(data);
    if (data.message === "Invalid token") {
      // console.log("error page");
      navigate("/clientlogin");
    } else {
      console.log("user verify");
      setLoginData(data);
      setloginsData(data.user.id);
      if (data.user.role === "Client") {
        navigate("/clientDash/home");
      }
      else {
        toast.error("You are not valid user.")
        setTimeout(() => { navigate("/clientlogin"); }, 1000);
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      DashboardValid();
      setData(true);
    }, 2000);
  }, []);

  useEffect(() => {
    DashboardValid();
    setData(true);
  }, []);


  const [userData, setUserData] = useState("");
  const [username, setUsername] = useState("");

  const fetchUserData = async () => {
    const maxLength = 15;
    const myHeaders = new Headers();

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const url = `${API_KEY}/common/user/`;
    fetch(url + loginsData, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("id", result);
        if (result.email) {
          setUserData(truncateString(result.email, maxLength)); // Set a maximum length for userData if email exists
        }
        console.log(result.username)
        setUsername(result.username);
      });
  };
  const truncateString = (str, maxLength) => {
    if (str && str.length > maxLength) {
      return str.substring(0, maxLength) + "..."; // Truncate string if it exceeds maxLength
    } else {
      return str;
    }
  };
  useEffect(() => {
    fetchUserData();
  }, [loginsData]);


  const [contactForm, setContactForm] = useState(false);
  const [accountform, setAccountForm] = useState(false);
  const [isNewSidebarOpen, setIsNewSidebarOpen] = useState(false);
  const toggleNewSidebar = () => {
    setIsNewSidebarOpen(!isNewSidebarOpen);
  }; 
  const handleFormClose = () => {
    setIsNewSidebarOpen(false);
  };
  const handleAddNewCompanyClick = () => {
    setContactForm(!contactForm);
  };
  const handleAddAccount = () => {
    setAccountForm(!accountform);
  };

  const [newSearchOpen, setNewSearchOpen] = useState(false);

  const toggleNewSearch = () => {
    setNewSearchOpen(!newSearchOpen);
  };
  const handleSearchClose = () => {
    setNewSearchOpen(false);
  };
  const handleContactClose = () => {
    setContactForm(false);
  };

  return (
    <div className="grid-container">
      <header className="header">
        <div className="header-container" style={{ padding: "20px" }}>
          <div className="header-btns">
            <FiPlusCircle className="add-icon" onClick={toggleNewSidebar} />
            <IoSearch className="search-icon" onClick={toggleNewSearch} />
          </div>

          <div className={`new-sidebar-container ${isNewSidebarOpen ? "new-sidebar" : ""}`}>
            <div className="new-sidebar">
              {/* <div className="new-sidebar-header" style={{ backgroundColor: '#E5E4E2' }} >
                            <p style={{ padding: '10px' }}>New Sidebar Content</p>
                            <IoMdClose style={{ cursor: 'pointer', fontSize: '25px', margin: '5px' }} onClick={handleFormClose} />
                        </div> */}
              {/* <NewSidebar account={handleAddAccount} formclose={handleFormClose} contact={handleAddNewCompanyClick} /> */}
            </div>
          </div>
          <div className={`new-search-container ${newSearchOpen ? "new-search" : ""}`}>
            <div className="header_title">
              <button type="button" onClick={handleSearchClose}>
                <RxCross2 />
              </button>
              <div className="title">search</div>
            </div>
            <div className="content">
              <div className="company-content"></div>
            </div>
          </div>
        </div>
      </header>
      <section className={`sidebar  ${collapsed ? "collapsed" : ""}`}>
        <div className="sidebar-content" style={{ width: "230px" }}>
          <div className="toggle">
            <FaAngleLeft style={{ color: "white" }} onClick={toggleSidebar} />
          </div>
        </div>
        <div className="sidebar-content-items">
          <div className="logo-container" style={{ display: "flex", gap: "20px", margin: "25px 0 0 10px", alignItems: "center" }}>
            <span className="image">
              <img src={Companylogo} alt="" style={{ width: "40px", height: "40px" }} />
            </span>
            <div className="text hidden-text">
              <span className="name">SNP</span>

            </div>
          </div>
          <div className="sidebar-items">
            <div className="menu-bar">
              <div className="menus">
                <ul className="menu">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <div className="menu-item">
                        <Link to={item.path} className="menu-link" onClick={() => toggleSubMenu(index)}>
                          <i onClick={toggleSidebar} className="menu-icon">
                            {item.icon}
                          </i>
                          <span className="hidden-text">{item.title}</span>
                          {item.submenus && (openSubMenu === index ? <FaAngleUp className="submenu-toggle" /> : <FaAngleDown className="submenu-toggle" />)}
                        </Link>
                        {item.submenus && openSubMenu === index && (
                          <ul className="submenu">
                            {item.submenus.map((subItem, subIndex) => (
                              <li key={subIndex}>
                                <Link to={subItem.path} className="submenu-link">
                                  <i className="submenu-icon">{subItem.icon}</i>
                                  <span className="hidden-text">{subItem.title}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bottom-content">
              <ul>
                <li >
                  <Link to="#" className="logout-link" >
                    <div>
                      <img src={user} alt="user" className="user-icon" />
                    </div>

                    <span
                      className="hidden-text"

                    >
                      <b>{username}</b>
                      <h6>{userData}</h6>
                    </span>
                    <div>
                      <AiOutlineLogout className="logout-icon"  onClick={() => {
                    logoutuser();
                  }}/>
                    </div>

                  </Link>



                </li>
                <li className="theme-mode-toggle" >
                
                    <div  style={{ fontSize: "20px", display:'flex', alignItems:'center', gap:'10px' }}>{theme === "light-theme" ? <CgDarkMode  className="mode-icon" onClick={toggleTheme}/> : <FaSun className="mode-icon" onClick={toggleTheme}/>}<span className="hidden-text" style={{fontSize:'12px'}}>Client View</span></div>
                
                  
                  {/* <span style={{ fontSize: "20px" }}>{theme === "light-theme" ? <FaMoon className="mode-icon" /> : <FaSun className="mode-icon" />}</span> */}
                  {/* <span className="hidden-text" style={{ marginLeft: "15px" }}>
                    {theme === "light-theme" ? " dark-theme" : "light-theme"}
                  </span> */}
                  {/* <Switch onChange={toggleTheme} checked={theme === "dark-theme"} onColor="#007bff" offColor="#ccc" uncheckedIcon={false} checkedIcon={false} height={20} width={40} className="mode-switch" /> */}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="sidebar-toggle-btn">
          <FaBars />
        </div>
      </section>
      <main className="main" style={{ height: "92vh", overflowY: "auto" }}>
        {/* <div className={`contact-container col-4  ${contactForm ? "contact-open" : ""}`}>
          <CreateContact handleContactClose={handleContactClose} />
        </div>

       
        <div className={`account-container col-4  ${accountform ? "account-open" : ""}`}>
          <CreateAccount handleAddAccount={handleAddAccount} />
        </div> */}
        <Outlet />
      </main>
      <div className="toast">
        <ToastContainer />
      </div>
    </div>
  );
}

export default Sidebar;
