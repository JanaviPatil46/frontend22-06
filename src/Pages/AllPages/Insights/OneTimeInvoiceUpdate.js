import React, { useState, useEffect, useRef } from 'react'
import Select from 'react-select'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { RiAddCircleLine } from "react-icons/ri";
import Switch from "react-switch";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { CiDiscount1 } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiCloseLine } from 'react-icons/ri';
import { ToastContainer, toast } from 'react-toastify';
import CreatableSelect from 'react-select/creatable';
import { Link, useNavigate, useParams } from 'react-router-dom'

// import { format } from 'date-fns';
const OneTimeInvoiceUpdate = ({ charLimit = 4000 }) => {

    const { _id } = useParams();

    const API_KEY = process.env.REACT_APP_API_IP;

    useEffect(() => {
        fetchinvoicebyid(_id);
    }, []);

    const [invoiceidetails, setinvoicedetails] = useState();

    const fetchinvoicebyid = (id) => {
      
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };
        const url = `${API_KEY}/workflow/invoice/invoicelist/invoicelistbyid/${id}`;
        console.log(url)
        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result.invoice)
                setinvoicedetails(result.invoice)
                setinvoicenumber(result.invoice.invoicenumber)
                setSelectedDate(result.invoice.invoicedate)
                const account  = ({
                    value: result.invoice.account._id ,
                    label: result.invoice.account.accountName,
                });
                setSelectedaccount(account)
                const invoicetemplate  = ({
                    value: result.invoice.invoicetemplate._id ,
                    label: result.invoice.invoicetemplate.templatename,
                });
                setSelectedInvoiceTemp(invoicetemplate)
                const paymentMethod = ({
                    value:  result.invoice.paymentMethod,
                    label:  result.invoice.paymentMethod,
                });
                setPaymentMode(paymentMethod)
                const teammember = ({
                    value:  result.invoice.teammember._id,
                    label:  result.invoice.teammember.username,
                });
                setSelectedUser(teammember)
                setInputTextValue(result.invoice.description)
                setEmailToClient(result.invoice.emailinvoicetoclient)
                setPayUsingCredits(result.invoice.payInvoicewithcredits)
                setInvoiceReminders(result.invoice.reminders)
                setScheduledInvoice(result.invoice.scheduleinvoice)
                
                const lineItems = result.invoice.lineItems.map(item => ({
                    productName: item.productorService, // Assuming productName maps to productorService
                    description: item.description,
                    rate: String(item.rate).replace('$', ''), // Removing '$' sign from rate
                    qty: item.quantity,
                    amount: String(item.amount).replace('$', ''), // Removing '$' sign from amount
                    tax: item.tax.toString() // Converting boolean to string
                }));

                 setRows(lineItems)
            })
            .catch((error) => console.error(error));
    }


    const handleFormClose = () => {
        window.location.reload();
    };

    const [payUsingCredits, setPayUsingCredits] = useState(false)

    const handlePayUsingCredits = (checked) => {
        setPayUsingCredits(checked)
    }
    const [emailToClient, setEmailToClient] = useState(false)

    const handleEmailToClient = (checked) => {
        setEmailToClient(checked)
    }
    const [invoiceReminders, setInvoiceReminders] = useState(false)

    const handleInvoiceReminders = (checked) => {
        setInvoiceReminders(checked)
    }
    const [scheduledInvoice, setScheduledInvoice] = useState(false)

    const handleScheduledInvoice = (checked) => {
        setScheduledInvoice(checked)
    }
    const paymentsOptions = [
        { value: 'template1', label: 'Bank Debits' },
        { value: 'template2', label: 'Credit Card' },
        { value: 'template3', label: 'Credit Card or Bank Debits' }
    ];
    const [selectedDate, setSelectedDate] = useState(null);
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const [inputTextValue, setInputTextValue] = useState('');
    const [charCount, setCharCount] = useState(0);

    const handleChange = (event) => {
        const value = event.target.value;
        if (value.length <= charLimit) {
            setInputTextValue(value);
            setCharCount(value.length);
        }
    };

    const [showDropdown, setShowDropdown] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredShortcuts, setFilteredShortcuts] = useState([]);
    const dropdownRef = useRef(null);
    const [selectedOption, setSelectedOption] = useState('contacts'); // Default selected option
    const [shortcuts, setShortcuts] = useState([]);
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
        setSearchTerm(''); // Clear search term when showing the dropdown
    };
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);

    };
    const handleAddShortcut = (shortcut) => {
        const updatedTextValue = inputTextValue + `[${shortcut}]`;
        setInputTextValue(updatedTextValue);
        setCharCount(updatedTextValue.length);
        setShowDropdown(false);
    };

    useEffect(() => {
        setFilteredShortcuts(shortcuts.filter(shortcut => shortcut.title.toLowerCase().includes(searchTerm.toLowerCase())));
    }, [searchTerm, shortcuts]);
    useEffect(() => {
        if (selectedOption === 'contacts') {
            // Set contact shortcuts
            const contactShortcuts = [
                { title: 'Account Shortcodes', isBold: true },
                { title: 'Account Name', isBold: false, value: 'ACCOUNT_NAME' },
                { title: 'Custom field:Website', isBold: false, value: 'ACCOUNT_CUSTOM_FIELD:Website' },
                { title: 'Contact Shortcodes', isBold: true, },
                { title: 'Contact Name', isBold: false, value: 'CONTACT_NAME' },
                { title: 'First Name', isBold: false, value: 'FIRST_NAME' },
                { title: 'Middle Name', isBold: false, value: 'MIDDLE_NAME' },
                { title: 'Last Name', isBold: false, value: 'LAST_NAME' },
                { title: 'Phone number', isBold: false, value: 'PHONE_NUMBER' },
                { title: 'Country', isBold: false, value: 'COUNTRY' },
                { title: 'Company name', isBold: false, value: 'COMPANY_NAME ' },
                { title: 'Street address', isBold: false, value: 'STREET_ADDRESS' },
                { title: 'City', isBold: false, value: 'CITY' },
                { title: 'State/Province', isBold: false, value: 'STATE / PROVINCE' },
                { title: 'Zip/Postal code', isBold: false, value: 'ZIP / POSTAL CODE' },
                { title: 'Custom field:Email', isBold: false, value: 'CONTACT_CUSTOM_FIELD:Email' },

                { title: 'Date Shortcodes', isBold: true },
                { title: 'Current day full date', isBold: false, value: 'CURRENT_DAY_FULL_DATE' },
                { title: 'Current day number', isBold: false, value: 'CURRENT_DAY_NUMBER' },
                { title: 'Current day name', isBold: false, value: 'CURRENT_DAY_NAME' },
                { title: 'Current week', isBold: false, value: 'CURRENT_WEEK' },
                { title: 'Current month number', isBold: false, value: 'CURRENT_MONTH_NUMBER' },
                { title: 'Current month name', isBold: false, value: 'CURRENT_MONTH_NAME' },
                { title: 'Current quarter', isBold: false, value: 'CURRENT_QUARTER' },
                { title: 'Current year', isBold: false, value: 'CURRENT_YEAR' },
                { title: 'Last day full date', isBold: false, value: 'LAST_DAY_FULL_DATE' },
                { title: 'Last day number', isBold: false, value: 'LAST_DAY_NUMBER' },
                { title: 'Last day name', isBold: false, value: 'LAST_DAY_NAME' },
                { title: 'Last week', isBold: false, value: 'LAST_WEEK' },
                { title: 'Last month number', isBold: false, value: 'LAST_MONTH_NUMBER' },
                { title: 'Last month name', isBold: false, value: 'LAST_MONTH_NAME' },
                { title: 'Last quarter', isBold: false, value: 'LAST_QUARTER' },
                { title: 'Last_year', isBold: false, value: 'LAST_YEAR' },
                { title: 'Next day full date', isBold: false, value: 'NEXT_DAY_FULL_DATE' },
                { title: 'Next day number', isBold: false, value: 'NEXT_DAY_NUMBER' },
                { title: 'Next day name', isBold: false, value: 'NEXT_DAY_NAME' },
                { title: 'Next week', isBold: false, value: 'NEXT_WEEK' },
                { title: 'Next month number', isBold: false, value: 'NEXT_MONTH_NUMBER' },
                { title: 'Next month name', isBold: false, value: 'NEXT_MONTH_NAME' },
                { title: 'Next quarter', isBold: false, value: 'NEXT_QUARTER' },
                { title: 'Next year', isBold: false, value: 'NEXT_YEAR' }



            ];
            setShortcuts(contactShortcuts);
        } else if (selectedOption === 'account') {
            // Set account shortcuts
            const accountShortcuts = [
                { title: 'Account Shortcodes', isBold: true },
                { title: 'Account Name', isBold: false, value: 'ACCOUNT_NAME' },
                { title: 'Custom field:Website', isBold: false, value: 'ACCOUNT_CUSTOM_FIELD:Website' },
                { title: 'Date Shortcodes', isBold: true },
                { title: 'Current day full date', isBold: false, value: 'CURRENT_DAY_FULL_DATE' },
                { title: 'Current day number', isBold: false, value: 'CURRENT_DAY_NUMBER' },
                { title: 'Current day name', isBold: false, value: 'CURRENT_DAY_NAME' },
                { title: 'Current week', isBold: false, value: 'CURRENT_WEEK' },
                { title: 'Current month number', isBold: false, value: 'CURRENT_MONTH_NUMBER' },
                { title: 'Current month name', isBold: false, value: 'CURRENT_MONTH_NAME' },
                { title: 'Current quarter', isBold: false, value: 'CURRENT_QUARTER' },
                { title: 'Current year', isBold: false, value: 'CURRENT_YEAR' },
                { title: 'Last day full date', isBold: false, value: 'LAST_DAY_FULL_DATE' },
                { title: 'Last day number', isBold: false, value: 'LAST_DAY_NUMBER' },
                { title: 'Last day name', isBold: false, value: 'LAST_DAY_NAME' },
                { title: 'Last week', isBold: false, value: 'LAST_WEEK' },
                { title: 'Last month number', isBold: false, value: 'LAST_MONTH_NUMBER' },
                { title: 'Last month name', isBold: false, value: 'LAST_MONTH_NAME' },
                { title: 'Last quarter', isBold: false, value: 'LAST_QUARTER' },
                { title: 'Last_year', isBold: false, value: 'LAST_YEAR' },
                { title: 'Next day full date', isBold: false, value: 'NEXT_DAY_FULL_DATE' },
                { title: 'Next day number', isBold: false, value: 'NEXT_DAY_NUMBER' },
                { title: 'Next day name', isBold: false, value: 'NEXT_DAY_NAME' },
                { title: 'Next week', isBold: false, value: 'NEXT_WEEK' },
                { title: 'Next month number', isBold: false, value: 'NEXT_MONTH_NUMBER' },
                { title: 'Next month name', isBold: false, value: 'NEXT_MONTH_NAME' },
                { title: 'Next quarter', isBold: false, value: 'NEXT_QUARTER' },
                { title: 'Next year', isBold: false, value: 'NEXT_YEAR' }



            ]; setShortcuts(accountShortcuts);
        }
    }, [selectedOption]);


    const [rows, setRows] = useState([
        { productName: '', description: '', rate: '$0.00', qty: '1', amount: '$0.00', tax: false, isDiscount: false }
    ]);
    const [totalAmount, setTotalAmount] = useState(0);

    const addRow = (isDiscountRow = false) => {
        const newRow = isDiscountRow
            ? { productName: '', description: '', rate: '$-10.00', qty: '1', amount: '$-10.00', tax: false, isDiscount: true }
            : { productName: '', description: '', rate: '$0.00', qty: '1', amount: '$0.00', tax: false, isDiscount: false };
        setRows([...rows, newRow]);
    };

    const deleteRow = (index) => {
        const newRows = [...rows];
        newRows.splice(index, 1);
        setRows(newRows);
    };

    const handleInputChange = (index, event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;
        const newRows = [...rows];

        if (name === 'rate' || name === 'qty') {
            newRows[index][name] = newValue;

            const rate = parseFloat(newRows[index].rate.replace('$', '')) || 0;
            const qty = parseInt(newRows[index].qty) || 0;
            const amount = (rate * qty).toFixed(2);
            newRows[index].amount = `$${amount}`;
        } else {
            newRows[index][name] = newValue;
        }

        setRows(newRows);
    };

    useEffect(() => {
        const calculateTotalAmount = () => {
            let total = 0;
            rows.forEach(row => {
                if (!row.tax) {
                    total += parseFloat(row.amount.replace('$', '')) || 0;
                }

                console.log(total)
            });
            setTotalAmount(total.toFixed(2));
        };
        calculateTotalAmount();
    }, [rows]);


    //*****************************Integration */

    const [userdata, setUserData] = useState([]);
    const [selecteduser, setSelectedUser] = useState();

    const [invoiceTempData, setInvoiceTempData] = useState([]);
    const [selectedInvoiceTemp, setSelectedInvoiceTemp] = useState();
    const [accountdata, setAccountData] = useState([]);
    const [selectedaccount, setSelectedaccount] = useState();
    const [paymentMode, setPaymentMode] = useState('');
    const [servicedata, setServiceData] = useState([]);
    const [selectedservice, setselectedService] = useState();
    const [invoicenumber, setinvoicenumber] = useState();

    useEffect(() => {
        fetchData();
        fetchinvoicetempData();
        fetchAccountData();
        fetchServiceData();
    }, []);

    const fetchData = async () => {
        try {
            const url = `${API_KEY}/common/users/roles?roles=Admin,TeamMember`;
            const response = await fetch(url);
            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const useroptions = userdata.map((user) => ({
        value: user._id,
        label: user.username,
    }));

    const handleuserChange = (selectedOptions) => {
        setSelectedUser(selectedOptions);
    };

    const fetchinvoicetempData = async () => {
        try {
            const url = `${API_KEY}/workflow/invoicetemplate`;
            const response = await fetch(url);
            const data = await response.json();
            setInvoiceTempData(data.invoiceTemplate);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const invoicetempoptions = invoiceTempData.map((invoicetemp) => ({
        value: invoicetemp._id,
        label: invoicetemp.templatename,
    }));

    const handleInvoiceTempChange = (selectedOptions) => {
        setSelectedInvoiceTemp(selectedOptions);
        fetchinvoicetempbyid(selectedOptions.value);
    };

    const fetchinvoicetempbyid = async (id) => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };
        const url = `${API_KEY}/workflow/invoicetemplate/${id}`;
        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result.invoiceTemplate)
                setInputTextValue(result.invoiceTemplate.description)
                setPayUsingCredits(result.invoiceTemplate.payInvoicewithcredits)
                setEmailToClient(result.invoiceTemplate.sendEmailWhenInvCreated)
                setInvoiceReminders(result.invoiceTemplate.sendReminderstoClients)

                const paymentMethod = ({
                    value: result.invoiceTemplate.paymentMethod,
                    label: result.invoiceTemplate.paymentMethod,
                });
                setPaymentMode(paymentMethod)
                // Assuming lineitems is an array of objects and each object matches the structure needed for rows
                console.log(result.invoiceTemplate.lineItems)
                const lineitems = result.invoiceTemplate.lineItems.map(item => ({
                    productName: item.productorService || '',
                    description: item.description || '',
                    rate: String(item.rate || '$0.00'), // Convert rate to string
                    qty: String(item.quantity || '1'), // Convert qty to string
                    amount: String(item.amount || '$0.00'), // Convert amount to string
                    tax: item.tax || false,
                    isDiscount: item.isDiscount || false
                }));
                setRows(lineitems);

            })
            .catch((error) => console.error(error));
    }

    console.log(rows)

    const fetchAccountData = async () => {
        try {
            const url = `${API_KEY}/admin/accountdetails`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data.accounts)
            setAccountData(data.accounts);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const accountoptions = accountdata.map((account) => ({
        value: account._id,
        label: account.accountName,
    }));

    const handleaccountChange = (selectedOptions) => {
        setSelectedaccount(selectedOptions);
    };

    const handlePaymentOptionChange = (selectedOption) => {
        setPaymentMode(selectedOption);
    };

    const fetchServiceData = async () => {
        try {
            const url = `${API_KEY}/workflow/servicetemplate`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data.serviceTemplate)
            setServiceData(data.serviceTemplate);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const serviceoptions = servicedata.map((service) => ({
        value: service._id,
        label: service.serviceName,
    }));

    const handleServiceChange = (index, selectedOptions) => {
        setselectedService(selectedOptions);
        fetchservicebyid(selectedOptions.value, index);
    };
    const handleServiceInputChange = (inputValue, actionMeta, index) => {
        if (actionMeta.action === 'input-change') {
            const newRows = [...rows];
            newRows[index].productName = inputValue;
            setRows(newRows);
        }
    };

    const fetchservicebyid = async (id, rowIndex) => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };
        const url = `${API_KEY}/workflow/servicetemplate/${id}`;
        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result.serviceTemplate);

                const service = Array.isArray(result.serviceTemplate) ? result.serviceTemplate[0] : result.serviceTemplate;

                const updatedRow = {
                    productName: service.serviceName || '', // Assuming serviceName corresponds to productName
                    description: service.description || '',
                    rate: service.rate ? `$${service.rate.toFixed(2)}` : '$0.00',
                    qty: '1', // Default quantity is 1
                    amount: service.rate ? `$${service.rate.toFixed(2)}` : '$0.00', // Assuming amount is calculated as rate
                    tax: service.tax || false,
                    isDiscount: false // Default value if not present in the service object
                };

                const updatedRows = [...rows];
                updatedRows[rowIndex] = { ...updatedRows[rowIndex], ...updatedRow };

                console.log(updatedRows);
                setRows(updatedRows);
            })
            .catch((error) => console.error(error));
    }

    const lineItems = rows.map(item => ({
        productorService: item.productName, // Assuming productName maps to productorService
        description: item.description,
        rate: item.rate.replace('$', ''), // Removing '$' sign from rate
        quantity: item.qty,
        amount: item.amount.replace('$', ''), // Removing '$' sign from amount
        tax: item.tax.toString() // Converting boolean to string
    }));

    const navigate = useNavigate();
    const createinvoice = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            account: selectedaccount.value,
            invoicenumber: invoicenumber,
            invoicedate: selectedDate,
            description: inputTextValue,
            invoicetemplate: selectedInvoiceTemp.value,
            paymentMethod: paymentMode.value,
            teammember: selecteduser.value,
            emailinvoicetoclient: emailToClient,
            scheduleinvoicedate: "Wed May 08 2024 00:00:00 GMT+0530 (India Standard Time)",
            scheduleinvoicetime: "12.00",
            payInvoicewithcredits: payUsingCredits,
            reminders: invoiceReminders,
            scheduleinvoice: scheduledInvoice,
            daysuntilnextreminder: "",
            numberOfreminder: "",
            lineItems: lineItems,
            summary: {
                subtotal: subtotal,
                taxRate: taxRate,
                taxTotal: taxTotal,
                total: totalAmount
            },
            active: "true"
        });

        console.log(raw)
        console.log(raw);
        const requestOptions = {
            method: "PATCH",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
        const url = `${API_KEY}/workflow/invoice/${_id}`;
        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                if (result && result.message === "Invoice Updated successfully") {
                    toast.success("Invoice Updated successfully");
                   
                    setTimeout(() => {
                        navigate('/billinginvoices/onetime');    // window.location.reload();
                    }, 1000);

                } else {
                    toast.error(result.message || "Failed to Updated InvoiceTemplate");
                }
            })
            .catch((error) => console.error(error));
    }

    console.log(selectedDate)

    const [subtotal, setSubtotal] = useState(0);
    const [taxRate, setTaxRate] = useState(0);
    const [taxTotal, setTaxTotal] = useState(0);

    const handleSubtotalChange = (event) => {
        const value = parseFloat(event.target.value) || 0;
        setSubtotal(value);
        calculateTotal(value, taxRate);
    };

    const handleTaxRateChange = (event) => {
        const value = parseFloat(event.target.value) || 0;
        setTaxRate(value);
        calculateTotal(subtotal, value);
    };

    const calculateTotal = (subtotal, taxRate) => {
        const tax = subtotal * (taxRate / 100);
        setTaxTotal(tax);
        setTotalAmount((subtotal + tax).toFixed(2));
    };
    useEffect(() => {
        const calculateSubtotal = () => {
            let subtotal = 0;

            rows.forEach(row => {

                subtotal += parseFloat(row.amount.replace('$', '')) || 0;

            });
            console.log(subtotal)
            setSubtotal(subtotal);
            calculateTotal(subtotal, taxRate);
        };
        calculateSubtotal();
    }, [rows]);



    return (
        <>
            <div className='invoice-section-one'>
                <div style={{ margin: '10px 0' }}>
                    <h2>
                        General
                    </h2>
                </div>
                <div className='input-box-one'>
                    <div>
                        <label>Account name,ID or email</label>
                        {/* <input type='text' placeholder='Start typing account name,ID or email'  /> */}
                        <Select placeholder='Start typing account name,ID or email'
                            options={accountoptions}
                            isMulti={false}// Enable multi-select
                            value={selectedaccount}
                            isSearchable // Enable search
                            isClearable
                            onChange={handleaccountChange}
                        />
                    </div>

                    <div>
                        <label style={{ marginBottom: '8px' }}>Invoice Template</label>
                        <Select placeholder='Invoice Template'
                            options={invoicetempoptions}
                            isMulti={false}// Enable multi-select
                            value={selectedInvoiceTemp}
                            isSearchable // Enable search
                            isClearable
                            onChange={handleInvoiceTempChange}
                        />
                    </div>
                </div>

                <div className='input-box-one'>
                    <div>
                        <label>Invoice Number</label>
                        <input type='text' placeholder='Invoice Number' value={invoicenumber} onChange={(e) => setinvoicenumber(e.target.value)} />
                    </div>

                    <div>
                        <label style={{ marginBottom: '8px' }}>Choose payment method</label>
                        <Select options={paymentsOptions}
                            value={paymentMode}
                            onChange={handlePaymentOptionChange}
                        />
                    </div>
                </div>

                <div className='input-box-one'>
                    <div>
                        <label >Date</label>
                        <div style={{ width: '100%' }}>
                            <DatePicker
                                id="invoice-date"
                                selected={selectedDate}
                                onChange={handleDateChange}
                                dateFormat="MMMM-dd-yyyy"
                                placeholderText="Select a date"
                            />
                        </div>
                    </div>
                    <div>
                        <label style={{ marginBottom: '8px' }}>Team member</label>
                        <Select placeholder='Team member'
                            options={useroptions}
                            isMulti={false} // Enable multi-select
                            value={selecteduser}
                            isSearchable // Enable search
                            onChange={handleuserChange}
                            isClearable
                        />
                    </div>
                </div>

                <div style={{ marginTop: '10px' }}>

                    <label>Description</label>
                    <div style={{ position: 'relative', }}>
                        <input
                            type="text"
                            value={inputTextValue}
                            onChange={handleChange}
                            placeholder="Description"
                            // placeholder={`Ent up to ${charLimit} characters`}
                            style={{ paddingRight: '40px' }}
                        />
                        <p style={{ position: 'absolute', bottom: '15px', right: '10px', color: 'gray', fontSize: '12px', margin: 0 }}>
                            {charCount}/{charLimit}
                        </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', }} onClick={toggleDropdown}>
                        <RiAddCircleLine style={{ color: 'blue', fontSize: '20px' }} />
                        <p style={{ color: 'blue', cursor: 'pointer', }}>Add Shortcuts</p>
                    </div>
                    {showDropdown && (
                        <div className="dropdown" ref={dropdownRef}>
                            <div className="search-bar" style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                                <input
                                    type="text"
                                    placeholder="Search shortcuts"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                                <button className="close-icon-email" style={{ fontSize: "20px", marginTop: '4px', border: 'none', background: 'none', color: '#007bff' }} onClick={toggleDropdown}>
                                    <IoIosCloseCircleOutline />
                                </button>
                            </div>
                            <ul className="dropdown-list">
                                {filteredShortcuts.map(shortcut => (
                                    <div key={shortcut.title}>
                                        <span
                                            style={{ fontWeight: shortcut.isBold ? 'bold' : 'normal', cursor: 'pointer' }}
                                            onClick={() => handleAddShortcut(shortcut.value)}>
                                            {shortcut.title}
                                        </span>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <div className='invoice-section-two'>
                <div style={{ margin: '20px 0 10px 0' }}>
                    <h2>Additional</h2>
                </div>
                <div className='invoice-switch'>
                    <div className="job-template-switch-container" style={{ marginTop: '10px' }}>
                        <Switch
                            onChange={handlePayUsingCredits}
                            checked={payUsingCredits}
                            onColor="#3A91F5"
                            onHandleColor="#FFF"
                            handleDiameter={10}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            height={20}
                            width={32}
                            className="job-template-react-switch"
                        />
                        <span className="job-template-switch-label" style={{ cursor: "pointer" }}>Pay invoice using client credits</span>
                    </div>
                    <div className="job-template-switch-container" style={{ marginTop: '10px' }}>
                        <Switch
                            onChange={handleEmailToClient}
                            checked={emailToClient}
                            onColor="#3A91F5"
                            onHandleColor="#FFF"
                            handleDiameter={10}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            height={20}
                            width={32}
                            className="job-template-react-switch"
                        />
                        <span className="job-template-switch-label" style={{ cursor: "pointer" }}>Email invoice to client</span>
                    </div>
                    <div className="job-template-switch-container" style={{ marginTop: '10px' }}>
                        <Switch
                            onChange={handleInvoiceReminders}
                            checked={invoiceReminders}
                            onColor="#3A91F5"
                            onHandleColor="#FFF"
                            handleDiameter={10}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            height={20}
                            width={32}
                            className="job-template-react-switch"
                        />
                        <span className="job-template-switch-label" style={{ cursor: "pointer" }}>Reminders</span>
                    </div>
                    <div className="job-template-switch-container" style={{ marginTop: '10px' }}>
                        <Switch
                            onChange={handleScheduledInvoice}
                            checked={scheduledInvoice}
                            onColor="#3A91F5"
                            onHandleColor="#FFF"
                            handleDiameter={10}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            height={20}
                            width={32}
                            className="job-template-react-switch"
                        />
                        <span className="job-template-switch-label" style={{ cursor: "pointer" }}>Scheduled invoice</span>
                    </div>

                </div>
            </div>
            <div className='invoice-section-three'>
                <div style={{ margin: '20px 0 10px 0' }}>
                    <h2>Line items</h2>
                    <p style={{ color: 'grey' }}> Client-facing itemized list of products and services</p>
                </div>

                <div>
                    <table style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th>PRODUCT OR SERVICE</th>
                                <th>DESCRIPTION</th>
                                <th>RATE</th>
                                <th>QTY</th>
                                <th>AMOUNT</th>
                                <th>TAX</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, index) => (
                                <tr key={index}>
                                    <td>

                                        {/* <Select
                      placeholder='Product or Service'
                      options={serviceoptions}
                      value={serviceoptions.find(option => option.label === row.productName)}
                      onChange={(selectedOption) => handleServiceChange(index, selectedOption)}
                      isClearable
                    /> */}
                                        {/* <Select
                      placeholder='Product or Service'
                      options={serviceoptions}
                      value={serviceoptions.find(option => option.label === row.productName) || { label: row.productName, value: row.productName }}
                      onChange={(selectedOption) => handleServiceChange(index, selectedOption)}
                      // onInputChange={(inputValue) => handleServiceInputChange(index, inputValue)}
                      isClearable
                    /> */}

                                        <CreatableSelect
                                            placeholder='Product or Service'
                                            options={serviceoptions}
                                            value={serviceoptions.find(option => option.label === row.productName) || { label: row.productName, value: row.productName }}
                                            onChange={(selectedOption) => handleServiceChange(index, selectedOption)}
                                            onInputChange={(inputValue, actionMeta) => handleServiceInputChange(inputValue, actionMeta, index)}
                                            isClearable
                                        />

                                    </td>
                                    <td><input type='text' name='description' value={row.description} onChange={(e) => handleInputChange(index, e)} style={{ border: 'none' }} placeholder='Description' /></td>
                                    <td><input type='text' name='rate' value={row.rate} onChange={(e) => handleInputChange(index, e)} style={{ border: 'none' }} /></td>
                                    <td><input type='text' name='qty' value={row.qty} onChange={(e) => handleInputChange(index, e)} style={{ border: 'none' }} /></td>
                                    <td className={row.isDiscount ? 'discount-amount' : ''}>{row.amount}</td>
                                    <td><input type='checkbox' name='tax' checked={row.tax} onChange={(e) => handleInputChange(index, e)} style={{ cursor: 'pointer' }} /></td>
                                    <td><BsThreeDotsVertical style={{ cursor: 'pointer' }} /></td>
                                    <td><RiCloseLine onClick={() => deleteRow(index)} style={{ cursor: 'pointer' }} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div onClick={() => addRow()} style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', color: 'blue', fontSize: '18px' }}>
                            <AiOutlinePlusCircle /> Line item
                        </div>
                        <div onClick={() => addRow(true)} style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', color: 'blue', fontSize: '18px' }}><CiDiscount1 /> Discount</div>
                    </div>
                </div>
            </div>
            <div className='one-time-summary'>
                <div>
                    <h2>Summary</h2>
                </div>
                <div className='summary-table'>
                    <table>
                        <thead>
                            <tr>
                                <th>SUBTOTAL</th>
                                <th>TAX RATE</th>
                                <th>TAX TOTAL</th>
                                <th>TOTAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="number"
                                        value={subtotal}
                                        onChange={handleSubtotalChange}
                                        style={{ border: 'none' }}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={taxRate}
                                        onChange={handleTaxRateChange}
                                        style={{ border: 'none' }}
                                    />%
                                </td>
                                <td>${taxTotal.toFixed(2)}</td>
                                <td>${totalAmount}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>


            <div>
                <strong>Total Amount:</strong> ${totalAmount}
            </div>

            <div className='billing-ivoice-buttons'>
                <button className='btn1' onClick={createinvoice}>Save</button>
             <Link to='/billinginvoices/onetime'><button className='btn2'>Cancle</button></Link>   

            </div>

            <ToastContainer />
        </>
    )
}

export default OneTimeInvoiceUpdate