import React, { useState, useContext, useEffect,useRef } from "react";
import "./my_account.css";
import { LuPenLine } from "react-icons/lu";
import user from "../../../Static/Images/users2.jpg";
import { RxCross2 } from "react-icons/rx";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Switch from "react-switch";
import { SlQuestion } from "react-icons/sl";
import { Link } from "react-router-dom";
import Select from "react-select";
import { LoginContext } from "../../../Components/ContextProvider/Context";
import { ToastContainer, toast } from "react-toastify";

const My_Account = () => {
  //********************************** */
  const API_KEY = process.env.REACT_APP_API_IP;
  const [showSaveButtons, setShowSaveButtons] = useState(false);
  const [showUpdatePassButton, setShowUpdatePassButton] = useState(false);
  const [newPasShow, setNewPassShow] = useState(false);
  const[passShow, setPassShow]= useState(false);
  const [cpassShow, setCPassShow] = useState(false);
  const { logindata } = useContext(LoginContext);
  const [userdata, setuserdata] = useState();
  const [admindata, setadmindata] = useState();
  const [isEditable, setIsEditable] = useState(false);
  const [isLoginEditable, setIsLoginEditable] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [signedtime, setSignedTime] = useState("");

  useEffect(() => {
    fetchData();
  }, []);


  const formatTimePeriod = (seconds) => {
    if (seconds < 3600) {
      return `${Math.ceil(seconds / 60)} minutes`;
    } else {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      return minutes > 0 ? `${hours} hours ${minutes} minutes` : `${hours} hours`;
    }
  };

  const fetchData = async () => {
    try {
      const url = `${API_KEY}/common/user/${logindata.user.id}`;
      const response = await fetch(url);
      const data = await response.json();

      const validTime = (logindata.user.exp - logindata.user.iat);
      setSignedTime(formatTimePeriod(validTime));


      setuserdata(data);
      fetchAdminData(data.email);
      fetchNotificationData(logindata.user.id)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchAdminData = async (email) => {
    try {
      const url = `${API_KEY}/admin/adminsignup/adminbyemail/${email}`;
      const response = await fetch(url);
      const data = await response.json();

      setadmindata(data.admin[0]);
      console.log(data.admin[0]);
      setFirstName(data.admin[0].firstName);
      setMiddleName(data.admin[0].middleName);
      setLastName(data.admin[0].lastName);
      setPhoneNumber(data.admin[0].phoneNumber);
      setEmail(data.admin[0].email);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSaveButtonClick = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      firstName: firstName,
      middleName: middleName,
      lastName: lastname,
      phoneNumber: phonenumber,
    });

    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const url = `${API_KEY}/admin/adminsignup/${admindata._id}`;
    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        toast.success("Data updated successful!");
        // window.location.reload();
        fetchAdminData();
        setIsEditable(false);
        setShowSaveButtons(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred!");
      });
  };

  //******************* */

  const handleEditClick = () => {
    setIsEditable(true);
    setShowSaveButtons(true);
  };
  const handleCancelButtonClick = () => {
    setShowSaveButtons(false);
    setIsEditable(false);
  };
  const [showAlert, setShowAlert] = useState(false);

  // Function to toggle the alert box
  const toggleAlert = () => {
    setShowAlert(!showAlert);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  const handleAuthentication = () => {
    setShowAlert(!showAlert);

  };
  const [isChecked, setIsChecked] = useState(false);
  const [isPaymentsChecked, setIsPaymentsChecked] = useState(false);
  const [isOrganizersChecked, setIsOrganizersChecked] = useState(false);
  const [isUploadsChecked, setIsUploadsChecked] = useState(false);
  const [isSignaturesChecked, setIsSignaturesChecked] = useState(false);
  const [isApprovalsChecked, setIsApprovalsChecked] = useState(false);
  const [isUploadingChecked, setIsUploadingChecked] = useState(false);
  const [isTasksChecked, setIsTasksChecked] = useState(false);
  const [isMessagesChecked, setIsMessagesChecked] = useState(false);
  const [isNewEmailChecked, setIsNewEmailChecked] = useState(false);
  const [isProposalsChecked, setIsProposalsChecked] = useState(false);
  const [isJobsChecked, setIsJobsChecked] = useState(false);
  const [isMentionsChecked, setIsMentionsChecked] = useState(false);
  const [isSmsChecked, setIsSmsChecked] = useState(false);
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isPaymentsEmailChecked, setIsPaymentsEmailChecked] = useState(false);
  const [isOrganizersEmailChecked, setIsOrganizersEmailChecked] = useState(false);
  const [isUploadsEmailChecked, setIsUploadsEmailChecked] = useState(false);
  const [isSignaturesEmailChecked, setIsSignaturesEmailChecked] = useState(false);
  const [isApprovalsEmailChecked, setIsApprovalsEmailChecked] = useState(false);
  const [isUploadingEmailChecked, setIsUploadingEmailChecked] = useState(false);
  const [isTasksEmailChecked, setIsTasksEmailChecked] = useState(false);
  const [isMessagesEmailChecked, setIsMessagesEmailChecked] = useState(false);
  const [isNewEmailEmailChecked, setIsNewEmailEmailChecked] = useState(false);
  const [isProposalsEmailChecked, setIsProposalsEmailChecked] = useState(false);
  const [isJobsEmailChecked, setIsJobsEmailChecked] = useState(false);
  const [isMentionsEmailChecked, setIsMentionsEmailChecked] = useState(false);
  const [isSmsEmailChecked, setIsSmsEmailChecked] = useState(false);

  const options = [
    { value: "en", label: "English" },
    { value: "fr", label: "French" },
    { value: "es", label: "Spanish" },
    { value: "de", label: "German" },
    { value: "it", label: "Italian" },
    { value: "pt", label: "Portuguese" },
    { value: "ru", label: "Russian" },
    { value: "zh", label: "Chinese" },
    { value: "ja", label: "Japanese" },
    { value: "ko", label: "Korean" },
    // Add more languages as needed
  ];







  const isCheckedRef = useRef(isChecked);
  const isPaymentsCheckedRef = useRef(isPaymentsChecked);
  const isEmailCheckedRef = useRef(isChecked);
  const isPaymentsEmailCheckedRef = useRef(isPaymentsChecked);
  const isOrganizersCheckedref = useRef(isOrganizersChecked);
  const isOrganizersEmailCheckedRef = useRef(isOrganizersEmailChecked);
  const isUploadsCheckedref = useRef(isUploadsChecked);
  const isUploadsEmailCheckedRef = useRef(isUploadsEmailChecked);
  const isSignaturesCheckedref = useRef(isSignaturesChecked);
  const isSignaturesEmailCheckedRef = useRef(isSignaturesEmailChecked);
  const isApprovalsCheckedref = useRef(isApprovalsChecked);
  const isApprovalsEmailCheckedRef = useRef(isApprovalsEmailChecked);
  const isUploadingCheckedref = useRef(isUploadingChecked);
  const isUploadingEmailCheckedRef = useRef(isUploadingEmailChecked);
  const isTasksCheckedref = useRef(isTasksChecked);
  const isTasksEmailCheckedRef = useRef(isTasksEmailChecked);
  const isMessagesCheckedref = useRef(isMessagesChecked);
  const isMessagesEmailCheckedRef = useRef(isMessagesEmailChecked);
  const isNewEmailCheckedref = useRef(isNewEmailChecked);
  const isNewEmailEmailCheckedRef = useRef(isNewEmailEmailChecked);
  const isProposalsCheckedref = useRef(isProposalsChecked);
  const isProposalsEmailCheckedRef = useRef(isProposalsEmailChecked);
  const isJobsCheckedref = useRef(isJobsChecked);
  const isJobsEmailCheckedRef = useRef(isJobsEmailChecked);
  const isMentionsCheckedref = useRef(isMentionsChecked);
  const isMentionsEmailCheckedRef = useRef(isMentionsEmailChecked);
  const isSmsCheckedref = useRef(isSmsChecked);
  const isSmsEmailCheckedRef = useRef(isSmsEmailChecked);

  useEffect(() => { isCheckedRef.current = isChecked; }, [isChecked]);
  useEffect(() => { isPaymentsCheckedRef.current = isPaymentsChecked; }, [isPaymentsChecked]);
  useEffect(() => { isEmailCheckedRef.current = isEmailChecked; }, [isEmailChecked]);
  useEffect(() => { isPaymentsEmailCheckedRef.current = isPaymentsEmailChecked; }, [isPaymentsEmailChecked]);
  useEffect(() => { isOrganizersCheckedref.current = isOrganizersChecked; }, [isOrganizersChecked]);
  useEffect(() => { isOrganizersEmailCheckedRef.current = isOrganizersEmailChecked; }, [isOrganizersEmailChecked]);
  useEffect(() => { isUploadsCheckedref.current = isUploadsChecked; }, [isUploadsChecked]);
  useEffect(() => { isUploadsEmailCheckedRef.current = isUploadsEmailChecked; }, [isUploadsEmailChecked]);
  useEffect(() => { isSignaturesCheckedref.current = isSignaturesChecked; }, [isSignaturesCheckedref]);
  useEffect(() => { isSignaturesEmailCheckedRef.current = isSignaturesEmailChecked; }, [isSignaturesEmailChecked]);
  useEffect(() => { isApprovalsCheckedref.current = isApprovalsChecked; }, [isApprovalsChecked]);
  useEffect(() => { isApprovalsEmailCheckedRef.current = isApprovalsEmailChecked; }, [isApprovalsEmailChecked]);
  useEffect(() => { isUploadingCheckedref.current = isUploadingChecked; }, [isUploadingChecked]);
  useEffect(() => { isUploadingEmailCheckedRef.current = isUploadingEmailChecked; }, [isUploadingEmailChecked]);
  useEffect(() => { isTasksCheckedref.current = isTasksChecked; }, [isTasksChecked]);
  useEffect(() => { isTasksEmailCheckedRef.current = isTasksEmailChecked; }, [isTasksEmailChecked]);
  useEffect(() => { isMessagesCheckedref.current = isMessagesChecked; }, [isMessagesChecked]);
  useEffect(() => { isMessagesEmailCheckedRef.current = isMessagesEmailChecked; }, [isMessagesEmailChecked]);
  useEffect(() => { isNewEmailCheckedref.current = isNewEmailChecked; }, [isNewEmailChecked]);
  useEffect(() => { isNewEmailEmailCheckedRef.current = isNewEmailEmailChecked; }, [isNewEmailEmailChecked]);
  useEffect(() => { isProposalsCheckedref.current = isProposalsChecked; }, [isProposalsChecked]);
  useEffect(() => { isProposalsEmailCheckedRef.current = isProposalsEmailChecked; }, [isProposalsEmailChecked]);
  useEffect(() => { isJobsCheckedref.current = isJobsChecked; }, [isJobsChecked]);
  useEffect(() => { isJobsEmailCheckedRef.current = isJobsEmailChecked; }, [isJobsEmailChecked]);
  useEffect(() => { isMentionsCheckedref.current = isMentionsChecked; }, [isMentionsChecked]);
  useEffect(() => { isMentionsEmailCheckedRef.current = isMentionsEmailChecked; }, [isMentionsEmailChecked]);
  useEffect(() => { isSmsCheckedref.current = isSmsChecked; }, [isSmsChecked]);
  useEffect(() => { isSmsEmailCheckedRef.current = isSmsEmailChecked; }, [isSmsEmailChecked]);

  const handleCheckboxChange = () => {
    setIsChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isCheckedRef.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    setTimeout(() => { NotificationUpdate(); }, 0);
  };
  const handlePaymentsCheckboxChange = () => {
    // setIsPaymentsChecked(!isPaymentsChecked);
    setIsPaymentsChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isPaymentsCheckedRef.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    setTimeout(() => { NotificationUpdate(); }, 0);
  };
  const handleOrganizersCheckboxChange = () => {
    // setIsOrganizersChecked(!isOrganizersChecked);
    setIsOrganizersChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isOrganizersCheckedref.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    setTimeout(() => { NotificationUpdate(); }, 0);
  };
  const handleUploadsCheckboxChange = () => {
    // setIsUploadsChecked(!isUploadsChecked);
    setIsUploadsChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isUploadsCheckedref.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    setTimeout(() => { NotificationUpdate(); }, 0);
  };
  const handleSignaturesCheckboxChange = () => {
    // setIsSignaturesChecked(!isSignaturesChecked);
    setIsSignaturesChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isSignaturesCheckedref.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    setTimeout(() => { NotificationUpdate(); }, 0);
  };
  const handleApprovalsCheckboxChange = () => {
    // setIsApprovalsChecked(!isApprovalsChecked);
    setIsApprovalsChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isApprovalsCheckedref.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    setTimeout(() => { NotificationUpdate(); }, 0);
  };
  const handleUploadingCheckboxChange = () => {
    // setIsUploadingChecked(!isUploadingChecked);
    setIsUploadingChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isUploadingCheckedref.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    setTimeout(() => { NotificationUpdate(); }, 0);
  };
  const handleTasksCheckboxChange = () => {
    // setIsTasksChecked(!isTasksChecked);
    setIsTasksChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isTasksCheckedref.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    setTimeout(() => { NotificationUpdate(); }, 0);
  };
  const handleMessagesCheckboxChange = () => {
    // setIsMessagesChecked(!isMessagesChecked);
    setIsMessagesChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isMessagesCheckedref.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    setTimeout(() => { NotificationUpdate(); }, 0);
  };
  const handleNewEmailCheckboxChange = () => {
    // setIsNewEmailChecked(!isNewEmailChecked);
    setIsNewEmailChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isNewEmailCheckedref.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    setTimeout(() => { NotificationUpdate(); }, 0);
  };
  const handleProposalsCheckboxChange = () => {
    // setIsProposalsChecked(!isProposalsChecked);
    setIsProposalsChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isProposalsCheckedref.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    setTimeout(() => { NotificationUpdate(); }, 0);
  };
  const handleJobsCheckboxChange = () => {
    // setIsJobsChecked(!isJobsChecked);
    setIsJobsChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isJobsCheckedref.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    setTimeout(() => { NotificationUpdate(); }, 0);
  };
  const handleMentionsCheckboxChange = () => {
    // setIsMentionsChecked(!isMentionsChecked);
    setIsMentionsChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isMentionsCheckedref.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    setTimeout(() => { NotificationUpdate(); }, 0);
  };
  const handleSmsCheckboxChange = () => {
    // setIsSmsChecked(!isSmsChecked);
    setIsSmsChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isSmsCheckedref.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    setTimeout(() => { NotificationUpdate(); }, 0);
  };

  const handleEmailCheckboxChange = () => {
    // setIsEmailChecked(!isEmailChecked);
    setIsEmailChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isEmailCheckedRef.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    setTimeout(() => { NotificationUpdate(); }, 0);

  };
  const handlePaymentsEmailCheckboxChange = () => {
    // setIsPaymentsEmailChecked(!isPaymentsEmailChecked);
    setIsPaymentsEmailChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isPaymentsEmailCheckedRef.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    setTimeout(() => { NotificationUpdate(); }, 0);

  };
  const handleOrganizersEmailCheckboxChange = () => {
    // setIsOrganizersEmailChecked(!isOrganizersEmailChecked);
    setIsOrganizersEmailChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isOrganizersEmailCheckedRef.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    setTimeout(() => { NotificationUpdate(); }, 0);
  };
  const handleUploadsEmailCheckboxChange = () => {
    // setIsUploadsEmailChecked(!isUploadsEmailChecked);
    setIsUploadsEmailChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isUploadsEmailCheckedRef.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    setTimeout(() => { NotificationUpdate(); }, 0);
  };
  const handleSignaturesEmailCheckboxChange = () => {
    // setIsSignaturesEmailChecked(!isSignaturesEmailChecked);
    setIsSignaturesEmailChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isSignaturesEmailCheckedRef.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    setTimeout(() => { NotificationUpdate(); }, 0);
  };
  const handleApprovalsEmailCheckboxChange = () => {
    // setIsApprovalsEmailChecked(!isApprovalsEmailChecked);
    setIsApprovalsEmailChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isApprovalsEmailCheckedRef.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    setTimeout(() => { NotificationUpdate(); }, 0);
  };
  const handleUploadingEmailCheckboxChange = () => {
    setIsUploadingEmailChecked(!isUploadingEmailChecked);
    setIsUploadingEmailChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isUploadingEmailCheckedRef.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    setTimeout(() => { NotificationUpdate(); }, 0);
  };
  const handleTasksEmailCheckboxChange = () => {
    // setIsTasksEmailChecked(!isTasksEmailChecked);
    setIsTasksEmailChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isTasksEmailCheckedRef.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    setTimeout(() => { NotificationUpdate(); }, 0);
  };
  const handleMessagesEmailCheckboxChange = () => {
    // setIsMessagesEmailChecked(!isMessagesEmailChecked);
    setIsMessagesEmailChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isMessagesEmailCheckedRef.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    setTimeout(() => { NotificationUpdate(); }, 0);

  };
  const handleNewEmailEmailCheckboxChange = () => {
    // setIsNewEmailEmailChecked(!isNewEmailEmailChecked);
    setIsNewEmailEmailChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isNewEmailEmailCheckedRef.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    setTimeout(() => { NotificationUpdate(); }, 0);
  };
  const handleProposalsEmailCheckboxChange = () => {
    // setIsProposalsEmailChecked(!isProposalsEmailChecked);
    setIsProposalsEmailChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isProposalsEmailCheckedRef.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    setTimeout(() => { NotificationUpdate(); }, 0);
  };
  const handleJobsEmailCheckboxChange = () => {
    // setIsJobsEmailChecked(!isJobsEmailChecked);
    setIsJobsEmailChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isJobsEmailCheckedRef.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    setTimeout(() => { NotificationUpdate(); }, 0);
  };
  const handleMentionsEmailCheckboxChange = () => {
    // setIsMentionsEmailChecked(!isMentionsEmailChecked);
    setIsMentionsEmailChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isMentionsEmailCheckedRef.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    setTimeout(() => { NotificationUpdate(); }, 0);
  };
  const handleSmsEmailCheckboxChange = () => {
    // setIsSmsEmailChecked(!isSmsEmailChecked);
    setIsSmsEmailChecked((prevChecked) => {
      const newChecked = !prevChecked;
      isSmsEmailCheckedRef.current = newChecked; // Update the ref with the new value
      return newChecked;
    });
    setTimeout(() => { NotificationUpdate(); }, 0);
  };


//********Notification changed update */


const NotificationUpdate = () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    userId: logindata.user.id,
    notifications: [
      { notificationDescription: "Invoices", inbox: isCheckedRef.current, email: isEmailCheckedRef.current },
      { notificationDescription: "Payments", inbox: isPaymentsCheckedRef.current, email: isPaymentsEmailCheckedRef.current },
      { notificationDescription: "Organizers", inbox: isOrganizersCheckedref.current, email: isOrganizersEmailCheckedRef.current },
      { notificationDescription: "Uploads", inbox: isUploadsCheckedref.current, email: isUploadsEmailCheckedRef.current },
      { notificationDescription: "E-signatures", inbox: isSignaturesCheckedref.current, email: isSignaturesEmailCheckedRef.current },
      { notificationDescription: "Approvals", inbox: isApprovalsCheckedref.current, email: isApprovalsEmailCheckedRef.current },
      { notificationDescription: "Done uploading", inbox: isUploadingCheckedref.current, email: isUploadingEmailCheckedRef.current },
      { notificationDescription: "Tasks", inbox: isTasksCheckedref.current, email: isTasksEmailCheckedRef.current },
      { notificationDescription: "Messages", inbox: isMessagesCheckedref.current, email: isMessagesEmailCheckedRef.current },
      { notificationDescription: "New mail", inbox: isNewEmailCheckedref.current, email: isNewEmailEmailCheckedRef.current },
      { notificationDescription: "Proposals", inbox: isProposalsCheckedref.current, email: isProposalsEmailCheckedRef.current },
      { notificationDescription: "Jobs", inbox: isJobsCheckedref.current, email: isJobsEmailCheckedRef.current },
      { notificationDescription: "Mentions", inbox: isMentionsCheckedref.current, email: isMentionsEmailCheckedRef.current },
      { notificationDescription: "SMS", inbox: isSmsCheckedref.current, email: isSmsEmailCheckedRef.current }
    ],
    "active": true
  });
  console.log(raw)
  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  console.log(notificationdata)

  const url = `${API_KEY}/admin/notification/${notificationdata._id}`;
  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result)
      if (result && result.message === "Notification updated successfully") {
        toast.success("Notification settings updated successfully");
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1000);
      } else {
        toast.error(result.message || "Failed to update Notification");
      }

    })
    .catch((error) => console.error(error));
}


const [notificationdata, setNotificationData] = useState()

  const fetchNotificationData = async (id) => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    const url = `${API_KEY}/admin/notification/notificationbyuser/${id}`;
    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }
      const result = await response.text();
      const notification = JSON.parse(result);
      setNotificationData(notification.notification)

      if (notification && Array.isArray(notification.notification.notifications)) {
        notification.notification.notifications.forEach((notif) => {
          switch (notif.notificationDescription) {
            case "Invoices":
              setIsChecked(notif.inbox);
              setIsEmailChecked(notif.email);
              break;
            case "Payments":
              setIsPaymentsChecked(notif.inbox);
              setIsPaymentsEmailChecked(notif.email);
              break;
            case "Organizers":
              setIsOrganizersChecked(notif.inbox);
              setIsOrganizersEmailChecked(notif.email);
              break;
            case "Uploads":
              setIsUploadsChecked(notif.inbox);
              setIsUploadsEmailChecked(notif.email);
              break;
            case "E-signatures":
              setIsSignaturesChecked(notif.inbox);
              setIsSignaturesEmailChecked(notif.email);
              break;
            case "Approvals":
              setIsApprovalsChecked(notif.inbox);
              setIsApprovalsEmailChecked(notif.email);
              break;
            case "Done uploading":
              setIsUploadingChecked(notif.inbox);
              setIsUploadingEmailChecked(notif.email);
              break;
            case "Tasks":
              setIsTasksChecked(notif.inbox);
              setIsTasksEmailChecked(notif.email);
              break;
            case "Messages":
              setIsMessagesChecked(notif.inbox);
              setIsMessagesEmailChecked(notif.email);
              break;
            case "New mail":
              setIsNewEmailChecked(notif.inbox);
              setIsNewEmailEmailChecked(notif.email);
              break;
            case "Proposals":
              setIsProposalsChecked(notif.inbox);
              setIsProposalsEmailChecked(notif.email);
              break;
            case "Jobs":
              setIsJobsChecked(notif.inbox);
              setIsJobsEmailChecked(notif.email);
              break;
            case "Mentions":
              setIsMentionsChecked(notif.inbox);
              setIsMentionsEmailChecked(notif.email);
              break;
            case "SMS":
              setIsSmsChecked(notif.inbox);
              setIsSmsEmailChecked(notif.email);
              break;
            default:
              console.error("Unknown notification type:", notif.notificationDescription);
          }
        });
      } else {
        console.error("Notifications array is not defined or not an array");
      }
    } catch (error) {
      console.error("Error fetching notification data:", error);
    }
  };




  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedLanguage(selectedOption);
  };

  const [userUpdate, setUserUpdate] = useState();
  const handleUpdatePasswordClick = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: email,
      password: password
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    const url = `${API_KEY}/common/user/verifyuserandpassword/`;
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.user)
        setUserUpdate(result.user);

        toast("User Verified successfully.")
        setShowAlert(false);
        setIsLoginEditable(true);
        setShowUpdatePassButton(true);
        // setShowAlert(false);
        // updatePassword(result.user._id )
      })
      .catch((error) => {
        console.error(error)
      });

  }
  console.log(userUpdate);
  const updatePassword = () => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("id", userUpdate._id);

    // myHeaders.append("Authorization", token);

    // console.log(token)
    const raw = JSON.stringify({
      password: password,
    });

    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    const baseUrl = `${API_KEY}/common/user/password/updateuserpassword/`;

    const url = new URL(baseUrl);

    // url.searchParams.append("id", id);
    // url.searchParams.append("token", token);


    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then((result) => {
        toast("Password Updated successfully.");
        setIsLoginEditable(false);
        setPassword('');
        setCpassword('');
        // Handle success, if needed
      })
      .catch((error) => {
        console.error("Error updating password:", error.message);
        // Handle error, if needed
      });
  }



  return (
    <>
      <div>
        <h1>Account settings</h1>
      </div>
      <div className="account-settings">
        <div className="accounts-details-user">
          <div className="details-section-one">
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className="hr">

                <h4 style={{ marginBottom: "10px" }}>Personal details</h4>
              </div>
              <div className="user-profile-container">
                <img src={user} alt="" className="user-profile-image" style={{ width: "40px", height: "40px", borderRadius: "50%", marginTop: "25px" }} />
              </div>
              <div className="hr">
                <LuPenLine style={{ float: "right", marginBottom: "10px", cursor: "pointer" }} onClick={handleEditClick} />
              </div>
            </div>

            <div className="contact-details">
              <div style={{ display: "flex", gap: "10px" }}>
                <div>
                  <label>First Name</label>
                  <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="First Name" disabled={!isEditable} />
                </div>

                <div>
                  <label>Middle Name</label>
                  <input value={middleName} onChange={(e) => setMiddleName(e.target.value)} type="text" placeholder="Middle Name" disabled={!isEditable} />
                </div>
                <div>
                  <label>Last Name</label>
                  <input value={lastname} onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Last Name" disabled={!isEditable} />
                </div>
              </div>
              <div>
                <label>Phone Number</label>
                <div>
                  <input value={phonenumber} onChange={(e) => setPhoneNumber(e.target.value)} type="text" placeholder="Phone Number" style={{ width: "32%" }} disabled={!isEditable} />
                </div>
              </div>
            </div>
            {showSaveButtons && (
              <div className="save-btns-info">
                <button className="btn1" onClick={handleSaveButtonClick}>
                  Save
                </button>
                <button className="btn2" onClick={handleCancelButtonClick}>
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="login-details-user">
            <div className="login-header">
              <h4>Login details</h4>
              <LuPenLine onClick={toggleAlert} style={{ cursor: "pointer" }} />

              {showAlert && (
                <div className="overlay">
                  <div className="overlay-login-container">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <h4>Authentication</h4>
                      <RxCross2 onClick={handleCloseAlert} />
                    </div>
                    <hr style={{ margin: "15px 0" }} />
                    <div>
                      <p>In order to change your login details you must provide your current password.</p>
                    </div>
                    <div className="password-input" style={{ display: "flex", flexDirection: "column", position: "relative", marginTop: "3%" }}>
                      <label htmlFor="password">Password</label>

                      <div className="inputfield-container">
                        <input type={!passShow ? "password" : "text"} placeholder="Enter Your Password" name="password" id="password" style={{ padding: "8px 12px", width: "100%", border: "2px solid rgb(100, 149, 237)", borderRadius: "10px", margin: "10px 0" }} />
                        <div className="showpass" onClick={() => setPassShow(!passShow)} style={{ position: "absolute", top: "65%", transform: "translateY(-50%)", right: "20px", cursor: "pointer" }}>
                          {!passShow ? <FaEyeSlash /> : <FaEye />}
                        </div>
                      </div>
                    </div>
                    <div>
                      {" "}
                      <NavLink to="/forgotpass" href="#" style={{ color: "rgb(100, 149, 237)", textDecoration: "none" }}>
                        Forgot Password?
                      </NavLink>
                    </div>
                    <div>
                      {/* <button className="btn1" onClick={handleSubmitLoginDetails}>Submit</button> */}
                      <button className="btn1" onClick={handleUpdatePasswordClick}> Submit </button>
                      <button className="btn2" onClick={handleCloseAlert}>
                        Cancle
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="hr" style={{ marginTop: "10px" }}></div>
            <div style={{ marginTop: "15px" }}>
              <div>
                <label>Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" disabled={true} />
              </div>
              <div style={{ display: "flex", gap: "25px" }}>
                <div className="form-password " style={{ width: '50%' }}>
                  <div className="password-input" style={{ display: "flex", flexDirection: "column", position: "relative" }}>
                    <label htmlFor="password">Password</label>
                    <input type={!newPasShow ? "password" : "text"} value={password} onChange={(e) => setPassword(e.target.value)} disabled={!isLoginEditable} name="password" id="password" placeholder="password" style={{ padding: "8px 12px", width: "100%", border: "2px solid rgb(100, 149, 237)", borderRadius: "10px", margin: "10px 0" }} />
                    <div style={{ position: "absolute", top: "70%", transform: "translateY(-50%)", right: "20px", cursor: "pointer" }} onClick={() => setNewPassShow(!newPasShow)}>
                      {!newPasShow ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>
                </div>
                <div className="formpassword " style={{ width: '50%' }}>
                  <div className="password-input" style={{ display: "flex", flexDirection: "column", position: "relative" }}>
                    <label htmlFor="confirmPassword">Confirm Password</label>

                    <input type={!cpassShow ? "password" : "text"} value={cpassword} onChange={(e) => setCpassword(e.target.value)} name="cpassword" id="cpassword" placeholder="Confirm password" disabled={!isLoginEditable} style={{ padding: "8px 12px", width: "100%", border: "2px solid rgb(100, 149, 237)", borderRadius: "10px", margin: "10px 0" }} />
                    <div style={{ position: "absolute", top: "70%", transform: "translateY(-50%)", right: "20px", cursor: "pointer" }} onClick={() => setCPassShow(!cpassShow)}>
                      {!cpassShow ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label>Stay signed in for</label>
                <input value={signedtime} onChange={(e) => setSignedTime(e.target.value)} type="text" placeholder="Stay signed in for" disabled={true} />
              </div>
              {showUpdatePassButton && (
                <button onClick={updatePassword}>Update Password</button>
              )}

            </div>
          </div>
          <div className="authentication">
            <div className="authentication-header">
              <h4>Two-factor authentication</h4>
            </div>
            <div className="hr" style={{ marginTop: "10px" }}></div>
            <div style={{ display: "flex", gap: "10px", marginTop: "25px", cursor: "pointer", alignItems: "center" }}>
              <Switch
                onChange={handleAuthentication}
                // checked={showAlert}
                onColor="#3A91F5"
                onHandleColor="#FFF"
                handleDiameter={10}
                uncheckedIcon={false}
                checkedIcon={false}
                height={20}
                width={32}
                className="react-switch"
              />
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <p onClick={handleAuthentication}>Turn on two-factor authencation</p>
                <SlQuestion style={{ color: "blue" }} />
              </div>
            </div>
          </div>
        </div>

        {/* notifications */}
        <div className="notifiaction-details">
          <div className="preferences">
            <div className="preferences-header">
              <h4>Notification preferences</h4>
              <SlQuestion style={{ color: "blue" }} />
            </div>
            <div className="hr" style={{ marginTop: "10px" }}></div>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr" }}>
              <div>
                <div style={{ padding: "20px" }}></div>
                <hr />
                <div className="lists">
                  <div style={{ margin: "10px 0" }}>
                    <p>Invoices</p>
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0" }}>
                    <p>Payments</p>
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0" }}>
                    <p>Organizers</p>
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0" }}>
                    <p>Documents</p>
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0 10px 15px" }}>
                    <p>Uploads</p>
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0 10px 15px" }}>
                    <p>E-signatures</p>
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0 10px 15px" }}>
                    <p>Approvals</p>
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0 10px 15px" }}>
                    <p>"Done uploading"</p>
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0" }}>
                    <p>Tasks</p>
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0" }}>
                    <p>Messages</p>
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0" }}>
                    <p>New mail</p>
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0" }}>
                    <p>Proposals</p>
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0" }}>
                    <p>Jobs</p>
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0" }}>
                    <p>Mentions</p>
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0" }}>
                    <p>SMS</p>
                  </div>
                  <hr />
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ padding: "10px" }}>INBOX+</div>
                <hr />
                <div className="lists">
                  <div style={{ margin: "10px 0" }}>
                    <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0" }}>
                    <input type="checkbox" checked={isPaymentsChecked} onChange={handlePaymentsCheckboxChange} />
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0" }}>
                    <input type="checkbox" checked={isOrganizersChecked} onChange={handleOrganizersCheckboxChange} />
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0", padding: "10px" }}></div>
                  <hr />
                  <div style={{ margin: "10px 0" }}>
                    <input type="checkbox" checked={isUploadsChecked} onChange={handleUploadsCheckboxChange} />
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0" }}>
                    <input type="checkbox" checked={isSignaturesChecked} onChange={handleSignaturesCheckboxChange} />
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0" }}>
                    <input type="checkbox" checked={isApprovalsChecked} onChange={handleApprovalsCheckboxChange} />
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0" }}>
                    <input type="checkbox" checked={isUploadingChecked} onChange={handleUploadingCheckboxChange} />
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0" }}>
                    <input type="checkbox" checked={isTasksChecked} onChange={handleTasksCheckboxChange} />
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0" }}>
                    <input type="checkbox" checked={isMessagesChecked} onChange={handleMessagesCheckboxChange} />
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0" }}>
                    <input type="checkbox" checked={isNewEmailChecked} onChange={handleNewEmailCheckboxChange} />
                  </div>
                  <hr />

                  <div style={{ margin: "10px 0" }}>
                    <input type="checkbox" checked={isProposalsChecked} onChange={handleProposalsCheckboxChange} />
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0" }}>
                    <input type="checkbox" checked={isJobsChecked} onChange={handleJobsCheckboxChange} />
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0" }}>
                    <input type="checkbox" checked={isMentionsChecked} onChange={handleMentionsCheckboxChange} />
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0" }}>
                    <input type="checkbox" checked={isSmsChecked} onChange={handleSmsCheckboxChange} />
                  </div>
                  <hr />
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ padding: "10px" }}>EMAIL</div>
                <hr />
                <div className="lists">
                  <div style={{ margin: "10px 0" }}>
                    <input type="checkbox" checked={isEmailChecked} onChange={handleEmailCheckboxChange} />
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0" }}>
                    <input type="checkbox" checked={isPaymentsEmailChecked} onChange={handlePaymentsEmailCheckboxChange} />
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0" }}>
                    <input type="checkbox" checked={isOrganizersEmailChecked} onChange={handleOrganizersEmailCheckboxChange} />
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0", padding: "10px" }}></div>
                  <hr />
                  <div style={{ margin: "10px 0" }}>
                    <input type="checkbox" checked={isUploadsEmailChecked} onChange={handleUploadsEmailCheckboxChange} />
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0" }}>
                    <input type="checkbox" checked={isSignaturesEmailChecked} onChange={handleSignaturesEmailCheckboxChange} />
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0" }}>
                    <input type="checkbox" checked={isApprovalsEmailChecked} onChange={handleApprovalsEmailCheckboxChange} />
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0" }}>
                    <input type="checkbox" checked={isUploadingEmailChecked} onChange={handleUploadingEmailCheckboxChange} />
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0" }}>
                    <input type="checkbox" checked={isTasksEmailChecked} onChange={handleTasksEmailCheckboxChange} />
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0" }}>
                    <input type="checkbox" checked={isMessagesEmailChecked} onChange={handleMessagesEmailCheckboxChange} />
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0" }}>
                    <input type="checkbox" checked={isNewEmailEmailChecked} onChange={handleNewEmailEmailCheckboxChange} />
                  </div>
                  <hr />

                  <div style={{ margin: "10px 0" }}>
                    <input type="checkbox" checked={isProposalsEmailChecked} onChange={handleProposalsEmailCheckboxChange} />
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0" }}>
                    <input type="checkbox" checked={isJobsEmailChecked} onChange={handleJobsEmailCheckboxChange} />
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0" }}>
                    <input type="checkbox" checked={isMentionsEmailChecked} onChange={handleMentionsEmailCheckboxChange} />
                  </div>
                  <hr />
                  <div style={{ margin: "10px 0" }}>
                    <input type="checkbox" checked={isSmsEmailChecked} onChange={handleSmsEmailCheckboxChange} />
                  </div>
                  <hr />
                </div>
              </div>
            </div>
          </div>
          <div className="emailsyns">
            <div>
              <h4>Email Sync</h4>
            </div>
            <div className="hr" style={{ marginTop: "10px" }}></div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "20px" }}>
              <p>Sync your existing email with TaxDome — all your client messages in one place.</p>
              <SlQuestion style={{ color: "blue" }} />
            </div>
            <div style={{ marginTop: "25px" }}>
              <div>
                <label>Email for sync</label>
                <input type="text" placeholder="First Name" />
              </div>
              <div>
                <button className="btn1">Sync your email</button>
              </div>
            </div>
          </div>
          <div className="emailsyns" style={{ marginTop: "20px" }}>
            <div>
              <h4>Download Windows app</h4>
            </div>
            <div className="hr" style={{ marginTop: "10px" }}></div>
            <div style={{ marginTop: "20px" }}>
              <p>TaxDome Windows App help</p>
              <Link to="#">https://help.taxdome.com/article/164-taxdome-windows-application</Link>
            </div>
          </div>
          <div className="emailsyns">
            <div>
              <h4>International settings</h4>
            </div>
            <div className="hr" style={{ marginTop: "10px" }}></div>
            <div style={{ marginTop: "20px" }}>
              <label>System Language</label>
              <div style={{ marginTop: "10px" }}>
                <Select value={selectedLanguage} onChange={handleChange} options={options} placeholder="Select a language" />
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default My_Account;
