import React, { useState, useRef } from 'react';
import { FaRegCheckCircle } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import './organizer.css';
import { MdStarRate } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const StaticOrganizer = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedSection, setSelectedSection] = useState('Individual Tax Organizer');

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const SubmitOrganizer = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            account: "65f812e7768762438ad2b703",
            CalendarYear: selectedButton,
            IsFirstYearTax: taxFilling,
            FillingStatus: statusButton,
            PersonalDetails: familyMembers,
            PhoneNumberEmailAddressandOccupation: contactInfo,
            HomeAddress: homeAddress,
            BankDetails: bankDetails,
            FirstYearTaxFilingInUSA: selectedButtonFirstYear,
            PreviousYearsTax: "",
            DependentStayOutsideUS: taxYearButton,
            NameNumberOfMonthsofDependent: yourTextareaStateVariable,
            HealthInsurance: healthInsurance,
            uploadform1095A: "",
            MemberDontHaveInsurance: notHealthInsurance,
            IPPin: ipPinValue,
            HSA: hsaInfo,
            MoneyWithdrawFromHSAAccount: medicalExpences,
            EstimatedTaxPayments: estimatedPayments,
            CRYPTO: cryptoButton,
            FBAR: hbarButton,
            FATCA: FATCAButton,
            ValidID: idDetails,
            UploadID: "",
            AnyRelocationDuringTaxYear: taxYear,
            ListallDatesToFromStateCountry: moveDetails,
            AnyunReimbursedMovingExpenses: unreimbursedExpenses,
            AdditionalInfoSelectallFormsThatApplyForYou: selectedForms,
            IncomeSourceSelectFormsThatApplyForYou: applicable,
            StocksAndCryptoSelectallthatApplicable: cryptoButtons,
            CryptoQuantity: textAreaValue,
            OwnahomeSelectAllthatApplicable: 
                homeApplicable
            ,
            IRAContributionsDistributionsSelectallthatapplicable: 
                iraButtons
            ,
            AmountTransferredFromIRAtoRothIRA: transferAmount,
            UploadIRAContributiondocuments: "",
            WithdrawMoneyFroYourIRAAccount: withdrawalInfo,
            HybridCarPurchaseSolarInstallationSelectThatApplicable: 
                purchaseButton
            ,
            UploadHybridCarorSolarinstallationrelatedDocuments: "",
            DayCareExpenses1ChildName: childName,
            TotalDaycareExpenses1: daycareExpenses,
            DaycareProviderInformation1: providerInfo,
            UploadDaycareExpenseReceipts1: "",
            DayCareExpenses2ChildName: childTwoName,
            TotalDaycareExpenses2: childTwodaycareExpenses,
            DaycareProviderInformation2: childTwoproviderInfo,
            UploadDaycareExpenseReceipts2: "",
            DayCareExpenses3ChildName: "",
            TotalDaycareExpenses3: "",
            DaycareProviderInformation3: "",
            UploadDaycareExpenseReceipts3: "",
            NewFamilymemberadded1: newFamilyDocument,
            UploadNewFamilymemberrelatedDocuments1: "",
            NewFamilymemberadded2: "",
            UploadNewFamilymemberrelatedDocuments2: "",
            PropertySale1: "",
            PropertySale1SelectThatApplicable: propertySaleButton,
            ForeignCountryPropertyPleaseListThePurchaseDatePriceSaleDatePriceTaxesExpenses: foreignPropertyDetails,
            UploadPropertySaleRelatedDocuments: "",
            IsThisYourPRIMARY: primaryHome,
            Howlongyouhavestayedinthishomeduringthelast5years: stayDuration,
            ShareanyadditionaldetailsaboutthisPropertySale: additionalDetails,
            RentalIncome: rentalIncome,
            RentalExpenses: rentalExpenses,
            DoyouwantmetofileFBARFATCA: fbarFatcaButton,
            ProvideTheMaximumBalance: maxBalance1,
            EducationRelatedExpensesSelectallthatareapplicable: educationalExpenses,
            For1099TSpecifyWhetherStudentIsDoingGraduationOrUnderGraduationwhichYear: studentInfo,
            ITINApplicantName: itinApplicantName,
            SelectITINService: 
                itinApplicationButton
            ,
            FirstEntryDatetoTheUS: selectedDate,
            BirthPlace: birthPlace,
            RequiredDocuments: 
                itiDocumentsButton
            ,
            BusinessName: businessName,
            BusinessAddress: businessAddress,
            WhatIsTheMainActivityofThisBusiness: mainActivity,
            WhatIsTheEIN: ein,
            WhoOwnsTheBusiness: 
                ownsBusinessButton
            ,
            BusinessStructure: businessStructureButton,
            GrossReceiptsOrSales: grossReceipts,
            ReturnsAndAllowances: returnsAndAllowances,
            OtherIncome: otherIncome,
            InventoryAtBeginningOfTheYear: inventoryBeginning,
            Purchases: purchases,
            CostOfItemsForPersonalUse: costPersonalUse,
            CostOfLabor: costLabor,
            MaterialsAndSupplies: materialsSupplies,
            OtherCostOfGoodsSold: otherCostGoodsSold,
            InventoryAtEndOfTheYear: inventoryEnd,
            CarExpensesInThisYear: carExpenses,
            WhenDidYouPlaceYourVehicleServiceForBusinessPurposes: vehicleInServiceDate,
            NumberOfMilesUsedOverYearForBusiness: businessMiles,
            IsYourOfficeBasedOutOfYourHome: officeBasedHome,
            TotalAreaOfTheHouse: totalArea,
            AreaBusinessPortion: businessArea,
            Accounting: accounting,
            Advertising: advertising,
            BankCharges: bankCharges,
            BusinessLicenses: businessLicenses,
            Commissions: commissions,
            ContractLabor: contractLabor,
            DeliveryandFreight: deliveryFreight,
            DuesandSubscriptions: duesSubscriptions,
            EmployeeBenefitPrograms: employeeBenefits,
            Insurance: insurance,
            MortgageInterest: mortgageInterest,
            OtherInterest: otherInterest,
            Janitorial: janitorial,
            LaundryCleaning: laundryCleaning,
            LegalAndProfessional: legalProfessional,
            Miscellaneous: miscellaneous,
            OfficeExpense: officeExpense,
            OutsideServices: outsideServices,
            ParkingAndTolls: parkingTolls,
            Postage: postage,
            Printing: printing,
            RentOther: rentOther,
            RentBuildings: rentBuildings,
            Repairs: repairs,
            Security: security,
            Supplies: supplies,
            TaxesRealEstate: taxesRealEstate,
            TaxesPayroll: taxesPayroll,
            TaxesSalesTaxInGrossReceipts: taxesSales,
            TaxesOther: taxesOther,
            Telephone: telephone,
            Tools: tools,
            Travel: travel,
            MealsAndEntertainmentInFull: mealsEntertainment,
            Uniforms: uniforms,
            Wages: wages,
            OtherExpenses: otherExpenses,
            SalesTax: "",
            GIFT: giftDetails,
            OtherTaxRelatedDocuments: taxDocumentsButtons,
            AlimonyAmount: alimonyDetails,
            AdditionalNotes1: additionalNotes1,
            AdditionalNotes2: additionalNotes2,
            active: "true"
        });
        console.log(raw);
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://192.168.1.116:8080/workflow/1040staticorganizer", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    }
    const sections = [
        'Individual Tax Organizer',
        'Family Information - New Client',
        'Additional Information',
        'Income Source',
        'Stocks & Crypto',
        'Own a home',
        'IRA Contributions/Distributions',
        'Hybrid Car Purchase/Solar Installation',
        'Day Care Expenses 1',
        'Day Care Expenses 2',
        'New Family member added',
        'Property Sale 1',
        'Rental Properties 1',
        'FBAR/FTCA',
        'Educational Related Expenses',
        'ITIN Application/Renewal',
        'Schedule-C -General Information (Independent Contractor or Solo Proprietor)',
        'Schedule-C -Income(Independent Contractor or Solo Proprietor)',
        'Schedule-C -COST OF GOODS SOLD(Independent Contractor or Solo Proprietor)',
        'Schedule-C -Expenses (Independent Contractor or Solo Proprietor)',
        'Any Additional Documents',
        'Additional Notes',

    ];

    const handleSectionClick = (sectionName) => {
        setSelectedSection(sectionName);
        setIsDropdownOpen(false);
        // Check which section is clicked and set the current step accordingly
        switch (sectionName) {
            case 'Individual Tax Organizer':
                setCurrentStep(1);
                break;
            case 'Family Information - New Client':
                setCurrentStep(2);
                break;
            case 'Additional Information':
                setCurrentStep(3);
                break;
            case 'Income Source':
                setCurrentStep(4);
                break;
            case 'Stocks & Crypto':
                setCurrentStep(5);
                break;
            case 'Own a home':
                setCurrentStep(6);
                break;
            case 'IRA Contributions/Distributions':
                setCurrentStep(7);
                break;
            case 'Hybrid Car Purchase/Solar Installation':
                setCurrentStep(8);
                break;
            case 'Day Care Expenses 1':
                setCurrentStep(9);
                break;
            case 'Day Care Expenses 2':
                setCurrentStep(10);
                break;
            case 'New Family member added':
                setCurrentStep(11);
                break;
            case 'Property Sale 1':
                setCurrentStep(12);
                break;
            case 'Rental Properties 1':
                setCurrentStep(13);
                break;
            case 'FBAR/FTCA':
                setCurrentStep(14);
                break;
            case 'Educational Related Expenses':
                setCurrentStep(15);
                break;
            case 'ITIN Application/Renewal':
                setCurrentStep(16);
                break;
            case 'Schedule-C -General Information (Independent Contractor or Solo Proprietor)':
                setCurrentStep(17);
                break;
            case 'Schedule-C -Income(Independent Contractor or Solo Proprietor)':
                setCurrentStep(18);
                break;
            case 'Schedule-C -COST OF GOODS SOLD(Independent Contractor or Solo Proprietor)':
                setCurrentStep(19);
                break;
            case 'Schedule-C -Expenses (Independent Contractor or Solo Proprietor)':
                setCurrentStep(20);
                break;

            case 'Any Additional Documents':
                setCurrentStep(21);
                break;
            case 'Additional Notes':
                setCurrentStep(22);
                break;

            default:
                setCurrentStep(1); // Default to the first step
        }
    };

    const nextStep = () => {

        setCurrentStep(currentStep + 1);
        // Update selected section based on current step
        switch (currentStep + 1) {
            case 1:
                setSelectedSection('Individual Tax Organizer');

                break;

            case 2:
                setSelectedSection('Family Information - New Client');
                break;
            case 3:
                setSelectedSection('Additional Information');
                break;
            case 4:
                setSelectedSection('Income Source');
                break;

            case 5:
                setSelectedSection('Stocks & Crypto');
                break;
            case 6:
                setSelectedSection('Own a home');
                break;
            case 7:
                setSelectedSection('IRA Contributions/Distributions');
                break;
            case 8:
                setSelectedSection('Hybrid Car Purchase/Solar Installation');
                break;
            case 9:
                setSelectedSection('Day Care Expenses 1');
                break;
            case 10:
                setSelectedSection('Day Care Expenses 2');
                break;
            case 11:
                setSelectedSection('New Family member added');
                break;
            case 12:
                setSelectedSection('Property Sale 1');
                break;
            case 13:
                setSelectedSection('Rental Properties 1');
                break;
            case 14:
                setSelectedSection('FBAR/FTCA');
                break;
            case 15:
                setSelectedSection('Educational Related Expenses');
                break;
            case 16:
                setSelectedSection('ITIN Application/Renewal');
                break;
            case 17:
                setSelectedSection('Schedule-C -General Information (Independent Contractor or Solo Proprietor)');
                break;
            case 18:
                setSelectedSection('Schedule-C -Income(Independent Contractor or Solo Proprietor)');
                break;
            case 19:
                setSelectedSection('Schedule-C -COST OF GOODS SOLD(Independent Contractor or Solo Proprietor)');
                break;
            case 20:
                setSelectedSection('Schedule-C -Expenses (Independent Contractor or Solo Proprietor)');
                break;

            case 21:
                setSelectedSection('Any Additional Documents');
                break;
            case 22:
                setSelectedSection('Additional Notes');
                break;


        }
    };
    const previousStep = () => {
        setCurrentStep(currentStep - 1);
        // Update selected section based on current step
        switch (currentStep - 1) {
            case 1:
                setSelectedSection('Individual Tax Organizer');

                break;

            case 2:
                setSelectedSection('Family Information - New Client');
                break;
            case 3:
                setSelectedSection('Additional Information');
                break;
            case 4:
                setSelectedSection('Income Source');
                break;

            case 5:
                setSelectedSection('Stocks & Crypto');
                break;
            case 6:
                setSelectedSection('Own a home');
                break;
            case 7:
                setSelectedSection('IRA Contributions/Distributions');
                break;
            case 8:
                setSelectedSection('Hybrid Car Purchase/Solar Installation');
                break;
            case 9:
                setSelectedSection('Day Care Expenses 1');
                break;
            case 10:
                setSelectedSection('Day Care Expenses 2');
                break;
            case 11:
                setSelectedSection('New Family member added');
                break;
            case 12:
                setSelectedSection('Property Sale 1');
                break;
            case 13:
                setSelectedSection('Rental Properties 1');
                break;
            case 14:
                setSelectedSection('FBAR/FTCA');
                break;
            case 15:
                setSelectedSection('Educational Related Expenses');
                break;

            case 16:
                setSelectedSection('ITIN Application/Renewal');
                break;
            case 17:
                setSelectedSection('Schedule-C -General Information (Independent Contractor or Solo Proprietor)');
                break;

            case 18:
                setSelectedSection('Schedule-C -Income(Independent Contractor or Solo Proprietor)');
                break;

            case 19:
                setSelectedSection('Schedule-C -COST OF GOODS SOLD(Independent Contractor or Solo Proprietor)');
                break;
            case 20:
                setSelectedSection('Schedule-C -Expenses (Independent Contractor or Solo Proprietor)');
                break;

            case 21:
                setSelectedSection('Any Additional Documents');
                break;
            case 22:
                setSelectedSection('Additional Notes');
                break;


        }
    };
    const handleButtonClickYear = (buttonName) => {
        setSelectedButton(buttonName);
        if (buttonName !== 'Other') {
            setOtherInput('');
        }

    };
    const [taxFilling, setTaxFilling] = useState('')
    const handleButtonClickTaxFilling = (buttonName) => {
        setTaxFilling(buttonName);
        // console.log(buttonName);
    }
    const handleOtherInputChange = (e) => {
        const value = e.target.value;
        if (/^[0-9]*$/.test(value)) {
            setOtherInput(value);
        }
    };
    const [selectedButton, setSelectedButton] = useState('');
    const [otherInput, setOtherInput] = useState('');
    const [currentStep, setCurrentStep] = useState(1);
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
        }
    };
    const saveData = () => {
        // console.log("case one completed");
        console.log("Selected Year:", selectedButton);
        console.log("Other Year Input:", otherInput);
        console.log("Tax Filing Status:", taxFilling);
    }

    const [familyMembers, setFamilyMembers] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const [homeAddress, setHomeAddress] = useState('');
    const [bankDetails, setBankDetails] = useState('');

    const familyInfo = () => {
        // Here you can perform further processing, validation, or store the data as needed
        const familyInfoData = {
            filingStatus: statusButton,
            familyMembers,
            contactInfo,
            homeAddress,
            bankDetails,
            isFirstYear: selectedButtonFirstYear,

        };

        // You can then pass this data to wherever you need it, or perform any other necessary actions
        console.log(familyInfoData); // Just for demonstration, you might want to do something else with the data
    };
    const [yourTextareaStateVariable, setYourTextareaStateVariable] = useState('');
    const [notHealthInsurance, setNotHealthInsurance] = useState('');
    const [ipPinValue, setIpPinValue] = useState('');
    const [hsaInfo, setHsaInfo] = useState('');
    const [idDetails, setIdDetails] = useState('');
    const [moveDetails, setMoveDetails] = useState('');
    const [unreimbursedExpenses, setUnreimbursedExpenses] = useState('');
    const [estimatedPayments, setEstimatedPayments] = useState('');
    const additionalInfo = () => {
        const data = {
            taxYearButton,
            healthInsurance,
            idDetails: idDetails,
            cryptoButton,
            hsaInfo: hsaInfo,
            FATCAButton,
            taxYear,
            selectedForms: selectedForms,
            textareaValue: yourTextareaStateVariable,
            notHealthInsurance: notHealthInsurance,
            ipPinValue: ipPinValue,
            moveDetails: moveDetails,
            unreimbursedExpenses: unreimbursedExpenses,
            estimatedPayments: estimatedPayments,
        };
        console.log(data); // Save or send this data as required
    };
    const [salesTaxAmount, setSalesTaxAmount] = useState('');
    const [giftDetails, setGiftDetails] = useState('');
    const [alimonyDetails, setAlimonyDetails] = useState('');
    const additionalDocs = () => {
        const documents = {
            salesTaxAmount: salesTaxAmount,
            giftDetails: giftDetails,
            alimonyDetails: alimonyDetails,
        }
        console.log(documents);
    }
    const [additionalNotes1, setAdditionalNotes1] = useState('');
    const [additionalNotes2, setAdditionalNotes2] = useState('');
    const additionalNotes = () => {
        const notes = {
            additionalNotes1: additionalNotes1,
            additionalNotes2: additionalNotes2,
        }
        console.log(notes);
    }
    const incomeinfo = () => {
        const incomData = {
            applicable: applicable,
            // idDocuments: idDocuments,
        }
        console.log(incomData);
    }
    const ownhomedata = () => {
        const ownhome = {
            selectedForms: homeApplicable,
        }
        console.log(ownhome);
    }
    const [fileName, setFileName] = useState('');
    const [textAreaValue, setTextAreaValue] = useState('');
    const handleTextAreaChange = (e) => {
        setTextAreaValue(e.target.value);
    };
    const CryptoData = () => {
        const Crypto = {
            selectedOptions: cryptoButtons,
            fileName: fileName,
            textAreaValue: textAreaValue,
        }
        console.log(Crypto);
    }

    const [transferAmount, setTransferAmount] = useState('');
    const [withdrawalInfo, setWithdrawalInfo] = useState('');
    // const [fileName, setFileName] = useState('');
    const handleTransferAmountChange = (e) => {
        setTransferAmount(e.target.value);
    };

    const handleWithdrawalInfoChange = (e) => {
        setWithdrawalInfo(e.target.value);
    };

    const IRAInfo = () => {
        const data = {
            selectedOptions: iraButtons,
            transferAmount: transferAmount,
            withdrawalInfo: withdrawalInfo,
            fileName: fileName,
        };
        console.log(data);
    };

    const HybridOrInstalltion = () => {
        const Installationdata = {
            selectedOptions: purchaseButton,
            fileName: fileName,
        };
        console.log(Installationdata);
    };
    const [childName, setChildName] = useState('');
    const [daycareExpenses, setDaycareExpenses] = useState('');
    const [providerInfo, setProviderInfo] = useState('');
    const dayCare1 = () => {
        const childOnedata = {
            childName: childName,
            daycareExpenses: daycareExpenses,
            providerInfo: providerInfo,
            fileName: fileName,
        };
        console.log(childOnedata);
    };
    const [childTwoName, setChildTwoName] = useState('');
    const [childTwodaycareExpenses, setChildTwoDaycareExpenses] = useState('');
    const [childTwoproviderInfo, setChildTwoProviderInfo] = useState('');
    const dayCare2 = () => {
        const childTwodata = {
            childName: childName,
            daycareExpenses: daycareExpenses,
            providerInfo: providerInfo,
            fileName: fileName,
        };
        console.log(childTwodata);
    };
    const newFamilyMemberInfo = () => {
        const Familydata = {
            selectedDocuments: newFamilyDocument,
            fileName: fileName,
        };
        console.log(Familydata);
    };

    const [stayDuration, setStayDuration] = useState('');
    const [additionalDetails, setAdditionalDetails] = useState('');
    // const [propertySalesButton, setPropertySalesButton] = useState([]);
    const [foreignPropertyDetails, setForeignPropertyDetails] = useState('')
    const propertySaleInfo = () => {
        const propertydata = {
            selectedDocuments: propertySaleButton,
            foreignPropertyDetails,
            fileName,
            primaryHome,
            stayDuration: primaryHome === 'Primary homeNo' ? stayDuration : '',
            additionalDetails,
        };
        console.log(propertydata);
    };
    const [rentalIncome, setRentalIncome] = useState('');
    const [rentalExpenses, setRentalExpenses] = useState('');
    const rentalPropertiesInfo = () => {
        const rentalPropertiesdata = {
            rentalIncome,
            rentalExpenses,
            fileName,
        };
        console.log(rentalPropertiesdata);
    };
    const [maxBalance1, setMaxBalance1] = useState('');

    const FBARFATCAInfo = () => {
        const Fbardata = {
            fbarFatcaButton,
            maxBalance1: fbarFatcaButton === 'FBAR/FATCAYes' ? maxBalance1 : '',

            fileName,
        };
        console.log(Fbardata);
    };
    const [studentInfo, setStudentInfo] = useState('');

    const educationalExpensesInfo = () => {
        const educationalExpensesdata = {
            educationalExpenses,
            studentInfo,
            fileName,
        };
        console.log(educationalExpensesdata);
    };
    const [itinApplicantName, setItinApplicantName] = useState('');
    const [firstEntryDate, setFirstEntryDate] = useState(new Date());
    const [birthPlace, setBirthPlace] = useState('');
    const [requiredDocuments, setRequiredDocuments] = useState([]);
    const itinApplicationInfo = () => {
        const applicationdata = {
            itinApplicantName,
            itinApplicationButton,
            firstEntryDate,
            birthPlace,
            requiredDocuments,
            fileName,
        };
        console.log(applicationdata);
    };
    const [businessName, setBusinessName] = useState('');
    const [businessAddress, setBusinessAddress] = useState('');
    const [mainActivity, setMainActivity] = useState('');
    const [ein, setEin] = useState('');

    const generalInformation = () => {
        const generaldata = {
            businessName,
            businessAddress,
            mainActivity,
            ein,
            ownsBusinessButton,
            businessStructureButton,
            fileName,
        };
        console.log(generaldata);
    };

    const [grossReceipts, setGrossReceipts] = useState('');
    const [returnsAndAllowances, setReturnsAndAllowances] = useState('');
    const [otherIncome, setOtherIncome] = useState('');

    const handleInputChange = (e, setter) => {
        const value = e.target.value;
        // Validate if input is numerical
        if (!isNaN(value) || value === '') {
            setter(value);
        }
    };
    const incomeInformation = () => {
        const incomedata = {
            grossReceipts,
            returnsAndAllowances,
            otherIncome
        };
        console.log(incomedata);
    };


    const [inventoryBeginning, setInventoryBeginning] = useState('');
    const [purchases, setPurchases] = useState('');
    const [costPersonalUse, setCostPersonalUse] = useState('');
    const [costLabor, setCostLabor] = useState('');
    const [materialsSupplies, setMaterialsSupplies] = useState('');
    const [otherCostGoodsSold, setOtherCostGoodsSold] = useState('');
    const [inventoryEnd, setInventoryEnd] = useState('');

    const costOfGoodsInfo = () => {
        const goodsdata = {
            inventoryBeginning,
            purchases,
            costPersonalUse,
            costLabor,
            materialsSupplies,
            otherCostGoodsSold,
            inventoryEnd
        };
        console.log(goodsdata);
    };

    const [carExpenses, setCarExpenses] = useState('');
    const [vehicleInServiceDate, setVehicleInServiceDate] = useState(null);
    const [businessMiles, setBusinessMiles] = useState('');
    const [totalArea, setTotalArea] = useState('');
    const [businessArea, setBusinessArea] = useState('');
    const [accounting, setAccounting] = useState('');
    const [advertising, setAdvertising] = useState('');
    const [bankCharges, setBankCharges] = useState('');
    const [businessLicenses, setBusinessLicenses] = useState('');
    const [commissions, setCommissions] = useState('');
    const [contractLabor, setContractLabor] = useState('');
    const [deliveryFreight, setDeliveryFreight] = useState('');
    const [duesSubscriptions, setDuesSubscriptions] = useState('');
    const [employeeBenefits, setEmployeeBenefits] = useState('');
    const [insurance, setInsurance] = useState('');
    const [mortgageInterest, setMortgageInterest] = useState('');
    const [otherInterest, setOtherInterest] = useState('');
    const [janitorial, setJanitorial] = useState('');
    const [laundryCleaning, setLaundryCleaning] = useState('');
    const [legalProfessional, setLegalProfessional] = useState('');
    const [miscellaneous, setMiscellaneous] = useState('');
    const [officeExpense, setOfficeExpense] = useState('');
    const [outsideServices, setOutsideServices] = useState('');
    const [parkingTolls, setParkingTolls] = useState('');
    const [postage, setPostage] = useState('');
    const [printing, setPrinting] = useState('');
    const [rentOther, setRentOther] = useState('');
    const [rentBuildings, setRentBuildings] = useState('');
    const [repairs, setRepairs] = useState('');
    const [security, setSecurity] = useState('');
    const [supplies, setSupplies] = useState('');
    const [taxesRealEstate, setTaxesRealEstate] = useState('');
    const [taxesPayroll, setTaxesPayroll] = useState('');
    const [taxesSales, setTaxesSales] = useState('');
    const [taxesOther, setTaxesOther] = useState('');
    const [telephone, setTelephone] = useState('');
    const [tools, setTools] = useState('');
    const [travel, setTravel] = useState('');
    const [mealsEntertainment, setMealsEntertainment] = useState('');
    const [uniforms, setUniforms] = useState('');
    const [wages, setWages] = useState('');
    const [otherExpenses, setOtherExpenses] = useState('');
    const handleDateChange = (date) => {
        setVehicleInServiceDate(date);
    };


    const [statusButton, setStatusButton] = useState('');
    const handleButtonClickStatus = (buttonName) => {
        setStatusButton(buttonName);

    };

    const [selectedButtonFirstYear, setSelectedButtonFirstYear] = useState('');
    const handleButtonClickFirstYear = (buttonName) => {
        setSelectedButtonFirstYear(buttonName);
    }

    const [healthInsurance, setHealthInsurance] = useState('');
    const [showInput, setShowInput] = useState('');
    const handleHealthButton = (buttonName) => {
        setHealthInsurance(buttonName);


    };
    const [taxYear, setTaxYear] = useState('')
    const [taxYearButton, setTaxYearButton] = useState('');
    const handleButton = (buttonName) => {
        setTaxYearButton(buttonName);
        setShowInput(buttonName);
        // console.log(buttonName);
    };
    const [primaryHome, setPrimaryHome] = useState('');
    const handlePrimaryHomeButton = (button) => {
        setPrimaryHome(button);
        setShowInput(button === 'Primary homeNo' ? 'Primary homeNo' : '');
    };

    const [fbarFatcaButton, setFbarFatcaButton] = useState('');
    const handleFbarFatcaButton = (button) => {
        setFbarFatcaButton(button);
        setShowInput(button === 'FBAR/FATCAYes' ? 'FBAR/FATCAYes' : '');
    };

    const [officeBasedHome, setOfficeBasedHome] = useState('')
    const handleOfficeBasedButton = (button) => {
        setOfficeBasedHome(button);
        setShowInput(button === '')
    }

    const [itinApplicationButton, setItinApplicationButton] = useState([]);
    const handleItinApplicationButton = (button) => {
        setItinApplicationButton(button);
    }
    const [selectedDate, setSelectedDate] = useState(null);

    const [medicalExpences, setMeddicalExpences] = useState('');
    const handleMedicalExpences = (buttonName) => {
        setMeddicalExpences(buttonName);
    }
    const [cryptoButton, setCryptoButton] = useState('');
    const handleButtonClickCrpto = (buttonName) => {
        setCryptoButton(buttonName);
    }
    const [hbarButton, setHbarButton] = useState('');
    const handleButtonClickFbar = (buttonName) => {
        setHbarButton(buttonName);
    }

    const [FATCAButton, setFATCAButton] = useState('');
    const handleButtonClickFATCA = (buttonName) => {
        setFATCAButton(buttonName);
    }

    const handleButtonClickRelocation = (buttonName) => {
        setTaxYear(buttonName);
    }

    const [selectedForms, setSelectedForms] = useState([]);


    const handleButtonSelectForm = (form) => {
        // setSelectForm(buttonName);
        if (selectedForms.includes(form)) {
            setSelectedForms(selectedForms.filter(item => item !== form));
        } else {
            setSelectedForms([...selectedForms, form]);
        }
    }
    const [applicable, setApplicable] = useState([]);
    const handleButtonApplicable = (form) => {
        // setSelectForm(buttonName);
        if (applicable.includes(form)) {
            setApplicable(applicable.filter(item => item !== form));
        } else {
            setApplicable([...applicable, form]);
        }
    }
    const [taxDocumentsButtons, setTxDocumentsButtons] = useState([]);
    const handleTaxRelatedButtons = (taxbuttons) => {

        if (taxDocumentsButtons.includes(taxbuttons)) {
            setTxDocumentsButtons(taxDocumentsButtons.filter(item => item !== taxbuttons));
        } else {
            setTxDocumentsButtons([...taxDocumentsButtons, taxbuttons]);
        }
    }

    const [homeApplicable, setHomeApplicable] = useState([]);
    const handleButtonOwnHome = (options) => {
        if (homeApplicable.includes(options)) {
            setHomeApplicable(homeApplicable.filter(item => item !== options));
        } else {
            setHomeApplicable([...homeApplicable, options]);
        }
    }

    const [cryptoButtons, setCryptoButtons] = useState([]);
    const handleCryptoButton = (options) => {
        if (cryptoButtons.includes(options)) {
            setCryptoButtons(cryptoButtons.filter(item => item !== options));
        } else {
            setCryptoButtons([...cryptoButtons, options]);
        }
    }
    const [iraButtons, setIraButtons] = useState([]);
    const handleIRAButton = (options) => {
        if (iraButtons.includes(options)) {
            setIraButtons(iraButtons.filter(item => item !== options));
        } else {
            setIraButtons([...iraButtons, options]);
        }
    }
    const [purchaseButton, SetPurchaseButton] = useState([]);
    const handlePurchaseButton = (options) => {
        if (purchaseButton.includes(options)) {
            SetPurchaseButton(purchaseButton.filter(item => item !== options));
        } else {
            SetPurchaseButton([...purchaseButton, options]);
        }
    }

    const [newFamilyDocument, setNewFamilyDocument] = useState([]);

    const handleFamilydocuments = (document) => {
        setNewFamilyDocument((prevDocs) =>
            prevDocs.includes(document)
                ? prevDocs.filter((doc) => doc !== document)
                : [...prevDocs, document]
        );
    };

    const [propertySaleButton, SetPropertySaleButton] = useState([]);
    const handlePropertySaleButton = (options) => {
        if (propertySaleButton.includes(options)) {
            SetPropertySaleButton(propertySaleButton.filter(item => item !== options));
        } else {
            SetPropertySaleButton([...propertySaleButton, options]);
        }
    }

    const [educationalExpenses, setEducationalExpenses] = useState([]);
    const handleEducationalExpenses = (value) => {
        if (educationalExpenses.includes(value)) {
            setEducationalExpenses(educationalExpenses.filter(item => item !== value));
        } else {
            setEducationalExpenses([...educationalExpenses, value]);
        }
    }
    const [itiDocumentsButton, setItiDocumentsButton] = useState([]);
    const handleItinDocuments = (buttons) => {
        if (itiDocumentsButton.includes(buttons)) {
            setItiDocumentsButton(itiDocumentsButton.filter(item => item !== buttons));
        } else {
            setItiDocumentsButton([...itiDocumentsButton, buttons]);
        }
    }
    const [ownsBusinessButton, setOwnsBusinessButton] = useState('');
    const handleGeneralInfo = (button) => {
        setOwnsBusinessButton(button);
    }
    const [businessStructureButton, setBusinessStructureButton] = useState('');
    const handleBusinessStructure = (button) => {
        setBusinessStructureButton(button);
    }
    const renderForm = () => {
        switch (currentStep) {
            case 1:
                return (
                    <>

                        <div className='individual-tax'>
                            <div >
                                <p>👋 Welcome! We're so excited to work with you.</p>
                                <br />
                                <p>This organizer is "smart" - this means that questions will populate based on the information you
                                    give us. For example, if you indicate you are married, we'll ask about your spouse. If you're not - we
                                    won't! 😎</p>
                                <br />
                                <ul style={{ marginLeft: '50px' }}>
                                    <li>Your answers will auto-save! You don't have to worry about losing data; you can come back any time.</li>
                                    <li>Once you provide us with the information once, it will save you time next year! You will be able to pre-fill your answers in the future, saving you time!</li>
                                    <li>You can complete this on your computer or mobile phone. If using the mobile app, you can use the scanner to take high-quality PDFs!</li>
                                </ul>
                                <ul style={{ marginLeft: '100px' }}>
                                    <li style={{ cursor: 'pointer', }}><p style={{ color: 'blue' }}>Click to download app on Google Play store</p></li>
                                    <li style={{ cursor: 'pointer', }}><p style={{ color: 'blue' }}>Click to download app on Apple App Store</p>
                                    </li>
                                </ul>
                                <h5 style={{ color: 'blue', margin: '20px 0', }}>Once you are done, please click 'submit'. When you submit, this will indicate to our team you are finished!</h5>
                                <h5 style={{ color: 'blue', margin: '20px 0', }}>This organizer autosaves after every question you answer, and you may return to complete it later if you do not have all of the information needed.</h5>
                                <h5 style={{ color: 'blue', margin: '20px 0', }}>You can use <strong style={{ color: 'red' }}>Android</strong> or <strong style={{ color: 'red' }}>iOS</strong> Mobile Apps to scan your documents and upload them to the portal quickly.</h5>
                                <h5 style={{ color: 'blue', margin: '20px 0', }}>﻿*** Please post your valuable review on Google https://g.page/r/CeCEiBEzrfbZEAg/review to redeem a <strong style={{ color: 'brown' }}>$15 credit</strong> for your next tax services. ***</h5>
                            </div>
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <MdStarRate style={{ color: 'red', fontSize: '10px' }} />
                                <p>Please confirm the calendar year you are completing this organizer for</p>
                            </div>
                            <div className='select-options'>

                                <button className={`organizer-btn ${selectedButton === '2023' ? 'selected' : ''}`} onClick={() => handleButtonClickYear('2023')}>
                                    2023(Jan 1 -Dec 31 2023)
                                </button>
                                <button className={`organizer-btn ${selectedButton === '2022' ? 'selected' : ''}`} onClick={() => handleButtonClickYear('2022')}>
                                    2022 (Jan 1 - Dec 31 2022)
                                </button>
                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${selectedButton === '2021' ? 'selected' : ''}`} onClick={() => handleButtonClickYear('2021')}>
                                    2021 (Jan 1 - Dec 31 2021)
                                </button>
                                <button className={`organizer-btn ${selectedButton === '2020' ? 'selected' : ''}`} onClick={() => handleButtonClickYear('2020')}>
                                    2020 (Jan 1 - Dec 31 2020)
                                </button>
                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${selectedButton === '2019' ? 'selected' : ''}`} onClick={() => handleButtonClickYear('2019')}>
                                    2019 (Jan 1 - Dec 31 2019)
                                </button>
                                <button className={`organizer-btn ${selectedButton === 'Other' ? 'selected' : ''}`} onClick={() => handleButtonClickYear('Other')}>
                                    Other
                                </button>
                            </div>



                            {selectedButton === 'Other' && (
                                <div>
                                    <label>Which Year?</label>
                                    <input
                                        type="text"
                                        value={otherInput}
                                        style={{ padding: '18px' }}
                                        onChange={handleOtherInputChange}
                                        placeholder="Numerical answer"
                                        className="organizer-input"
                                    />
                                </div>

                            )
                            }
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <MdStarRate style={{ color: 'red', fontSize: '10px' }} />
                                <p>Is this your FIRST year filing taxes with us? Or Is your filing status changed?</p>
                            </div>
                            <div className='select-options'>

                                <button className={`organizer-btn ${taxFilling === 'Yes' ? 'selected' : ''}`} onClick={() => handleButtonClickTaxFilling('Yes')}>
                                    Yes
                                </button>
                                <button className={`organizer-btn ${taxFilling === 'No' ? 'selected' : ''}`} onClick={() => handleButtonClickTaxFilling('No')}>
                                    No
                                </button>


                            </div>
                            {/* */}
                            <button className='btn1' onClick={nextStep}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }} onClick={saveData}>
                                    Next <FaArrowRight />
                                </div>
                            </button>

                        </div>
                    </>
                );


            case 2:
                return (
                    <>

                        <div>
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <MdStarRate style={{ color: 'red', fontSize: '10px' }} />
                                <p>Select your filing status</p>
                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${statusButton === 'Single' ? 'selected' : ''}`} onClick={() => handleButtonClickStatus('Single')}>
                                    Single
                                </button>
                                <button className={`organizer-btn ${statusButton === ' Married Filling Jointly' ? 'selected' : ''}`} onClick={() => handleButtonClickStatus(' Married Filling Jointly')}>
                                    Married Filling Jointly
                                </button>
                            </div>
                            <button className={`organizer-btn ${statusButton === 'Married Filling Seperately' ? 'selected' : ''}`} onClick={() => handleButtonClickStatus('Married Filling Seperately')}>
                                Married Filling Seperately
                            </button>
                            <br />
                            <button className={`organizer-btn ${statusButton === 'Head of house-hold' ? 'selected' : ''}`} onClick={() => handleButtonClickStatus(' Head of house-hold')}>
                                Head of house-hold (or) Surviving Spouse
                            </button>

                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <MdStarRate style={{ color: 'red', }} />
                                <p>Personal Details - Please provide all family members First Name, Last Name, Middle Initial, SSN and Date of Birth details (Multi-line Text Entry)</p>
                            </div>

                            <textarea id="familyMembers" value={familyMembers} onChange={(e) => setFamilyMembers(e.target.value)} className='textarea' rows="3" cols="50" />

                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <MdStarRate style={{ color: 'red', }} />
                                <p>Phone/Email - Please enter your Phone Number, Email Address and Occupation (Multi-line text entry)</p>
                            </div>

                            <textarea id="contactInfo" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} className='textarea' rows="3" cols="50" />

                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <MdStarRate style={{ color: 'red', }} />
                                <p>Home Address</p>
                            </div>

                            <textarea id="homeAddress" value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)} className='textarea' rows="3" cols="50" />
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <MdStarRate style={{ color: 'red', }} />
                                <p>Bank Details - Bank Account Information for Refund or Due payments (Bank Name, Routing Number, Account Number and Account Type) - Multi-line Text Entry</p>
                            </div>
                            <textarea className='textarea' rows="3" cols="50" id="bankDetails" value={bankDetails} onChange={(e) => setBankDetails(e.target.value)} />
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <MdStarRate style={{ color: 'red', }} />
                                <p>Is this your FIRST YEAR filing taxes in the United States (USA)?</p>
                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${selectedButtonFirstYear === 'Yes' ? 'selected' : ''}`} onClick={() => handleButtonClickFirstYear('Yes')}>
                                    Yes
                                </button>
                                <button className={`organizer-btn ${selectedButtonFirstYear === 'No' ? 'selected' : ''}`} onClick={() => handleButtonClickFirstYear('No')}>
                                    No
                                </button>
                            </div>
                            {selectedButtonFirstYear === 'No' && (
                                <div>
                                    <div className='question-one' >
                                        <MdStarRate style={{ color: 'red', }} />
                                        <p>Previous Year's Tax returns</p>
                                    </div>
                                    <div className="add-document">
                                        <div className="add-document-button" onClick={handleButtonClick}>
                                            <AiOutlinePlusCircle />
                                            <span>Add Documents</span>
                                        </div>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            style={{ display: 'none' }}
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className='btn-container'>
                            <button className='btn1' onClick={previousStep}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    Back
                                </div>
                            </button>
                            <button className='btn1' onClick={nextStep}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }} onClick={familyInfo}>
                                    Next <FaArrowRight />
                                </div>
                            </button>
                        </div>
                    </>
                );
            case 3:
                return (
                    <>
                        <div>
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />

                                <p>Any of your dependent stayed outside the US for more than 6 months in theTaxyear?</p>
                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${taxYearButton === 'taxYes' ? 'selected' : ''}`} onClick={() => handleButton('taxYes')}>
                                    Yes
                                </button>
                                <button className={`organizer-btn ${taxYearButton === 'taxNo' ? 'selected' : ''}`} onClick={() => handleButton('taxNo')}>
                                    No
                                </button>
                            </div>
                            {showInput === 'taxYes' && (

                                <div>
                                    <div className='question-one' >
                                        <p>Dependent Name and Number of Months stayed outside the US. (Multi-line Text Entry)</p>
                                    </div>
                                    <textarea className='textarea' rows="2" cols="50" placeholder='Free entry answer' value={yourTextareaStateVariable}
                                        onChange={(e) => setYourTextareaStateVariable(e.target.value)} />
                                </div>
                            )}
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />

                                <p>Health Insurance - Do all of the members in your house have health insurance?</p>
                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${healthInsurance === 'Health Yes' ? 'selected' : ''}`} onClick={() => handleHealthButton('Health Yes')}>
                                    Yes
                                </button>
                                <button className={`organizer-btn ${healthInsurance === 'Health No' ? 'selected' : ''}`} onClick={() => handleHealthButton('Health No')}>
                                    No
                                </button>
                            </div>
                            {healthInsurance === 'Health Yes' && (

                                <div>
                                    <div className='question-one' >

                                        <p>If you bought the insurance from outside sources (the Market Place), please upload form 1095A</p>
                                    </div>
                                    <div className="add-document">
                                        <div className="add-document-button" onClick={handleButtonClick}>
                                            <AiOutlinePlusCircle />
                                            <span>Add Documents</span>
                                        </div>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            style={{ display: 'none' }}
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                </div>
                            )}
                            {healthInsurance === 'Health No' && (

                                <div>
                                    <div className='question-one' >

                                        <p>Please specify which members don't have insurance and how long they haven't had insurance.</p>
                                    </div>
                                    <textarea className='textarea' rows="2" cols="50" placeholder='Free entry answer' value={notHealthInsurance}
                                        onChange={(e) => setNotHealthInsurance(e.target.value)} />
                                </div>
                            )}
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <p>IP PIN - Please provide if you or your spouse have received Identity Protection PIN (IP PIN) from the IRS for this calendar year?</p>
                            </div>
                            <textarea className='textarea' rows="2" cols="50" placeholder='Free entry answer' value={ipPinValue}
                                onChange={(e) => setIpPinValue(e.target.value)} />
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <p>HSA - If you have a HSA Account, please provide contribution and distribution amounts. (DO NOT include the contribution you did through work)</p>
                            </div>
                            <textarea className='textarea' rows="2" cols="50" placeholder='Free entry answer' value={hsaInfo}
                                onChange={(e) => setHsaInfo(e.target.value)} />
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />

                                <p>Was all of the money you withdrew from the HSA account used to pay for or reimburse yourself for out of pocket medical expenses?</p>
                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${medicalExpences === 'medicalYes' ? 'selected' : ''}`} onClick={() => handleMedicalExpences('medicalYes')}>
                                    Yes
                                </button>
                                <button className={`organizer-btn ${medicalExpences === 'medicalNo' ? 'selected' : ''}`} onClick={() => handleMedicalExpences('medicalNo')} >
                                    No
                                </button>
                            </div>
                            <div className='question-one' >
                                <p>Estimated Tax Payments - Have you made any estimated tax payments to the IRS and State? Please provide date and amount details.</p>
                            </div>
                            <textarea className='textarea' rows="2" cols="50" placeholder='Free entry answer' value={estimatedPayments}
                                onChange={(e) => setEstimatedPayments(e.target.value)} />
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />

                                <p>CRYPTO - Did you BUY or SELL any Crypto currencies in the last year?</p>
                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${cryptoButton === 'CRYPTOYes' ? 'selected' : ''}`} onClick={() => handleButtonClickCrpto('CRYPTOYes')}>
                                    Yes
                                </button>
                                <button className={`organizer-btn ${cryptoButton === 'CRYPTONo' ? 'selected' : ''}`} onClick={() => handleButtonClickCrpto('CRYPTONo')}>
                                    No
                                </button>
                            </div>
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />

                                <p>FBAR- Do you have a requirement to file FBAR?</p>
                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${hbarButton === 'FBARYes' ? 'selected' : ''}`} onClick={() => handleButtonClickFbar('FBARYes')}>
                                    Yes
                                </button>
                                <button className={`organizer-btn ${hbarButton === 'FBARNo' ? 'selected' : ''}`} onClick={() => handleButtonClickFbar('FBARNo')}>
                                    No
                                </button>
                            </div>
                            <div>
                                <label style={{ fontSize: '18px', fontWeight: '700' }}>FBAR Requirement -</label>
                                <p style={{ color: 'blue' }}>A United States person, including a citizen, resident, corporation, partnership, limited liability company, trust, and estate, must file an FBAR to report:</p>
                                <ul>
                                    <li style={{ color: 'blue', marginLeft: '15%' }}>a financial interest in or signature or other authority over at least one financial account located outside the United States if</li>
                                    <li style={{ color: 'blue', marginLeft: '15%' }}>the aggregate value of those foreign financial accounts exceeded $10,000 at any time during the calendar year reported.
                                    </li>
                                </ul>
                                <Link style={{ color: 'blue', textDecoration: 'none' }} to='https://www.irs.gov/businesses/small-businesses-self-employed/report-of-foreign-bank-and-financial-accounts-fbar' target='_blank'>more details.</Link>
                            </div>
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />

                                <p>FATCA - Do you have a requirement to file FATCA?</p>
                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${FATCAButton === 'FATCAYes' ? 'selected' : ''}`} onClick={() => handleButtonClickFATCA('FATCAYes')}>
                                    Yes
                                </button>
                                <button className={`organizer-btn ${FATCAButton === 'FATCANo' ? 'selected' : ''}`} onClick={() => handleButtonClickFATCA('FATCANo')}>
                                    No
                                </button>
                            </div>
                            <div>
                                <label style={{ fontSize: '18px', fontWeight: '700' }}>FATCA Requirement -</label>
                                <p style={{ color: 'blue' }}>You must file Form 8938 if you must file an income tax return and:</p>
                                <ul>
                                    <li style={{ color: 'blue', marginLeft: '15%' }}>You are unmarried and the total value of your specified foreign financial assets is more than $50,000 on the last day of the tax year or more than $75,000 at any time during the tax year </li>
                                    <li style={{ color: 'blue', marginLeft: '15%' }}>You are married filing a joint income tax return and the total value of your specified foreign financial assets is more than $100,000 on the last day of the tax year or more than $150,000 at any time during the tax year. </li>
                                    <li style={{ color: 'blue', marginLeft: '15%' }}>You are married filing separate income tax returns and the total value of your specified foreign financial assets is more than $50,000 on the last day of the tax year or more than $75,000 at any time during the tax year. For purposes of calculating the value of your specified foreign financial assets in applying this threshold, include one-half the value of any specified foreign financial asset jointly owned with your spouse. However, report the entire value on Form 8938 if you are required to file Form 8938.</li>
                                </ul>
                                <Link style={{ color: 'blue', textDecoration: 'none' }} to='https://www.irs.gov/businesses/corporations/summary-of-fatca-reporting-for-us-taxpayers#:~:text=FATCA%20requires%20certain%20U.S.%20taxpayers,taxpayer' target='_blank'>more details.</Link>
                            </div>
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <p>Valid ID - Please provide your and your spouse's valid state ID or Driving License details (Front/Back)</p>
                            </div>
                            <textarea className='textarea' rows="2" cols="50" placeholder='Free entry answer' value={idDetails}
                                onChange={(e) => setIdDetails(e.target.value)} />
                            <div>
                                <label style={{ fontSize: '18px', fontWeight: '700' }}>Helpful Info -</label>
                                <ul>
                                    <li style={{ color: 'blue', marginLeft: '15%' }}>I need the following details.</li>
                                    <li style={{ color: 'blue', marginLeft: '15%' }}>State that issued the ID or license</li>
                                    <li style={{ color: 'blue', marginLeft: '15%' }}>State ID or license number</li>
                                    <li style={{ color: 'blue', marginLeft: '15%' }}>Date issued</li>
                                    <li style={{ color: 'blue', marginLeft: '15%' }}>Expiration date</li>
                                </ul>
                            </div>
                            <div className='question-one' >

                                <p>Upload ID documents here.</p>
                            </div>
                            <div className="add-document">
                                <div className="add-document-button" onClick={handleButtonClick}>
                                    <AiOutlinePlusCircle />
                                    <span>Add Documents</span>
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div className='question-one' >

                                <p>Any Relocation during the tax year?</p>
                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${taxYear === 'reloactionYes' ? 'selected' : ''}`} onClick={() => handleButtonClickRelocation('reloactionYes')}>
                                    Yes
                                </button>
                                <button className={`organizer-btn ${taxYear === 'reloactionNo' ? 'selected' : ''}`} onClick={() => handleButtonClickRelocation('reloactionNo')}>
                                    No
                                </button>
                            </div>
                            {taxYear === 'reloactionYes' && (
                                <div>
                                    <div className='question-one' >
                                        <FaRegCheckCircle className='check-icon' />
                                        <p>List all Dates, To/From State/Country</p>
                                    </div>
                                    <textarea className='textarea' rows="2" cols="50" placeholder='Free entry answer' value={moveDetails}
                                        onChange={(e) => setMoveDetails(e.target.value)} />
                                    <div className='question-one' >
                                        <FaRegCheckCircle className='check-icon' />
                                        <p>Any unreimbursed moving expenses?</p>
                                    </div>
                                    <textarea className='textarea' rows="2" cols="50" placeholder='Free entry answer' value={unreimbursedExpenses}
                                        onChange={(e) => setUnreimbursedExpenses(e.target.value)} />

                                </div>
                            )}
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <p>Please select all forms that apply for you (multiple options)</p>
                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${selectedForms.includes('Stocks') ? 'selected' : ''}`} onClick={() => handleButtonSelectForm('Stocks')}>
                                    Stocks/Cryptocurrency
                                </button>
                                <button className={`organizer-btn ${selectedForms.includes('OwnAhome') ? 'selected' : ''}`} onClick={() => handleButtonSelectForm('OwnAhome')}>
                                    Own a home
                                </button>
                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${selectedForms.includes('IRA') ? 'selected' : ''}`} onClick={() => handleButtonSelectForm('IRA')}>
                                    IRA Contributions/Distributions
                                </button>

                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${selectedForms.includes('CarPurchase') ? 'selected' : ''}`} onClick={() => handleButtonSelectForm('CarPurchase')}>
                                    Hybrid Car Purchase & Solar Installation
                                </button>
                                <button className={`organizer-btn ${selectedForms.includes('DayCare') ? 'selected' : ''}`} onClick={() => handleButtonSelectForm('DayCare')}>
                                    Day Care Expenses
                                </button>
                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${selectedForms.includes('FamilyMemberAdded') ? 'selected' : ''}`} onClick={() => handleButtonSelectForm('FamilyMemberAdded')}>
                                    New Family Member Added
                                </button>
                                <button className={`organizer-btn ${selectedForms.includes('PropertySale') ? 'selected' : ''}`} onClick={() => handleButtonSelectForm('PropertySale')}>
                                    Property Sale
                                </button>
                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${selectedForms.includes('RentalProperties') ? 'selected' : ''}`} onClick={() => handleButtonSelectForm('RentalProperties')}>
                                    Rental Properties
                                </button>
                                <button className={`organizer-btn ${selectedForms.includes('FBARFATCA') ? 'selected' : ''}`} onClick={() => handleButtonSelectForm('FBARFATCA')}>
                                    FBAR/FATCA
                                </button>
                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${selectedForms.includes('Eductional') ? 'selected' : ''}`} onClick={() => handleButtonSelectForm('Eductional')}>
                                    Eductional Related Expenses
                                </button>
                                <button className={`organizer-btn ${selectedForms.includes('ITINApplication') ? 'selected' : ''}`} onClick={() => handleButtonSelectForm('ITINApplication')}>
                                    ITIN Application/Renewal
                                </button>
                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${selectedForms.includes('ScheduleC') ? 'selected' : ''}`} onClick={() => handleButtonSelectForm('ScheduleC')}>
                                    Schedule C (Independent Contractor or Solo Proprietor)
                                </button>

                            </div>
                        </div>
                        <div className='btn-container'>
                            <button className='btn1' onClick={previousStep}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    Back
                                </div>
                            </button>
                            <button className='btn1' onClick={nextStep}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }} onClick={additionalInfo}>
                                    Next <FaArrowRight />
                                </div>
                            </button>
                        </div>
                    </>
                );
            case 4:
                return (
                    <>
                        <div>
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <p>Please select all forms that apply for you (multiple options)</p>
                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${applicable.includes('W2sEmployers') ? 'selected' : ''}`} onClick={() => handleButtonApplicable('W2sEmployers')}>
                                    W2s from all Employers
                                </button>
                                <button className={`organizer-btn ${applicable.includes('intdiv') ? 'selected' : ''}`} onClick={() => handleButtonApplicable('intdiv')}>
                                    1099 (INT & DIV)
                                </button>
                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${applicable.includes('foreigntaxpaid') ? 'selected' : ''}`} onClick={() => handleButtonApplicable('foreigntaxpaid')}>
                                    Worldwide Income & Foreign Taxes Paid
                                </button>

                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${applicable.includes('K1sPartnership') ? 'selected' : ''}`} onClick={() => handleButtonApplicable('K1sPartnership')}>
                                    K1s (Partnership or S-Crop)
                                </button>
                                <button className={`organizer-btn ${applicable.includes('unemploymentIncome') ? 'selected' : ''}`} onClick={() => handleButtonApplicable('unemploymentIncome')}>
                                    Un-Employment Income
                                </button>
                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${applicable.includes('gamblingincome') ? 'selected' : ''}`} onClick={() => handleButtonApplicable('gamblingincome')}>
                                    Gambling Income
                                </button>
                                <button className={`organizer-btn ${applicable.includes('farmingexpenses') ? 'selected' : ''}`} onClick={() => handleButtonApplicable('farmingexpenses')}>
                                    Farming Income & Expenses
                                </button>
                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${applicable.includes('Canceleddebt') ? 'selected' : ''}`} onClick={() => handleButtonApplicable('Canceleddebt')}>
                                    Canceled debt (1099 C)
                                </button>
                                <button className={`organizer-btn ${applicable.includes('AlimonyReceivedPaid') ? 'selected' : ''}`} onClick={() => handleButtonApplicable('AlimonyReceivedPaid')}>
                                    Alimony Received / Paid
                                </button>
                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${applicable.includes('Taxableoffsets') ? 'selected' : ''}`} onClick={() => handleButtonApplicable('Taxableoffsets')}>
                                    Taxable offsets of stae and local taxes
                                </button>
                                <button className={`organizer-btn ${applicable.includes('OtherIncome') ? 'selected' : ''}`} onClick={() => handleButtonApplicable('OtherIncome')}>
                                    Any Other Income
                                </button>
                            </div>
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <p>Upload ID documents here.</p>
                            </div>
                            <div className="add-document">
                                <div className="add-document-button" onClick={handleButtonClick}>
                                    <AiOutlinePlusCircle />
                                    <span>Add Documents</span>
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                        <div className='btn-container'>
                            <button className='btn1' onClick={previousStep}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    Back
                                </div>
                            </button>
                            <button className='btn1' onClick={nextStep}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }} onClick={incomeinfo}>
                                    Next <FaArrowRight />
                                </div>
                            </button>
                        </div>
                    </>
                );
            case 5:
                return (
                    <>
                        <div>
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <p>Select All that are applicable (multiple options)</p>
                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${cryptoButtons.includes('brokarage accounts') ? 'selected' : ''}`} onClick={() => handleCryptoButton('brokarage accounts')}>
                                    1099-B from all brokarage accounts
                                </button>

                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${cryptoButtons.includes('Form-3922') ? 'selected' : ''}`} onClick={() => handleCryptoButton('Form-3922')}>
                                    ESPP/RSUs - We need supplemental forms - Other than E-Trade or Fidelity OR if
                                    you don't have supplemental forms, Please Share Form-3922
                                </button>

                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${cryptoButtons.includes('Foreign Stock') ? 'selected' : ''}`} onClick={() => handleCryptoButton('Foreign Stock')}>
                                    Any Foreign Stock Sale
                                </button>

                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${cryptoButtons.includes('Incentive Stock Options') ? 'selected' : ''}`} onClick={() => handleCryptoButton('Incentive Stock Options')}>
                                    ISO (Incentive Stock Options) - Upload documents if you exercised/Sold
                                </button>

                            </div>
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <p>Crypto - Quantity, Purchase Date and Cost basis(Purchase Price), Sale Date and Proceeds (Feel free to upload an excel sheet)</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Free entry answer'
                                value={textAreaValue}
                                onChange={handleTextAreaChange}
                            />
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <p>Upload Stocks and Crypto Documents</p>
                            </div>
                            <div className="add-document">
                                <div className="add-document-button" onClick={handleButtonClick}>
                                    <AiOutlinePlusCircle />
                                    <span>Add Documents</span>
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />

                            </div>
                        </div>
                        <div className='btn-container'>
                            <button className='btn1' onClick={previousStep}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    Back
                                </div>
                            </button>
                            <button className='btn1' onClick={nextStep}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }} onClick={CryptoData}>
                                    Next <FaArrowRight />
                                </div>
                            </button>
                        </div>
                    </>
                )
            case 6:
                return (
                    <>
                        {/* Own a home */}
                        <div>
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <p>Select all that Applicable(multiple options)</p>
                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${homeApplicable.includes('MoertgageInterestForm') ? 'selected' : ''}`} onClick={() => handleButtonOwnHome('MoertgageInterestForm')}>
                                    Moertgage Interest-Form 1098 Documents from all Lenders (If you refinance don't forget the old and new 1098)
                                </button>

                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${homeApplicable.includes('PropertyTax') ? 'selected' : ''}`} onClick={() => handleButtonOwnHome('PropertyTax')}>
                                    Property Tax (or) Payment Confirmation screenshot
                                </button>

                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${homeApplicable.includes('DMVRegistration') ? 'selected' : ''}`} onClick={() => handleButtonOwnHome('DMVRegistration')}>
                                    DMV Registration
                                </button>
                                <button className={`organizer-btn ${homeApplicable.includes('DonationRecipient') ? 'selected' : ''}`} onClick={() => handleButtonOwnHome('DonationRecipient')}>
                                    Cash/Non-Cash Donation Recipient
                                </button>
                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${homeApplicable.includes('MedicalExpensesRecipient') ? 'selected' : ''}`} onClick={() => handleButtonOwnHome('MedicalExpensesRecipient')}>
                                    Medical Expenses Recipient (if more than 7.5% of AGI)
                                </button>

                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${homeApplicable.includes('ClosingDocuments') ? 'selected' : ''}`} onClick={() => handleButtonOwnHome('ClosingDocuments')}>
                                    Closing Documents (First time Home Buyers)
                                </button>

                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${homeApplicable.includes('Foreign Home Loan') ? 'selected' : ''}`} onClick={() => handleButtonOwnHome('Foreign Home Loan')}>
                                    Interest for Foreign Home Loan (Please do not include rental property here)
                                </button>

                            </div>
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <p>Upload ID documents here.</p>
                            </div>
                            <div className="add-document">
                                <div className="add-document-button" onClick={handleButtonClick}>
                                    <AiOutlinePlusCircle />
                                    <span>Add Documents</span>
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div>selectedButton: {homeApplicable}</div>
                        </div>
                        <div className='btn-container'>
                            <button className='btn1' onClick={previousStep}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    Back
                                </div>
                            </button>
                            <button className='btn1' onClick={nextStep}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }} onClick={ownhomedata}>
                                    Next <FaArrowRight />
                                </div>
                            </button>
                        </div>
                    </>
                );
            case 7:
                return (
                    <>
                        <div>
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <p>Select all that Applicable(multiple options)</p>
                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${iraButtons.includes('IRA Tax') ? 'selected' : ''}`} onClick={() => handleIRAButton('IRA Tax')}>
                                    IRA- Tax Payer and Spouse Contribution or Distribution Documents
                                </button>

                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${iraButtons.includes('Rollover docs') ? 'selected' : ''}`} onClick={() => handleIRAButton('Rollover docs')}>
                                    401K Rollover or IRA Rollover - 1099-R Document
                                </button>

                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${iraButtons.includes('transferred money') ? 'selected' : ''}`} onClick={() => handleIRAButton('transferred money')}>
                                    Transferred money from IRA to Roth IRA Account
                                </button>

                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${iraButtons.includes('doorRoth') ? 'selected' : ''}`} onClick={() => handleIRAButton('doorRoth')}>
                                    IRA to Back door Roth IRA
                                </button>

                            </div>
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <p>Enter the amount you have transferred from IRA to Roth IRA</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Free entry answer'
                                value={transferAmount}
                                onChange={handleTransferAmountChange}
                            />
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <p>Upload IRA Contribution documents</p>
                            </div>
                            <div className="add-document">
                                <div className="add-document-button" onClick={handleButtonClick}>
                                    <AiOutlinePlusCircle />
                                    <span>Add Documents</span>
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <p>Did you withdraw money from your IRA account? Please specify amount and reason for the withdrawal to waive the 10% penalty.</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Free entry answer'
                                value={withdrawalInfo}
                                onChange={handleWithdrawalInfoChange}
                            />
                        </div>
                        <div className='btn-container'>
                            <button className='btn1' onClick={previousStep}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    Back
                                </div>
                            </button>
                            <button className='btn1' onClick={nextStep}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }} onClick={IRAInfo} >
                                    Next <FaArrowRight />
                                </div>
                            </button>
                        </div>
                    </>
                );
            case 8:
                return (
                    <>
                        <div>
                            <div>
                                <label style={{ fontSize: '18px', fontWeight: '700' }}>Helpful Info -</label>
                                <ul>
                                    <li style={{ color: 'blue', marginLeft: '15%' }}>Additional Information on Tax Credits for Energy Star Home Appliances</li>
                                    <li style={{ color: 'blue', marginLeft: '15%' }}>IRS updates frequently asked questions related to new, previously-owned and qualified commerical clean vehicle credits</li>
                                    <li style={{ color: 'blue', marginLeft: '15%' }}>Credits for new clean vehicle purchased in 2023 or after</li>

                                </ul>
                            </div>
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <p>Select all that Applicable(multiple options)</p>
                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${purchaseButton.includes('Car Purchased Receipts') ? 'selected' : ''}`} onClick={() => handlePurchaseButton('Car Purchased Receipts')}>
                                    Hybrid Car Purchased Receipts(Needs VIN, Purchase Price and Date)
                                </button>

                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${purchaseButton.includes('Solar Installation Receipts') ? 'selected' : ''}`} onClick={() => handlePurchaseButton('Solar Installation Receipts')}>
                                    Solar Installation Receipts
                                </button>

                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${purchaseButton.includes('Energy Savings') ? 'selected' : ''}`} onClick={() => handlePurchaseButton('Energy Savings')}>
                                    Energy Savings Equipment Purchase or Installation Receipts
                                </button>

                            </div>
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <p>Upload Hybrid Car or Solar installation related Documents
                                </p>
                            </div>
                            <div className="add-document">
                                <div className="add-document-button" onClick={handleButtonClick}>
                                    <AiOutlinePlusCircle />
                                    <span>Add Documents</span>
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                        <div className='btn-container'>
                            <button className='btn1' onClick={previousStep}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    Back
                                </div>
                            </button>
                            <button className='btn1' onClick={nextStep}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }} onClick={HybridOrInstalltion} >
                                    Next <FaArrowRight />
                                </div>
                            </button>
                        </div>
                    </>
                );

            case 9:
                return (
                    <>
                        <div>
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <p>Child Name</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Free entry answer'
                                value={childName}
                                onChange={(e) => setChildName(e.target.value)}
                            />
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <p>Total Daycare Expenses</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Free entry answer'
                                value={daycareExpenses}
                                onChange={(e) => setDaycareExpenses(e.target.value)}
                            />
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <p>Daycare Provider Information (Name, Federal Tax ID, SSN, Address, Phone)</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Free entry answer'
                                value={providerInfo}
                                onChange={(e) => setProviderInfo(e.target.value)}
                            />
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <p>Upload Daycare Expense Receipts</p>
                            </div>
                            <div className="add-document">
                                <div className="add-document-button" onClick={handleButtonClick}>
                                    <AiOutlinePlusCircle />
                                    <span>Add Documents</span>
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                            </div>

                        </div>
                        <div className='btn-container'>
                            <button className='btn1' onClick={previousStep}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    Back
                                </div>
                            </button>
                            <button className='btn1' onClick={nextStep}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }} onClick={dayCare1}>
                                    Next <FaArrowRight />
                                </div>
                            </button>
                        </div>
                    </>
                );

            case 10:
                return (
                    <>
                        <div>
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <p>Child Name</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Free entry answer'
                                value={childTwoName}
                                onChange={(e) => setChildTwoName(e.target.value)}
                            />
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <p>Total Daycare Expenses</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Free entry answer'
                                value={childTwodaycareExpenses}
                                onChange={(e) => setChildTwoDaycareExpenses(e.target.value)}
                            />
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <p>Daycare Provider Information (Name, Federal Tax ID, SSN, Address, Phone)</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Free entry answer'
                                value={childTwoproviderInfo}
                                onChange={(e) => setChildTwoProviderInfo(e.target.value)}
                            />
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <p>Upload Daycare Expense Receipts</p>
                            </div>
                            <div className="add-document">
                                <div className="add-document-button" onClick={handleButtonClick}>
                                    <AiOutlinePlusCircle />
                                    <span>Add Documents</span>
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                            </div>

                        </div>
                        <div className='btn-container'>
                            <button className='btn1' onClick={previousStep}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    Back
                                </div>
                            </button>
                            <button className='btn1' onClick={nextStep}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }} onClick={dayCare2}>
                                    Next <FaArrowRight />
                                </div>
                            </button>
                        </div>
                    </>
                );

            case 11:
                return (
                    <>
                        <div>
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <p>Select all that are applicable (multiple options)</p>
                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${newFamilyDocument.includes('birth certificate') ? 'selected' : ''}`} onClick={() => handleFamilydocuments('birth certificate')}>
                                    Birth Certificate
                                </button>
                                <button className={`organizer-btn ${newFamilyDocument.includes('SSN certificate') ? 'selected' : ''}`} onClick={() => handleFamilydocuments('SSN certificate')}>
                                    SSN Certificate
                                </button>
                            </div>
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <p>Upload New Family member related Documents</p>
                            </div>
                            <div className="add-document">
                                <div className="add-document-button" onClick={handleButtonClick}>
                                    <AiOutlinePlusCircle />
                                    <span>Add Documents</span>
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div>documents:{newFamilyDocument}</div>
                            <div className='btn-container'>
                                <button className='btn1' onClick={previousStep}>
                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                        Back
                                    </div>
                                </button>
                                <button className='btn1' onClick={nextStep}>
                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }} onClick={newFamilyMemberInfo}>
                                        Next <FaArrowRight />
                                    </div>
                                </button>
                            </div>
                        </div>
                    </>
                )
            case 12:
                return (
                    <div>
                        <div className='question-one' >
                            <FaRegCheckCircle className='check-icon' />
                            <p>Select all that are applicable (multiple options)</p>
                        </div>
                        <div className='select-options'>
                            <button className={`organizer-btn ${propertySaleButton.includes('Purchase documents') ? 'selected' : ''}`} onClick={() => handlePropertySaleButton('Purchase documents')}>
                                Purchase and Sale Deed documents
                            </button>
                            <button className={`organizer-btn ${propertySaleButton.includes('Receipts paid') ? 'selected' : ''}`} onClick={() => handlePropertySaleButton('Receipts paid')}>
                                Receipts for any taxes paid
                            </button>
                        </div>
                        <div className='select-options'>
                            <button className={`organizer-btn ${propertySaleButton.includes('Receipts of Expenses') ? 'selected' : ''}`} onClick={() => handlePropertySaleButton('Receipts of Expenses')}>
                                Receipts of Expenses (upgrades, commissions,repairs etc)
                            </button>

                        </div>
                        <div className='question-one' >
                            <FaRegCheckCircle className='check-icon' />
                            <p>If the property is in a foreign country, please list the purchase date and price, sale date and price, taxes and expenses</p>
                        </div>
                        <textarea
                            className='textarea'
                            rows="2"
                            cols="50"
                            placeholder='Free entry answer'
                            value={foreignPropertyDetails}
                            onChange={(e) => setForeignPropertyDetails(e.target.value)}
                        />
                        <div className='question-one' >
                            <FaRegCheckCircle className='check-icon' />
                            <p>Upload Property Sale related documents</p>
                        </div>
                        <div className="add-document">
                            <div className="add-document-button" onClick={handleButtonClick}>
                                <AiOutlinePlusCircle />
                                <span>Add Documents</span>
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className='question-one' >
                            <FaRegCheckCircle className='check-icon' />
                            <p>Is this your PRIMARY Home?</p>
                        </div>
                        <div className='select-options'>
                            <button className={`organizer-btn ${primaryHome === 'Primary homeYes' ? 'selected' : ''}`} onClick={() => handlePrimaryHomeButton('Primary homeYes')}>
                                Yes
                            </button>
                            <button className={`organizer-btn ${primaryHome === 'Primary homeNo' ? 'selected' : ''}`} onClick={() => handlePrimaryHomeButton('Primary homeNo')}>
                                No
                            </button>
                        </div>
                        {showInput === 'Primary homeNo' && (
                            <div>
                                <div className='question-one' >
                                    <p>How long you have stayed in this home during the last 5 years?</p>
                                </div>
                                <textarea
                                    className='textarea'
                                    rows="2"
                                    cols="50"
                                    placeholder='Free entry answer'
                                    value={stayDuration}
                                    onChange={(e) => setStayDuration(e.target.value)}
                                />
                            </div>
                        )}
                        <div className='question-one' >
                            <FaRegCheckCircle className='check-icon' />
                            <p>Share any additional details that you want to tell us about this Property Sale. (Multi-line Text Entry)</p>
                        </div>
                        <textarea
                            className='textarea'
                            rows="2"
                            cols="50"
                            placeholder='Free entry answer'
                            value={additionalDetails}
                            onChange={(e) => setAdditionalDetails(e.target.value)}
                        />
                        <div className='btn-container'>
                            <button className='btn1' onClick={previousStep}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    Back
                                </div>
                            </button>
                            <button className='btn1' onClick={nextStep}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }} onClick={propertySaleInfo}>
                                    Next <FaArrowRight />
                                </div>
                            </button>
                        </div>
                    </div>
                );
            case 13:
                return (
                    <div>
                        <div>
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <p>Rental Income</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Free entry answer'
                                value={rentalIncome}
                                onChange={(e) => setRentalIncome(e.target.value)}
                            />
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <p>Rental Expenses</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Free entry answer'
                                value={rentalExpenses}
                                onChange={(e) => setRentalExpenses(e.target.value)}
                            />
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <p>'Rental-Property-Details.xlsx' Excel sheet is available in the current tax year folder. Please fill all relevant details and upload it here.</p>
                            </div>
                            <div className="add-document">
                                <div className="add-document-button" onClick={handleButtonClick}>
                                    <AiOutlinePlusCircle />
                                    <span>Add Documents</span>
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                        <div className='btn-container'>
                            <button className='btn1' onClick={previousStep}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    Back
                                </div>
                            </button>
                            <button className='btn1' onClick={nextStep}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }} onClick={rentalPropertiesInfo}>
                                    Next <FaArrowRight />
                                </div>
                            </button>
                        </div>
                    </div>

                );
            case 14:
                return (
                    <div>
                        <div>
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <p>Do you want me to file FBAR/FATCA?</p>
                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${fbarFatcaButton === 'FBAR/FATCAYes' ? 'selected' : ''}`} onClick={() => handleFbarFatcaButton('FBAR/FATCAYes')}>
                                    Yes
                                </button>
                                <button className={`organizer-btn ${fbarFatcaButton === 'FBAR/FATCANo' ? 'selected' : ''}`} onClick={() => handleFbarFatcaButton('FBAR/FATCANo')}>
                                    No
                                </button>
                            </div>
                            {showInput === 'FBAR/FATCAYes' && (
                                <div>
                                    <div className='question-one' >
                                        <p>Please provide the maximum balance in the year in all financial institutions in the Foreign Countries</p>
                                    </div>
                                    <textarea
                                        className='textarea'
                                        rows="2"
                                        cols="50"
                                        placeholder='Free entry answer'
                                        value={maxBalance1}
                                        onChange={(e) => setMaxBalance1(e.target.value)}
                                    />

                                    <div className='question-one' >
                                        <FaRegCheckCircle className='check-icon' />
                                        <p>'FBAR_FATCA_Checklist.xlsx' Excel Sheet is available in the current tax year folder. Please fill all relevant details and upload it here.</p>
                                    </div>
                                    <div className="add-document">
                                        <div className="add-document-button" onClick={handleButtonClick}>
                                            <AiOutlinePlusCircle />
                                            <span>Add Documents</span>
                                        </div>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            style={{ display: 'none' }}
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className='btn-container'>
                            <button className='btn1' onClick={previousStep}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    Back
                                </div>
                            </button>
                            <button className='btn1' onClick={nextStep}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }} onClick={FBARFATCAInfo}>
                                    Next <FaArrowRight />
                                </div>
                            </button>
                        </div>
                    </div>
                );
            case 15:
                return (
                    <div>
                        <div>
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <p>Select all that are applicable (multiple options)</p>
                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${educationalExpenses.includes('1099-T') ? 'selected' : ''}`} onClick={() => handleEducationalExpenses('1099-T')}>
                                    1099-T
                                </button>
                                <button className={`organizer-btn ${educationalExpenses.includes('1099-E') ? 'selected' : ''}`} onClick={() => handleEducationalExpenses('1099-E')}>
                                    1099-E (Loan Interest)
                                </button>
                            </div>
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <p>For 1099-T - Specify whether student is doing Graduation or Under-Graduation and which year.</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Free entry answer'
                                value={studentInfo}
                                onChange={(e) => setStudentInfo(e.target.value)}
                            />
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <p>Upload Education related documents</p>
                            </div>
                            <div className="add-document">
                                <div className="add-document-button" onClick={handleButtonClick}>
                                    <AiOutlinePlusCircle />
                                    <span>Add Documents</span>
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                        <div className='btn-container'>
                            <button className='btn1' onClick={previousStep}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    Back
                                </div>
                            </button>
                            <button className='btn1' onClick={nextStep}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }} onClick={educationalExpensesInfo} >
                                    Next <FaArrowRight />
                                </div>
                            </button>
                        </div>
                    </div>
                );
            case 16:
                return (
                    <div>
                        <div>
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <p>ITIN Applicant Name</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Free entry answer'
                                value={itinApplicantName}
                                onChange={(e) => setItinApplicantName(e.target.value)}
                            />
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <p>Select ITIN Service</p>
                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${itinApplicationButton === 'Certificate of Authorization' ? 'selected' : ''}`} onClick={() => handleItinApplicationButton('Certificate of Authorization')}>
                                    Certificate of Authorization (COA) (No need to visit IRS Office)
                                </button>
                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${itinApplicationButton === 'ITIN Application' ? 'selected' : ''}`} onClick={() => handleItinApplicationButton('ITIN Application')}>
                                    visiting IRS Office to submit ITIN Application
                                </button>
                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${itinApplicationButton === 'Mail Original Passport' ? 'selected' : ''}`} onClick={() => handleItinApplicationButton('Mail Original Passport')}>
                                    Mail Original Passport & ITIN Application to the IRS Iffice
                                </button>
                            </div>
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>First Entry Date to the US</p>
                            </div>
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                dateFormat="MMM-dd-yyyy"
                                placeholderText="Select a date"
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Birth Place (City and State)</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Free entry answer'
                                value={birthPlace}
                                onChange={(e) => setBirthPlace(e.target.value)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Required Documents (multiple options)</p>
                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${itiDocumentsButton.includes('Un-expired Passport') ? 'selected' : ''}`} onClick={() => handleItinDocuments('Un-expired Passport')}>
                                    Un-expired Passport (First and Last Pages)
                                </button>
                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${itiDocumentsButton.includes('Foreign country address') ? 'selected' : ''}`} onClick={() => handleItinDocuments('Foreign country address')}>
                                    Foreign country address page
                                </button>
                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${itiDocumentsButton.includes('VISA PAge') ? 'selected' : ''}`} onClick={() => handleItinDocuments('VISA PAge')}>
                                    VISA PAge (If your VISA on Passport is expired, please upload Renewed I-797 form);
                                </button>
                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${educationalExpenses.includes('CAA authorization Service') ? 'selected' : ''}`} onClick={() => handleItinDocuments('CAA authorization Service')}>
                                    COA (if you are taking the CAA authorization Service from me, please upload first date of entry stamp page from your Passport)
                                </button>
                            </div>
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <p>Upload ITIN related Documents</p>
                            </div>
                            <div className="add-document">
                                <div className="add-document-button" onClick={handleButtonClick}>
                                    <AiOutlinePlusCircle />
                                    <span>Add Documents</span>
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                        <div className='btn-container'>
                            <button className='btn1' onClick={previousStep}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    Back
                                </div>
                            </button>
                            <button className='btn1' onClick={nextStep}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }} onClick={itinApplicationInfo} >
                                    Next <FaArrowRight />
                                </div>
                            </button>
                        </div>
                    </div>
                )
            case 17:
                return (
                    <div>
                        <div>
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Business Name</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Free entry answer'
                                value={businessName}
                                onChange={(e) => setBusinessName(e.target.value)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Business Address</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Free entry answer'
                                value={businessAddress}
                                onChange={(e) => setBusinessAddress(e.target.value)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>What is the main activity of this business?</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Free entry answer'
                                value={mainActivity}
                                onChange={(e) => setMainActivity(e.target.value)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>What is the EIN?</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Free entry answer'
                                value={ein}
                                onChange={(e) => setEin(e.target.value)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Who owns the business?</p>
                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${ownsBusinessButton === 'taxpayer' ? 'selected' : ''}`} onClick={() => handleGeneralInfo('taxpayer')}>
                                    Taxpayer
                                </button>
                                <button className={`organizer-btn ${ownsBusinessButton === 'Spouse' ? 'selected' : ''}`} onClick={() => handleGeneralInfo('Spouse')}>
                                    Spouse
                                </button>
                                <button className={`organizer-btn ${ownsBusinessButton === 'Own together' ? 'selected' : ''}`} onClick={() => handleGeneralInfo('Own together')}>
                                    Own together with spouse
                                </button>
                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${ownsBusinessButton === 'Other partners' ? 'selected' : ''}`} onClick={() => handleGeneralInfo('Other partners')}>
                                    Other partners besides spouse
                                </button>
                            </div>
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Business structure</p>
                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${businessStructureButton === 'Sole Properties' ? 'selected' : ''}`} onClick={() => handleBusinessStructure('Sole Properties')}>
                                    Sole Properties OR Single Member LLC
                                </button>
                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${businessStructureButton === 'Self Employment' ? 'selected' : ''}`} onClick={() => handleBusinessStructure('Self Employment')}>
                                    Self Employment OR Received any 1099
                                </button>
                            </div>
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <p>Please upload any 1099 you have received for this business</p>
                            </div>
                            <div className="add-document">
                                <div className="add-document-button" onClick={handleButtonClick}>
                                    <AiOutlinePlusCircle />
                                    <span>Add Documents</span>
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                        <div className='btn-container'>
                            <button className='btn1' onClick={previousStep}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    Back
                                </div>
                            </button>
                            <button className='btn1' onClick={nextStep}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }} onClick={generalInformation}>
                                    Next <FaArrowRight />
                                </div>
                            </button>
                        </div>
                    </div>
                );
            case 18:
                return (
                    <div>
                        <div className='question-one'>
                            <FaRegCheckCircle className='check-icon' />
                            <p>Gross receipts or sales (Form 1099-MISC, box 7)</p>
                        </div>
                        <textarea
                            className='textarea'
                            rows="2"
                            cols="50"
                            placeholder='Numerical answer'
                            value={grossReceipts}
                            onChange={(e) => handleInputChange(e, setGrossReceipts)}
                        />
                        <div className='question-one'>
                            <FaRegCheckCircle className='check-icon' />
                            <p>Returns and allowances</p>
                        </div>
                        <textarea
                            className='textarea'
                            rows="2"
                            cols="50"
                            placeholder='Numerical answer'
                            value={returnsAndAllowances}
                            onChange={(e) => handleInputChange(e, setReturnsAndAllowances)}
                        />
                        <div className='question-one'>
                            <FaRegCheckCircle className='check-icon' />
                            <p>Other income</p>
                        </div>
                        <textarea
                            className='textarea'
                            rows="2"
                            cols="50"
                            placeholder='Numerical answer'
                            value={otherIncome}
                            onChange={(e) => handleInputChange(e, setOtherIncome)}
                        />
                        <div className='btn-container'>
                            <button className='btn1' onClick={previousStep}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    Back
                                </div>
                            </button>
                            <button className='btn1' onClick={nextStep}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }} onClick={incomeInformation}>
                                    Next <FaArrowRight />
                                </div>
                            </button>
                        </div>
                    </div>
                );
            case 19:
                return (
                    <div>
                        <div>
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Inventory at beginning of the year</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Numerical answer'
                                value={inventoryBeginning}
                                onChange={(e) => handleInputChange(e, setInventoryBeginning)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Purchases</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Numerical answer'
                                value={purchases}
                                onChange={(e) => handleInputChange(e, setPurchases)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Cost of items for personal use</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Numerical answer'
                                value={costPersonalUse}
                                onChange={(e) => handleInputChange(e, setCostPersonalUse)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Cost of labor</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Numerical answer'
                                value={costLabor}
                                onChange={(e) => handleInputChange(e, setCostLabor)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Materials and supplies</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Numerical answer'
                                value={materialsSupplies}
                                onChange={(e) => handleInputChange(e, setMaterialsSupplies)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Other cost of goods sold:</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Numerical answer'
                                value={otherCostGoodsSold}
                                onChange={(e) => handleInputChange(e, setOtherCostGoodsSold)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Inventory at end of the year</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Numerical answer'
                                value={inventoryEnd}
                                onChange={(e) => handleInputChange(e, setInventoryEnd)}
                            />
                        </div>

                        <div className='btn-container'>
                            <button className='btn1' onClick={previousStep}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    Back
                                </div>
                            </button>
                            <button className='btn1' onClick={nextStep}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }} onClick={costOfGoodsInfo}>
                                    Next <FaArrowRight />
                                </div>
                            </button>
                        </div>
                    </div>
                );
            case 20:
                return (
                    <div>
                        <div>
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Car expenses in this year</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Numerical answer'
                                name="carExpenses"
                                value={carExpenses}
                                onChange={(e) => handleInputChange(e, setCarExpenses)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>When did you place your vehicle in service for business purposes?</p>
                            </div>
                            <DatePicker
                                value={vehicleInServiceDate}
                                onChange={handleDateChange}
                                dateFormat="MMM-dd-yyyy"
                                placeholderText="Select a date"
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Number of miles used over the year for business</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Numerical answer'
                                name="businessMiles"
                                value={businessMiles}
                                onChange={(e) => handleInputChange(e, setBusinessMiles)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Is your office based out of your home?</p>
                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${officeBasedHome === 'officehomeYes' ? 'selected' : ''}`} onClick={() => handleOfficeBasedButton('officehomeYes')}>
                                    Yes
                                </button>
                                <button className={`organizer-btn ${officeBasedHome === 'officehomeNo' ? 'selected' : ''}`} onClick={() => handleOfficeBasedButton('officehomeNo')}>
                                    No
                                </button>
                            </div>
                            {showInput === 'officehomeYes' && (
                                <div>
                                    <div className='question-one' >
                                        <p>Total area of the house (sq feet)</p>
                                    </div>
                                    <textarea
                                        className='textarea'
                                        rows="2"
                                        cols="50"
                                        placeholder='Numerical answer'
                                        name="totalArea"
                                        value={totalArea}
                                        onChange={(e) => handleInputChange(e, setTotalArea)}
                                    />
                                    <div className='question-one' >
                                        <p>Area of business portion</p>
                                    </div>
                                    <textarea
                                        className='textarea'
                                        rows="2"
                                        cols="50"
                                        placeholder='Numerical answer'
                                        name="businessArea"
                                        value={businessArea}
                                        onChange={(e) => handleInputChange(e, setBusinessArea)}
                                    />

                                </div>
                            )}
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Accounting</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Numerical answer'
                                name="accounting"
                                value={accounting}
                                onChange={(e) => handleInputChange(e, setAccounting)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Advertising</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Numerical answer'
                                name="advertising"
                                value={advertising}
                                onChange={(e) => handleInputChange(e, setAdvertising)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Bank charges</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Numerical answer'
                                name="bankCharges"
                                value={bankCharges}
                                onChange={(e) => handleInputChange(e, setBankCharges)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Business Licenses</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Numerical answer'
                                name="businessLicenses"
                                value={businessLicenses}
                                onChange={(e) => handleInputChange(e, setBusinessLicenses)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Commissions</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Numerical answer'
                                name="commissions"
                                value={commissions}
                                onChange={(e) => handleInputChange(e, setCommissions)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Contract labor</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Numerical answer'
                                name="contractLabor"
                                value={contractLabor}
                                onChange={(e) => handleInputChange(e, contractLabor)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Delivery and freight</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Numerical answer'
                                name="deliveryFreight"
                                value={deliveryFreight}
                                onChange={(e) => handleInputChange(e, setDeliveryFreight)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Dues and subscriptions</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Numerical answer'
                                name="duesSubscriptions"
                                value={duesSubscriptions}
                                onChange={(e) => handleInputChange(e, setDuesSubscriptions)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Employee benefit programs</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Numerical answer'
                                name="employeeBenefits"
                                value={employeeBenefits}
                                onChange={(e) => handleInputChange(e, setEmployeeBenefits)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Insurance (other than health)</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Numerical answer'
                                name="insurance"
                                value={insurance}
                                onChange={(e) => handleInputChange(e, setInsurance)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Mortgage interest (reported on 1098)</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Numerical answer'
                                name="mortgageInterest"
                                value={mortgageInterest}
                                onChange={(e) => handleInputChange(e, setMortgageInterest)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Other interest</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Numerical answer'
                                name="otherInterest"
                                value={otherInterest}
                                onChange={(e) => handleInputChange(e, setOtherInterest)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Janitorial</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Numerical answer'
                                name="janitorial"
                                value={janitorial}
                                onChange={(e) => handleInputChange(e, setJanitorial)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Laundry and cleaning</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Numerical answer'
                                name="laundryCleaning"
                                value={laundryCleaning}
                                onChange={(e) => handleInputChange(e, setLaundryCleaning)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Legal and professional</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Numerical answer'
                                name="legalProfessional"
                                value={legalProfessional}
                                onChange={(e) => handleInputChange(e, setLegalProfessional)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Miscellaneous</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Numerical answer'
                                name="miscellaneous"
                                value={miscellaneous}
                                onChange={(e) => handleInputChange(e, setMiscellaneous)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Office expense</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Numerical answer'
                                name="officeExpense"
                                value={officeExpense}
                                onChange={(e) => handleInputChange(e, setOfficeExpense)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Outside services</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Numerical answer'
                                name="outsideServices"
                                value={outsideServices}
                                onChange={(e) => handleInputChange(e, setOutsideServices)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Parking and tolls</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Numerical answer'
                                name="parkingTolls"
                                value={parkingTolls}
                                onChange={(e) => handleInputChange(e, setParkingTolls)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Postage</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Numerical answer'
                                name="postage"
                                value={postage}
                                onChange={(e) => handleInputChange(e, setPostage)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Printing</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Numerical answer'
                                name="printing"
                                value={printing}
                                onChange={(e) => handleInputChange(e, setPrinting)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Rent - other</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Numerical answer'
                                name="rentOther"
                                value={rentOther}
                                onChange={(e) => handleInputChange(e, setRentOther)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Rent - buildings</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Numerical answer'
                                name="rentBuildings"
                                value={rentBuildings}
                                onChange={(e) => handleInputChange(e, setRentBuildings)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Repairs</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Numerical answer'
                                name="repairs"
                                value={repairs}
                                onChange={(e) => handleInputChange(e, setRepairs)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Security</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Numerical answer'
                                name="security"
                                value={security}
                                onChange={(e) => handleInputChange(e, setSecurity)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Supplies</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Numerical answer'
                                name="supplies"
                                value={supplies}
                                onChange={(e) => handleInputChange(e, setSupplies)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Taxes - real estate</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Numerical answer'
                                name="taxesRealEstate"
                                value={taxesRealEstate}
                                onChange={(e) => handleInputChange(e, setTaxesRealEstate)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Taxes - payroll</p>
                            </div>

                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Numerical answer'
                                name="taxesPayroll"
                                value={taxesPayroll}
                                onChange={(e) => handleInputChange(e, setTaxesPayroll)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Taxes - sales tax in gross receipts</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Numerical answer'
                                name="taxesSales"
                                value={taxesSales}
                                onChange={(e) => handleInputChange(e, setTaxesSales)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Taxes - other</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Numerical answer'
                                name="taxesOther"
                                value={taxesOther}
                                onChange={(e) => handleInputChange(e, setTaxesOther)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Telephone</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Numerical answer'
                                name="telephone"
                                value={telephone}
                                onChange={(e) => handleInputChange(e, setTelephone)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Tools</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Numerical answer'
                                name="tools"
                                value={tools}
                                onChange={(e) => handleInputChange(e, setTools)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Travel</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Numerical answer'
                                name="travel"
                                value={travel}
                                onChange={(e) => handleInputChange(e, setTravel)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Meals and entertainment in full</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Numerical answer'
                                name="mealsEntertainment"
                                value={mealsEntertainment}
                                onChange={(e) => handleInputChange(e, setMealsEntertainment)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Uniforms</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Numerical answer'
                                name="uniforms"
                                value={uniforms}
                                onChange={(e) => handleInputChange(e, setUniforms)}
                            />
                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Wages</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Numerical answer'
                                name="wages"
                                value={wages}
                                onChange={(e) => handleInputChange(e, setWages)}
                            />

                            <div className='question-one'>
                                <FaRegCheckCircle className='check-icon' />
                                <p>Other Expenses:</p>
                            </div>
                            <textarea
                                className='textarea'
                                rows="2"
                                cols="50"
                                placeholder='Numerical answer'
                                name="otherExpenses"
                                value={otherExpenses}
                                onChange={(e) => handleInputChange(e, setOtherExpenses)}
                            />
                        </div>
                        <div className='btn-container'>
                            <button className='btn1' onClick={previousStep}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    Back
                                </div>
                            </button>
                            <button className='btn1' onClick={nextStep}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }} >
                                    Next <FaArrowRight />
                                </div>
                            </button>
                        </div>
                    </div>
                )
            case 21:
                return (
                    <>
                        <div>
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <p>Sales Tax - Did you make online purchases where State Sales tax wasn’t collected? If YES, please enter the amount.</p>
                            </div>
                            <textarea className='textarea' rows="2" cols="50" placeholder='Free entry answer' value={salesTaxAmount}
                                onChange={(e) => setSalesTaxAmount(e.target.value)} />

                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <p>GIFT - Did you make or receive any gifts of more than $17,000 to any individual last year? A gift is generally not taxable to the recipient. Share more details.</p>
                            </div>
                            <textarea className='textarea' rows="2" cols="50" placeholder='Free entry answer' value={giftDetails}
                                onChange={(e) => setGiftDetails(e.target.value)} />

                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <p>Other Tax Related Documents (multiple options)</p>
                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${taxDocumentsButtons.includes('Medical Insurance') ? 'selected' : ''}`} onClick={() => handleTaxRelatedButtons('Medical Insurance')}>
                                    1095 A/B/C - Proff of Medical Insurance
                                </button>

                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${taxDocumentsButtons.includes('household receive') ? 'selected' : ''}`} onClick={() => handleTaxRelatedButtons('household receive')}>
                                    Did anyone in your household receive a distribution from or was the grantor of a foreign trust or estate?
                                </button>

                            </div>
                            <div className='select-options'>
                                <button className={`organizer-btn ${taxDocumentsButtons.includes('foreign corporation or partnership') ? 'selected' : ''}`} onClick={() => handleTaxRelatedButtons('foreign corporation or partnership')}>
                                    Did anyone in your household owns foreign corporation or partnership?
                                </button>

                            </div>
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <p>Do you have any Alimony Amount to report? Please enter Spouse Name, SSN and Amount (This is applicable only prior 2018 separations)</p>
                            </div>
                            <textarea className='textarea' rows="2" cols="50" placeholder='Free entry answer' value={alimonyDetails}
                                onChange={(e) => setAlimonyDetails(e.target.value)} />
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <p>Please upload any additional documents here</p>
                            </div>
                            <div className="add-document">
                                <div className="add-document-button" onClick={handleButtonClick}>
                                    <AiOutlinePlusCircle />
                                    <span>Add Documents</span>
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                        <div className='btn-container'>
                            <button className='btn1' onClick={previousStep}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    Back
                                </div>
                            </button>
                            <button className='btn1' onClick={nextStep}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }} onClick={additionalDocs}>
                                    Next <FaArrowRight />
                                </div>
                            </button>
                        </div>
                    </>
                );

            case 22:
                return (
                    <>
                        <div>
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <p>Additional Notes #1 - Please add any additional notes that you want us to know</p>
                            </div>
                            <textarea className='textarea' rows="2" cols="50" placeholder='Free entry answer' value={additionalNotes1}
                                onChange={(e) => setAdditionalNotes1(e.target.value)} />
                            <div className='question-one' >
                                <FaRegCheckCircle className='check-icon' />
                                <p>Additional Notes #2 - Please add any additional notes that you want us to know</p>
                            </div>
                            <textarea className='textarea' rows="2" cols="50" placeholder='Free entry answer' value={additionalNotes2}
                                onChange={(e) => setAdditionalNotes2(e.target.value)} />
                        </div>
                        <div className='btn-container'>
                            <button className='btn1' onClick={previousStep}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    Back
                                </div>
                            </button>
                            <button className='btn1' onClick={nextStep}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }} onClick={additionalNotes}>
                                    Next <FaArrowRight />
                                </div>
                            </button>
                            <button className='btn1' onClick={nextStep}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }} onClick={SubmitOrganizer}>
                                    submit
                                </div>
                            </button>
                        </div>
                    </>
                );


            default:
                return (
                    <div>Your Organizer is completed</div>
                )
        }
    };
    const navigate = useNavigate();
    const handleCrossClick = () => {
        // Navigate to another page using navigate function
        navigate('/firmtemplates/organizers');
    };
    return (
        <>
            <div className='static-organizer-header'>
                <div className='organizer-name'>
                    <p>1040</p>
                    <div className='organizer-sections'>
                        <FaRegCheckCircle className='check-icon' />
                        {selectedSection}
                        <div
                            style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}
                            className='dropdown-section'
                            onClick={toggleDropdown}
                        >
                            Go to section
                            <FaAngleDown className='drop-down-icon' />
                        </div>
                        {isDropdownOpen && (
                            <div className='dropdown-menu'>
                                {sections.map((section, index) => (
                                    <p key={index} onClick={() => handleSectionClick(section)} className={selectedSection === section ? 'selected-section' : ''}>{section}</p>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <RxCross2 onClick={handleCrossClick} />
            </div>
            <div className='section-form-container'>
                <div style={{ margin: '0 auto', width: '650px', textAlign: 'left', }}>
                    {renderForm()}

                </div>

            </div>

        </>
    );
};

export default StaticOrganizer;

