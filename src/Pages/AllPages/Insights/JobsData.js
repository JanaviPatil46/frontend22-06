import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { format, formatDistanceToNow } from 'date-fns';
import {  MRT_TableHeadCellFilterContainer } from "material-react-table";
import { Stack, Select, MenuItem,IconButton } from "@mui/material";
import { Paper, useMediaQuery, } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Autocomplete from "@mui/lab/Autocomplete";
import TextField from "@mui/material/TextField";
const Example = () => {

  const renderFilterContainers = () => {
    return selectedFilters.map((selectedFilterIndex) => {
      const header = table.getLeafHeaders()[selectedFilterIndex + 1];
      return (
        <div className="MRT_TableHeadCellFilterContainer">
          <MRT_TableHeadCellFilterContainer key={header.id} header={header} table={table} in />
          <IconButton
          aria-label="delete"
          size="small"
          onClick={() => {
            setSelectedFilters(prevFilters => prevFilters.filter(item => item !== selectedFilterIndex));
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
        </div>
      )


    });
  };
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(null);
  const isMobile = useMediaQuery("(max-width: 1000px)");
  useEffect(() => {
    console.log(selectedFilterIndex);
  }, [selectedFilterIndex]);

  const [selectedFilters, setSelectedFilters] = useState([]);
  const handleFilterChange = (event) => {
    const selectedIndex = event.target.value; // Assuming event.target.value is an index
    setSelectedFilterIndex(event.target.value);
    if (selectedIndex === null) {
      setSelectedFilterIndex(null); // Resetting selected filter index
      setSelectedFilters([]); // Resetting all selected filters
    } else {
      setSelectedFilters((prevFilters) => {
        const index = prevFilters.indexOf(selectedIndex);
        if (index === -1) {
          return [...prevFilters, selectedIndex]; // Append the selected index if not already present
        } else {
          return prevFilters.filter((item) => item !== selectedIndex); // Remove the index if already present
        }
      });
    }
    console.log(selectedFilters);
  };
  const API_KEY = process.env.REACT_APP_API_IP;
  const [jobData, setJobData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [pipelineData, setPipelineData] = useState([]);
  const [accountData, setAccountData] = useState([]);
  
  useEffect(() => {
    fetchData();
    fetchUserData();
    fetchPipelineData();
     fetchAccountData();
  }, []);

  const fetchData = async () => {
    try {
      const jobListResponse = await axios.get(`${API_KEY}/workflow/job/joblist/list/`);
      const formattedData = jobListResponse.data.jobList.map(job => ({
        ...job,
        StartDate: format(new Date(job.StartDate), 'MMMM dd, yyyy'),
        DueDate: format(new Date(job.DueDate), 'MMMM dd, yyyy'),
        updatedAt: formatDistanceToNow(new Date(job.updatedAt), { addSuffix: true }),
      }));
      setJobData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${API_KEY}/common/user`);
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const userOptions = userData.map(user => ({
    value: user._id,
    label: user.username,
  }));


  const fetchPipelineData = async () => {
    try {
      const response = await axios.get(`${API_KEY}/workflow/pipeline`);
      setPipelineData(response.data.pipeline);
    } catch (error) {
      console.error("Error fetching pipeline data:", error);
    }
  };
  const pipelineOptions = pipelineData.map(pipeline => ({
    value: pipeline._id,
    label: pipeline.pipelineName,
  }));

  const fetchAccountData = async () => {
    try {
      const response = await axios.get(`${API_KEY}/admin/accountdetails`);
      setAccountData(response.data.accounts);
    } catch (error) {
      console.error("Error fetching account data:", error);
    }
  };
  const accountOptions = accountData.map(account => ({
    value: account._id,
    label: account.accountName,
  }));

  const columns = useMemo(
    () => [
      {
        accessorKey: 'Name',
        header: 'Name',
        size: 150,
      },
      {
        accessorKey: 'JobAssignee',
        header: 'Job Assignee',
        size: 150,
        Filter: ({ column }) => (
          <Autocomplete
            options={userOptions}
            getOptionLabel={(option) => option.label}
            onChange={(event, newValue) => {
              column.setFilterValue(newValue ? newValue.label : '');
            }}
            renderInput={(params) => (
              <TextField {...params} label="Job Assignee" variant="outlined" />
            )}
            sx={{
              "& .MuiInputBase-root": {
                backgroundColor: "#fff",
                borderRadius: "4px",
                width: "250px",
                height: "56px",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ccc",
              },
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#888",
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#3f51b5",
              },
            }}
          />),
      },
      {
        accessorKey: 'Pipeline',
        header: 'Pipeline',
        size: 200,
        Filter: ({ column }) => (
          <Autocomplete
            options={pipelineOptions}
            getOptionLabel={(option) => option.label}
            onChange={(event, newValue) => {
              column.setFilterValue(newValue ? newValue.label : '');
            }}
            renderInput={(params) => (
              <TextField {...params} label="Pipeline" variant="outlined" />
            )}
            sx={{
              "& .MuiInputBase-root": {
                backgroundColor: "#fff",
                borderRadius: "4px",
                width: "250px",
                height: "56px",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ccc",
              },
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#888",
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#3f51b5",
              },
            }}
          />
        ),
      },
      {
        accessorKey: 'Stage',
        header: 'Stage',
        size: 150,
      },
      {
        accessorKey: 'Account',
        header: 'Account',
        size: 150,
        Filter: ({ column }) => (
          <Autocomplete
            options={accountOptions}
            getOptionLabel={(option) => option.label}
            onChange={(event, newValue) => {
              column.setFilterValue(newValue ? newValue.label : '');
            }}
            renderInput={(params) => (
              <TextField {...params} label="Account" variant="outlined" />
            )}
            sx={{
              "& .MuiInputBase-root": {
                backgroundColor: "#fff",
                borderRadius: "4px",
                width: "250px",
                height: "56px",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ccc",
              },
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#888",
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#3f51b5",
              },
            }}
          />
        ),
      },
      {
        accessorKey: 'StartDate',
        header: 'Start Date',
        size: 150,
      },
      {
        accessorKey: 'DueDate',
        header: 'Due Date',
        size: 150,
      },
      {
        accessorKey: 'updatedAt',
        header: 'Time in current stage',
        size: 150,
      },
      
    ],
    [userOptions, pipelineOptions, accountOptions],
  );

  const table = useMaterialReactTable({
    columns,
    data: jobData,
    enableBottomToolbar: true,
    enableStickyHeader: true,
    columnFilterDisplayMode: "custom",
    enableRowSelection: true,
    enablePagination: true,
    muiTableContainerProps: { sx: { maxHeight: "400px" } },
    initialState: {
      columnPinning: { left: ["mrt-row-select", "Name"] },
    },
    muiTableBodyCellProps: {
      sx: (theme) => ({
        backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[50],
      }),
    },
  });

  return (
    <div>
      <Stack direction={isMobile ? "column-reverse" : "column"} gap="8px">
        <Paper style={{ border: '2px solid blue', display: 'flex', overflowX: 'auto' }}>
          <Stack p="8px" gap="8px" display="flex" direction="row" >
            <>
              <Select
                value={selectedFilterIndex}
                onChange={handleFilterChange}
                sx={{
                  backgroundColor: 'white',
                  minWidth: 200, // Minimum width for the select box
                  '& .MuiSelect-select': {
                    padding: '10px', // Padding inside the select
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'blue', // Border color
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'green', // Border color on hover
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'purple', // Border color when focused
                  },
                }}
              >
                <MenuItem value={null}>None</MenuItem>
                {columns.map((column, index) => (
                  <MenuItem key={index} value={index}>
                    {column.header}
                  </MenuItem>
                ))}
              </Select>

              <Stack direction="row" gap="8px" >
                {renderFilterContainers()}
              </Stack>
            </>

          </Stack>
        </Paper>
        <MaterialReactTable columns={columns} table={table} />
        
      </Stack>
    </div>
  );
};

export default Example;
