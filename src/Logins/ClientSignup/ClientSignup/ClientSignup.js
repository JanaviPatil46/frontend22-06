
import React, { useState } from "react";
import axios from "axios";
import logo from "../../../Static/Images/logoAdmin.png";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./ClientSignup.css";
import OtpInput from "react-otp-input";


const ClientSignUp = ({ handleSignupPage }) => {

    // Setting up environment variables
    const API_KEY = process.env.REACT_APP_API_IP;
    const FAPI_KEY = process.env.REACT_APP_FAPI_IP;
    
    //todo ========    #page control  logic   No1 =======
    //!chang state for testing
    const [currentStep, setCurrentStep] = useState(1);
    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const [inpval, setInpval] = useState({
        email: "",
    });
    const setVal = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target;

        setInpval(() => {
            return {
                ...inpval,
                [name]: value,
            };
        });
    };

    //*checkbox
    const [isChecked, setIsChecked] = useState(false);
    const setValbox = (event) => {
        setIsChecked(event.target.checked);
    };

    const createAccount = async (e) => {
        e.preventDefault();
        const { email } = inpval;

        if (email === "") {
            toast.error("email is required!", {
                position: "top-center",
            });
        } else if (!email.includes("@")) {
            toast.warning("includes @ in your email!", {
                position: "top-center",
            });
        } else if (isChecked === false) {
            toast.error("Accept terms and condtion ", {
                position: "top-center",
            });
        }
        else {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const email = inpval.email;

            const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow",
            };

            // Fetch URL with environment variable
            const url = `${API_KEY}/common/user/email/getuserbyemail/`;
            console.log(url)
            fetch(url + email, requestOptions)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((result) => {
                    // Assuming result is in JSON format and contains user data
                    if (result.user.length > 0) {
                        toast.error("User with this EMail already exists", { position: "top-right" });
                        // You can also do further processing here if needed
                    } else {
                        e.preventDefault();

                        let data = JSON.stringify({
                            email: inpval.email,
                        });
                        // Fetch URL with environment variable
                        const url = `${API_KEY}/clientrequest-otp/`;
                        let config = {
                            method: "post",
                            maxBodyLength: Infinity,
                            url: url,
                            headers: {
                                "Content-Type": "application/json",
                            },
                            data: data,
                        };
                        axios
                            .request(config)
                            .then((response) => {
                                console.log(JSON.stringify(response.data));
                                //toast.success("Check your email ID for OTP", { position: "top-right" });
                                alert("Check your email ID for OTP");
                                //   setInpval({ ...inpval, email: "" });
                                setIsChecked(false);
                                nextStep();
                            })
                            .catch((error) => {
                                alert("please check your OTP");
                                console.log(error);
                            });
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                    console.log(error);
                });
        }
    };


    // ========    #Personal Details    Page:2 =======
    const [firstname, setFirstname] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [accountName, setAccountName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [firstNameValidation, setFirstNameValidation] = useState('');
    const [lastNameValidation, setLastNameValidation] = useState('');
    const [phoneNumberValidation, setPhoneNumberValidation] = useState('');

    const submitUserinfo = async (e) => {
        e.preventDefault();
        // Validation for First Name
        if (firstname === "") {
            setFirstNameValidation("First Name can't be blank");
        } else {
            setFirstNameValidation("");
        }

        // Validation for Last Name
        if (lastName === "") {
            setLastNameValidation("Last Name can't be blank");
        } else {
            setLastNameValidation("");
        }

        // Validation for Phone Number
        if (phoneNumber === "" || phoneNumber.length < 6) {
            setPhoneNumberValidation("Phone number must contain at least 6 digits, excluding the country code");
        } else {
            setPhoneNumberValidation("");
        }

        // If all validations pass, proceed to next step
        if (firstname && lastName && phoneNumber && phoneNumber.length >= 3) {
            nextStep();
        }
    };


    const handleFirstNameChange = (e) => {
        setFirstname(e.target.value);
        updateContactName();
    };

    const handleMiddleNameChange = (e) => {
        setMiddleName(e.target.value);
        updateContactName();
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
        updateContactName();
    };

    const updateContactName = () => {
        setAccountName(`${firstname} ${middleName} ${lastName}`);
    };

    //****************************case 3 */
    const [passShow, setPassShow] = useState(false);
    const [cpassShow, setCPassShow] = useState(false);

    const [inppass, setInppass] = useState({
        password: "",
        cpassword: "",
    });

    //console.log
    const setValP = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target;

        setInppass(() => {
            return {
                ...inppass,
                [name]: value,
            };
        });
    };

    const submitPassword = async (e) => {
        e.preventDefault();

        const { password, cpassword } = inppass;

        if (password === "") {
            alert("password is required!", {
                position: "top-center",
            });
        } else if (password.length < 8) {
            alert("password must be 6 char!", {
                position: "top-center",
            });
        } else if (cpassword === "") {
            alert("cpassword is required!", {
                position: "top-center",
            });
        } else if (cpassword.length < 8) {
            alert("confirm password must be 6 char!", {
                position: "top-center",
            });
        } else if (password !== cpassword) {
            alert("pass and Cpass are not matching!", {
                position: "top-center",
            });
        }
        else {
            sendOtpVerify();
        }



    };

    const [otp, setOtp] = useState("");



    //**************** set data */

    const sendOtpVerify = async (e) => {

        if (otp === "") {
            toast.error(" Verification code required! ", {
                position: "top-center",
            });
        } else {


            let data = JSON.stringify({
                email: inpval.email,
                otp: otp,
            });
            const url = `${API_KEY}/verifyclient-otp/`;

            let config = {
                method: "post",
                maxBodyLength: Infinity,
                url: url,
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            };

            axios
                .request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    if (response.data === "Email verified successfully") {
                        clientalldata()
                    }
                    else {

                    }

                })
                .catch((error) => {
                    alert("please check your OTP");
                    console.log(error);
                });
        }
    };



    //===================================================
    const clientalldata = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            email: inpval.email,
            firstName: firstname,
            middleName: middleName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            accountName: accountName,
            password: inppass.password,
            cpassword: inppass.cpassword,
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };
        console.log(raw)
        const url = `${API_KEY}/admin/clientsignup/`;

        fetch(url, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.text();
            })
            .then((result) => {
                console.log(result);
                newUser();
            })
            .catch((error) => {
                console.error(error);
                toast.error("Error signing up. Please try again.");
            });
    };


    //************************ */
    const newUser = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            username: firstname,
            email: inpval.email,
            password: inppass.password,
            role: "Client",
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };
        const url = `${API_KEY}/common/login/signup/`;
        fetch(url, requestOptions)
            .then((response) => response.text())

            .then((result) => {
                console.log(result);
                clientCreatedmail();
                handleaccountSubmit();
                // userCreatedmail();
            })

            .catch((error) => console.error(error));
    };


    //************************ */
    const clientCreatedmail = () => {

        const port = window.location.port;
        const urlportlogin = `${FAPI_KEY}:${port}/clientlogin/`;
        console.log(urlportlogin)

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const url = urlportlogin;
        const raw = JSON.stringify({
            email: inpval.email,
            url: url,
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };
        const urlusersavedmail = `${API_KEY}/clientsavedemail/`;
        fetch(urlusersavedmail, requestOptions)
            .then((response) => response.text())

            .then((result) => {
                console.log(result);
            })
            .catch((error) => console.error(error));
    };


    const handleaccountSubmit = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            clientType: "Individual",
            accountName: accountName,
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        const url = `${API_KEY}/admin/accountdetails/`;
        fetch(url, requestOptions)
            .then((response) => response.text())

            .then((result) => {
                console.log(result); // Log the result
                toast.success("Client SignUp successfully"); // Display success toast
                // window.location.reload();
            })
            .catch((error) => {
                console.error(error); // Log the error
                toast.error("An error occurred while submitting the form", error); // Display error toast
            });
    }


    const renderFormFields = () => {
        switch (currentStep) {
            //sign up
            case 1:
                return (
                    <>
                        <div className=" col-12" style={{ height: "100vh" }}>
                            <div style={{ margin: "20px" }}>
                                <img style={{ width: "30px" }} src={logo} alt="" />
                                <b>PMS Solutions</b>
                            </div>
                            <div className="col-12 case1">
                                <div className="container">
                                    <h4 style={{ color: "black" }}> </h4>
                                    <p style={{ color: "black", fontSize: "20px" }} className="subtitle">Welcome to AdminName</p>
                                    <h2 style={{ color: "black" }}> </h2>
                                    <p className="subtitle">Let's get started</p>
                                    <br />
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="email">Email:</label>
                                            <input type="email" value={inpval.email} onChange={setVal} name="email" id="email" placeholder="Enter Your Email " style={{ padding: "8px 12px", width: "100%", border: "2px solid rgb(100, 149, 237)", borderRadius: "10px", margin: "10px 0" }} />
                                        </div>

                                        <div style={{ display: "flex", alignItems: "center", width: "100%", marginTop: "10px" }}>
                                            <input type="checkbox" id="terms" onChange={setValbox} checked={isChecked} style={{ marginRight: "15px" }} />
                                            <label htmlFor="terms" style={{ color: "#696969", fontSize: "14px", marginBottom: "0" }}>
                                                I agree to the terms and conditions{" "}
                                            </label>
                                        </div>

                                        <button className="btn1" onClick={createAccount} style={{ margin: "15px 0" }}>
                                            Continue
                                        </button>

                                        <p className="sign-in-link">
                                            Already have an account?{" "}
                                            <NavLink to="/clientlogin" onClick={handleSignupPage} style={{ textDecoration: "none", color: "blue" }}>
                                                Sign in
                                            </NavLink>
                                        </p>

                                    </form>
                                </div>
                                <br />
                            </div>
                        </div>
                        <div className="toast">
                            <ToastContainer />
                        </div>
                    </>

                );

            //code confirmation

            case 2:
                return (
                    <>
                        <div className=" col-12 ">
                            <div className="top-header col-12" style={{ display: "flex" }}>
                                <div className="col-4" style={{ margin: "20px" }}>
                                    <img style={{ width: "30px" }} src={logo} alt="" />
                                    <b>PMS Solutions</b>
                                </div>
                            </div>
                            <div className=" col-12 case2">
                                <div className="container">

                                    <h4 style={{ color: "black", }}> </h4>
                                    <p style={{ color: "black", fontSize: "20px", fontWeight: 'bold' }} className="subtitle">Welcome to AdminName</p>
                                    <h3 style={{ fontSize: '15px', fontWeight: '400' }}>Some basic details about you</h3>



                                    <div style={{ marginTop: "20px", marginBottom: '20px', textAlign: "left" }}>
                                        <div>
                                            <label style={{ fontSize: "14px", }}>First Name:</label>
                                        </div>
                                        <input required className="fname" placeholder="First name" value={firstname} onChange={handleFirstNameChange} style={{ padding: "8px 12px", width: "100%", border: "2px solid rgb(100, 149, 237)", borderRadius: "10px", margin: "10px 0" }} />
                                        <div style={{ color: 'red', fontSize: "9px" }}>{firstNameValidation}</div>
                                    </div>

                                    <div style={{ marginBottom: "20px", textAlign: "left" }}>
                                        <div>
                                            <label style={{ fontSize: "14px" }}>Middle Name:</label>
                                        </div>

                                        <input required className="mname" placeholder="Middle name" value={middleName} onChange={handleMiddleNameChange} style={{ padding: "8px 12px", width: "100%", border: "2px solid rgb(100, 149, 237)", borderRadius: "10px", margin: "10px 0" }} />
                                    </div>


                                    <div style={{ marginBottom: "20px", textAlign: "left" }}>
                                        <div>
                                            <label style={{ fontSize: "14px" }}>Last Name:</label>
                                        </div>

                                        <input required className="lname" placeholder="Last name" value={lastName} onChange={handleLastNameChange} style={{ padding: "8px 12px", width: "100%", border: "2px solid rgb(100, 149, 237)", borderRadius: "10px", margin: "10px 0" }} />
                                        <div style={{ color: 'red', fontSize: "9px" }}>{lastNameValidation}</div>
                                    </div>
                                    <div style={{ marginBottom: "20px", textAlign: "left" }}>
                                        <label style={{ fontSize: "14px" }} >Account Name:</label>
                                        <input required className="accname" placeholder="Account name" value={accountName} onChange={(e) => setAccountName(e.target.value)} style={{ padding: "8px 12px", width: "100%", border: "2px solid rgb(100, 149, 237)", borderRadius: "10px", margin: "10px 0" }} />

                                    </div>
                                    <div style={{ marginBottom: "20px", textAlign: "left" }}>
                                        <label style={{ fontSize: "14px" }}>Phone Number:</label>
                                        <input required className="phoneno" placeholder="Phone No" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} style={{ padding: "8px 12px", width: "100%", border: "2px solid rgb(100, 149, 237)", borderRadius: "10px", margin: "10px 0" }} />
                                        <div style={{ color: 'red', fontSize: "9px" }}>{phoneNumberValidation}</div>
                                    </div>


                                    <button className="btn1" onClick={submitUserinfo} style={{ margin: "15px 0" }}>
                                        Continue
                                    </button>

                                    <p className="sign-in-link">
                                        Already have an account?{" "}
                                        <NavLink to="/clientlogin" onClick={handleSignupPage} style={{ textDecoration: "none", color: "blue" }}>
                                            Sign in
                                        </NavLink>
                                    </p>

                                </div>
                            </div>
                            <div className="toast">
                                <ToastContainer />
                            </div>
                        </div>
                    </>
                );

            case 3:
                return (

                    <>
                        <div className=" col-12 ">
                            <div className="top-header col-12" style={{ display: "flex" }}>
                                <div className="col-4" style={{ margin: "20px" }}>
                                    <img style={{ width: "30px" }} src={logo} alt="" />
                                    <b>PMS Solutions</b>
                                </div>
                            </div>
                            <div className=" col-12 case2">
                                <div className="container">
                                    <h4 style={{ color: "black" }}> </h4>
                                    <p style={{ color: "black", fontSize: "20px" }} className="subtitle">Welcome to AdminName</p>
                                    <h4>Enter Password</h4>


                                    <div className="password-input" style={{ display: "flex", flexDirection: "column", position: "relative" }}>
                                        <label style={{ textAlign: 'left' }} htmlFor="password">Password</label>
                                        <input type={!passShow ? "password" : "text"} onChange={setValP} value={inppass.password} name="password" id="password" placeholder="Enter Your password" style={{ padding: "8px 12px", width: "100%", border: "2px solid rgb(100, 149, 237)", borderRadius: "10px", margin: "10px 0" }} />
                                        <div style={{ position: "absolute", top: "70%", transform: "translateY(-50%)", right: "20px", cursor: "pointer" }} onClick={() => setPassShow(!passShow)}>
                                            {!passShow ? <FaEyeSlash /> : <FaEye />}
                                        </div>
                                    </div>

                                    <div className="formpassword col-12">
                                        <div className="password-input" style={{ display: "flex", flexDirection: "column", position: "relative" }}>
                                            <label style={{ textAlign: 'left' }} htmlFor="confirmPassword">Confirm Password</label>

                                            <input type={!cpassShow ? "password" : "text"} onChange={setValP} value={inppass.cpassword} name="cpassword" id="cpassword" placeholder="Confirm password" style={{ padding: "8px 12px", width: "100%", border: "2px solid rgb(100, 149, 237)", borderRadius: "10px", margin: "10px 0",marginBottom:"20px" }} />
                                            <div style={{ position: "absolute", top: "60%", transform: "translateY(-50%)", right: "20px", cursor: "pointer" }} onClick={() => setCPassShow(!cpassShow)}>
                                                {!cpassShow ? <FaEyeSlash /> : <FaEye />}
                                            </div>
                                        </div>
                                    </div>

                                    <p style={{ fontSize: "14px", margin: "3px 0",marginTop:'30px' }}>
                                        We sent a verification code to your email.Enter the code to complete signup.
                                    </p>

                                   <br />
                                    <div style={{ display: 'flex', flexWrap: 'wrap' }} className="client-signup-otp">
                                        <div className="otp-input" style={{ padding: "10px" }}>
                                            <OtpInput
                                                value={otp}
                                                onChange={setOtp}
                                                numInputs={6}
                                                renderInput={(props) => (
                                                    <input
                                                        {...props}
                                                        style={{
                                                            width: "40px", // Adjust as needed
                                                            height: "50px", // Adjust as needed
                                                            // fontSize: "30px", 
                                                            fontFamily: "Arial, sans-serif", // Replace with your desired font
                                                            // margin: "0 10px",
                                                            margin: "10px",
                                                            marginLeft: '20px',
                                                          
                                                            textAlign: "center",



                                                            // Add any other styling properties as needed
                                                        }}
                                                        className="inputs"
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <button className="btn1" onClick={submitPassword} style={{ margin: "15px 0" }}>
                                            Lets get started
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="toast">
                            <ToastContainer />
                        </div>
                    </>
                );
            default:
                return null;
        }
    }

    return <form >{renderFormFields()}</form>;
};
export default ClientSignUp;
