import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTable, useSortBy } from 'react-table'; // Import useSortBy
import "./ActiveMembers.css";

const ActiveMembres = () => {
    const API_KEY = process.env.REACT_APP_API_IP;

    const [loading, setLoading] = useState(true);
    const [teamMembers, setTeamMembers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const requestOptions = {
                    method: "GET",
                    redirect: "follow",
                };

                const url = `${API_KEY}/admin/teammember/teammemberlist/list`;

                const response = await fetch(url, requestOptions);
                const result = await response.json();

                setTeamMembers(result.teamMemberslist);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this runs only once on mount


    // const [userData, setUserData] = useState("");
    // const [user, setUser] = useState("");

    // const { logindata } = useContext(LoginContext); // Problematic line
    // useEffect(() => {
    //     const FetchUserData = async () => {

    //         if (teamMembers.length > 0) {
    //             const firstMemberId = teamMembers[0].id;

    //         const myHeaders = new Headers();
    //         setUserData(logindata.user);
    //         console.log(userData);

    //         const requestOptions = {
    //             method: "GET",
    //             headers: myHeaders,
    //             redirect: "follow",
    //         };

    //         const url = `${API_KEY}/common/user/` + userData.id;
    //         console.log(url)
    //         fetch(url, requestOptions)
    //         .then((response) => response.json())
    //         .then((result) => {
    //             setUser(result);
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching user data:", error);
    //         });
    //         }
    //     };
    //     FetchUserData();
    // }, [teamMembers]);









    const columns = React.useMemo(() => [
        {
            Header: 'Name',
            accessor: 'Name', // Change this to match the key in your data
            Cell: ({ row }) => {
                const firstName = row.original?.FirstName;
                const middleName = row.original?.MiddleName;
                const lastName = row.original?.LastName;
                const initials = `${firstName ? firstName[0] : ''}${lastName ? lastName[0] : ''}`;
                return (
                    <div>
                        <div className="circle">{initials}</div>
                        <Link to={`/usersedit/${row.original?.id}`}>
                            {`${firstName ? firstName : ''}  ${middleName ? middleName : ''} ${lastName ? lastName : ''}`}
                        </Link>
                    </div>
                );
            }
        },
        { Header: 'Email', accessor: 'Email' },
        { Header: 'Role', accessor: 'Role' },
        { Header: 'Created', accessor: 'Created' },
        { Header: '2FA', accessor: 'has2FA', Cell: ({ value }) => value ? 'Enabled' : 'Disabled' },
        { Header: 'Actions', Cell: ({ row }) => <Link to={`/usersedit/${row.original.id}`}>Edit</Link> }
    ], []);


    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: teamMembers }, useSortBy); // Apply useSortBy hook here

    
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <table {...getTableProps()} className="table">
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted ? (column.isSortedDesc ? ' ↓' : ' ↑') : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps() }>

                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()}>
                                        {cell.column.id === 'Name' && cell.value ? (
                                            <>
                                                <div className="circle">{cell.value.substring(0, 2)}</div>
                                                <span>{cell.value}</span>
                                            </>
                                        ) : (
                                            cell.render('Cell')
                                        )}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ActiveMembres;