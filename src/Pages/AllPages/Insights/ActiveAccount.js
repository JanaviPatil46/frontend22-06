import React, { useState, useEffect } from "react";
import './activeaccount.css'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useParams, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

const ActiveAccount = () => {

  const { _id, token } = useParams();
  console.log(_id)
  console.log(token)
  const API_KEY = process.env.REACT_APP_API_IP;
  const navigate = useNavigate();

  useEffect(() => {
    fetchidwiseData();
  }, []);

  const [values, setValues] = useState();
  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setCPassShow] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  //get id wise template Record 

  const fetchidwiseData = async () => {
    try {
      const url = `${API_KEY}/admin/teammember/${_id}`;
      console.log(url)
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();

      setValues(data.teamMember)
      setFirstName(data.teamMember.firstName)
      setMiddleName(data.teamMember.middleName)
      setLastName(data.teamMember.lastName)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword, confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    validatePassword(password, newConfirmPassword);
  };

  const validatePassword = (newPassword) => {
    // Check if newPassword is defined before performing operations
    if (typeof newPassword !== 'undefined') {
      // Example validation criteria: password length >= 8 characters, contains at least one number and one letter
      const hasNumber = /\d/.test(newPassword);
      const hasLetter = /[a-zA-Z]/.test(newPassword);
      const isValid = newPassword.length >= 8 && hasNumber && hasLetter;
      setPasswordValid(isValid);
    }
  };

  const [firstNameValidation, setFirstNameValidation] = useState('');
  const [lastNameValidation, setLastNameValidation] = useState('');
  const [passwordValidation, setPasswordValidation] = useState('');
  const [confirmPasswordValidation, setConfirmPasswordValidation] = useState('');

  const submitvalidation = async (e) => {
    e.preventDefault();
    // Validation for First Name
    if (firstName === "") {
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
    if (password === "") {
      setPasswordValidation("Password is compalsary");
    } else {
      setPasswordValidation("");
    }

    // Validation for Phone Number
    if (confirmPassword === "") {
      setConfirmPasswordValidation("Confirm Password is compalsary");
    } else {
      setConfirmPasswordValidation("");
    }

    // If all validations pass, proceed to next step
    if (firstName && lastName && password && confirmPassword) {
      UserValidToken()
    }
  };

  const UserValidToken = async () => {
    validatePassword();
    const url = `${API_KEY}/common/resetpassword/verifytoken/`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    });

    const data = await res.json();
    console.log(data)
    if (data.message === "Access granted") {
      console.log("userVerify")
      const id = data.user.id;
      console.log(id)
      handleSubmit();
    } else if (data.message === "Invalid token") {

      toast.error('Time Expired!');
      //ToDo send to resetpasswordlink
    }
  }

  const handleSubmit = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      password: password,
      cpassword: confirmPassword
    });

    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    console.log(raw)
    fetch(`http://127.0.0.1:8080/admin/teammember/${_id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        // Show success toast
        toast.success("Team Member activated successfully!");
        console.log(result);
         setTimeout(() => { navigate("/login"); }, 1000);

      })
      .catch((error) => {
        // Show error toast
        toast.error("Failed to activate Team Member. Please try again.");
        console.error(error);
      });
  }



  return (
    <div className="overlay">
      <div className="overlay-form-container">
        <div className='active-form-header'>
          <h3>Set up your account</h3>
        </div>

        <form className='active-form'>
          <p>To activate your account, please fill in the requested information</p>
          <div className='active-names'>
            <div>
              <label className="form-label">First Name</label>
              <input value={firstName}
                onChange={e => setFirstName(e.target.value)}
                type="text"
                required
                placeholder="First name"
              />
              <div style={{ color: 'red', fontSize: "9px" }}>{firstNameValidation}</div>
            </div>
            <div>
              <label className="form-label">Middle Name</label>
              <input value={middleName}
                onChange={e => setMiddleName(e.target.value)}
                type="text"
                required
                placeholder="Middle name"
              />

            </div>
            <div>
              <label htmlFor="email" className="form-label">Last Name</label>
              <input value={lastName}
                onChange={e => setLastName(e.target.value)}
                type="text"
                required
                placeholder="Last name"
              />
              <div style={{ color: 'red', fontSize: "9px" }}>{lastNameValidation}</div>
            </div>
          </div>
          <div className='active-password'>
            <div style={{ position: "relative" }}>
              <label htmlFor="password">Password</label>
              <input
                type={!passShow ? "password" : "text"}
                name="password"
                id="password"
                placeholder="Enter Your password"
                style={{ padding: "8px 12px", width: "100%", border: "2px solid rgb(100, 149, 237)", borderRadius: "10px", margin: "10px 0" }}
                onChange={handlePasswordChange}
              />
              <div style={{ position: "absolute", top: "65%", transform: "translateY(-50%)", right: "20px", cursor: "pointer" }} onClick={() => setPassShow(!passShow)}>
                {!passShow ? <FaEyeSlash /> : <FaEye />}
              </div>
              <div style={{ color: 'red', fontSize: "9px" }}>{passwordValidation}</div>
            </div>
            <div style={{ position: "relative" }}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type={!cpassShow ? "password" : "text"}
                name="cpassword"
                id="cpassword"
                placeholder="Confirm password"
                style={{ padding: "8px 12px", width: "100%", border: "2px solid rgb(100, 149, 237)", borderRadius: "10px", margin: "10px 0" }}
                onChange={handleConfirmPasswordChange}
              />
              <div style={{ position: "absolute", top: "65%", transform: "translateY(-50%)", right: "20px", cursor: "pointer" }} onClick={() => setCPassShow(!cpassShow)}>
                {!cpassShow ? <FaEyeSlash /> : <FaEye />}
              </div>
              <div style={{ color: 'red', fontSize: "9px" }}>{confirmPasswordValidation}</div>
            </div>
            <div className="password-validation-checklist">
              <p>Your password must contain:</p>
              <ul>
                <li className={password.length >= 8 ? "valid" : ""}>
                  <IoIosCheckmarkCircleOutline className="check-icon" /> Minimum 8 characters
                </li>
                <li className={/\d/.test(password) ? "valid" : ""}>
                  <IoIosCheckmarkCircleOutline className="check-icon" /> At least one number
                </li>
                <li className={/[a-zA-Z]/.test(password) ? "valid" : ""}>
                  <IoIosCheckmarkCircleOutline className="check-icon" /> At least one letter
                </li>

              </ul>
            </div>
          </div>
          <div style={{ float: 'right', padding: '20px 0' }}>
            <button type="submit" className="btn1" onClick={submitvalidation} >Submit</button>
          </div>

        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ActiveAccount;


