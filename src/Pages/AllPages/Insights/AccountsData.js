import React, { useState, useEffect } from "react";
import { useTable, usePagination, useGlobalFilter, useSortBy } from 'react-table';
import './accountsdata.css'; // Import your CSS file for styling
import { Link } from 'react-router-dom';
import { MdAlternateEmail } from "react-icons/md";
import SendAccountEmail from "./SendAccountEmail";
import { RxCross2 } from "react-icons/rx";
const AccountsData = () => {
  const API_KEY = process.env.REACT_APP_API_IP;
  const [acc, setAccounts] = useState([]);
  const [searchValue, setSearchValue] = useState("")
  const [isSendEmailOpen, setIsSendEmailOpen] = useState(false);
  const [accsend, setAccountsSend] = useState([]);
  const handleSendEmail = () => {
    setIsSendEmailOpen(!isSendEmailOpen);
  };
  const handleFormClose = () => {
    setIsSendEmailOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestOptions = {
          method: "GET",
          redirect: "follow",
        };
        const url = `${API_KEY}/admin/account/accountdetailslist`;
        const response = await fetch(url, requestOptions);
        const result = await response.json();
        setAccounts(result.accountlist);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const data = React.useMemo(() => acc || [], [acc]);

  const UserInitials = ({ username }) => {
    return <span title={username}>{username.split(" ").map(word => word.charAt(0)).join("")}</span>;
  };

  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleCheckboxChange = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const allAccountIds = acc.map((account) => account.id);
      setSelectedAccounts(allAccountIds);
    } else {
      setSelectedAccounts([]);
    }
  };

  const handleRecordCheckboxChange = (accountId) => {
    if (selectedAccounts.includes(accountId)) {
      setSelectedAccounts(selectedAccounts.filter((id) => id !== accountId));
    } else {
      setSelectedAccounts([...selectedAccounts, accountId]);
    }
  };

  const renderTags = (tags) => {
    return tags.map((tag, index) => (
      <h5 key={index} style={{ fontSize: "10px", padding: "0px 4px", backgroundColor: tag.tagColour, color: "#fff", borderRadius: "8px", textAlign: "center", marginBottom: '5px' }}>
        {tag.tagName}
      </h5>
    ));
  };

  const columns = React.useMemo(() => [
    {
      Header: (
        <div style={{ display: 'flex', alignItems: 'center' }}>

          <input type="checkbox" checked={selectAll} onChange={handleCheckboxChange} style={{ marginRight: "20px" }} />
          Name

        </div>
      ),
      accessor: "Name",
      Cell: ({ row }) => (
        <div style={{ display: 'flex', alignItems: 'center', width: "200px" }}>
          <input type="checkbox" checked={selectedAccounts.includes(row.original.id)} onChange={() => handleRecordCheckboxChange(row.original.id)} style={{ marginRight: "10px" }} />
          <Link style={{ color: "blue" }} to={`/accountsdash/overview/${row.original.id}`} className="acc-name">{row.original.Name}</Link>
        </div>
      ),
    },
    {
      Header: "Follow",
      accessor: "Follow",
    },
    {
      Header: "Type",
      accessor: "Type",
    },
    {
      Header: "Invoices",
      accessor: "Invoices",
    },
    {
      Header: "Credits",
      accessor: "Credits",
    },
    {
      Header: "Tasks",
      accessor: "Tasks",
    },
    {
      Header: "Team",
      accessor: "Team",
      Cell: ({ row }) => (
        <div style={{ display: 'flex', alignItems: 'center', width: "120px" }}>
          <div style={{ marginLeft: '25px', width: "120px" }}>
            {row.original.Team &&
              row.original.Team.map((team, index) => (
                <div className="circle_account"> {team.username && <UserInitials username={team.username} />}</div>
              ))}
          </div>
        </div>
      ),
    },
    {
      Header: "Tags",
      accessor: "Tags",
      Cell: ({ row }) => (
        <div style={{ display: 'flex', alignItems: 'center', width: "100px" }}>
          <td>{row.original.Tags && renderTags(row.original.Tags)}</td>
        </div>
      )
    },
    {
      Header: "Proposals",
      accessor: "Proposals",
    },
    {
      Header: "Unread Chats",
      accessor: "Unreadchats",
    },
    {
      Header: "Pending Organizers",
      accessor: "Pendingorganizers",
    },
    {
      Header: "Pending Signature",
      accessor: "Pendingsignatures",
    },
    {
      Header: "Last Login",
      accessor: "Lastlogin",
    },
    {
      Header: "Settings",
      accessor: "Settings",
    },
  ], [acc, selectAll, selectedAccounts]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex, pageSize },
    gotoPage,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    setPageSize,
    setGlobalFilter, // Destructure setGlobalFilter from useTable hook
    state,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 }, // Ensure pageCount and pageOptions are included in initialState
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const { globalFilter } = state;

  const pageCount = React.useMemo(() => Math.ceil(data.length / pageSize), [data.length, pageSize]);
  const pageOptions = React.useMemo(() => {
    const options = [];
    for (let i = 0; i < pageCount; i++) {
      options.push(i);
    }
    return options;
  }, [data.length, pageSize]);

  const sendEmails = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      // emailtemplateid: selecttempId,
      // selectedAccounts: selectedid,
      // templatename: templateName,
      // emailsubject: inputText,
      // emailbody: textareaValue
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    let responseData; // Define a variable to store the response data
    fetch("http://68.251.138.233:8080/sendBulkEmails", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        responseData = result; // Store the response data in the variable
        // setDataGetEmail(responseData)
        // toast.success('Email sent successfully');
        window.location.reload()// Log the response data to the console
      })
      .catch((error) => console.error(error));
    console.log("Sending emails to selected accounts:", selectedAccounts);
  };


  return (
    <div className="table-container">
      <div style={{ width: "200px" }}>
        <input
          type="text"
          placeholder="Search..."
          value={globalFilter || ""} // Set input value to globalFilter
          onChange={(e) => setGlobalFilter(e.target.value)} // Call setGlobalFilter on input change
        />

      {(selectAll || selectedAccounts.length > 0) && (
        <div
          style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            color: 'blue',
            cursor: 'pointer'
          }}
          onClick={handleSendEmail}
        >
          <MdAlternateEmail />
          <p style={{ color: 'blue', cursor: 'pointer' }}>Send Email</p>
        </div>
      )}

      </div>

      <div className="table-wrapper" {...getTableProps()}>
        <table>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr class="fixed-row" {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())} // Add getSortByToggleProps() here
                    className={column.id === 'Name' ? 'fixed-column' : ''}
                  >
                    {column.render("Header")}
                    {/* Add sorting icon based on column.isSorted and column.isSortedDesc */}
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr  {...row.getRowProps()}>
                  {row.cells.map((cell, cellIndex) => (
                    <td
                      {...cell.getCellProps()}
                      className={cellIndex === 0 ? 'fixed-column' : ''}>
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>

      <div className={`send-email-form ${isSendEmailOpen ? "email-form-open" : ""}`}>
        <div className="send-email-header">
          <h3>New Eamil</h3>
          <RxCross2 onClick={handleFormClose} style={{ cursor: 'pointer', fontSize: '20px', color: 'blue' }} />
        </div>
        <hr />
        <SendAccountEmail selectedAccounts={selectedAccounts} />
      </div>

    </div>
  );
};

export default AccountsData;
