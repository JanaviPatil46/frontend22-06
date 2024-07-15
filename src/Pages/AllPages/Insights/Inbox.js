import react, { useMemo, useEffect, useState } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { data } from "./makeData";
import axios from "axios";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import './inbox.css';
// import { MenuItem } from "@mui/material";
import { Paper, useMediaQuery, Button, IconButton, } from "@mui/material";
import { MRT_ColumnDef, MRT_TableContainer, MRT_TableHeadCellFilterContainer } from "material-react-table";
import { Stack, Select, MenuItem } from "@mui/material";

import DeleteIcon from '@mui/icons-material/Delete';

import Autocomplete from "@mui/lab/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { Link } from 'react-router-dom'; 
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

  const TeamMemberFilter = ({ column }) => {
    const columnFilterValue = column.getFilterValue();

    const uniqueTeamMembers = useMemo(() => {
      const teamMembers = new Set();
      column.getFacetedRowModel().rows.forEach((row) => {
        const members = row.getValue(column.id);
        if (Array.isArray(members)) {
          members.forEach((member) => {
            if (typeof member === 'string') {
              teamMembers.add(member);
            } else if (member && member.username) {
              teamMembers.add(member.username);
            }
          });
        }
      });
      return Array.from(teamMembers);
    }, [column]);

    return (
      <Box sx={{ marginBottom: 2 }}>
        <Autocomplete
          options={uniqueTeamMembers}
          value={columnFilterValue || ''}
          onChange={(event, newValue) => {
            column.setFilterValue(newValue || undefined);
          }}
          renderInput={(params) => <TextField {...params} label="Filter by Team Member" />}
          sx={{
            "& .MuiInputBase-root": {
              backgroundColor: "#fff",
              borderRadius: "4px",
              width: "400px",
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
            "& .MuiAutocomplete-option": {
              padding: "8px 16px",
            },
            "& .MuiAutocomplete-listbox": {
              maxHeight: "200px",
              overflow: "auto",
            },
            "& .MuiAutocomplete-inputRoot": {
              padding: "0 12px",
            },
            "& .MuiInputLabel-root": {
              color: "#555",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#3f51b5",
            },
          }}
        />
      </Box>
    );
  };

  const teamMemberFilterFn = (row, columnId, filterValue) => {
    const teamMembers = row.original.Team || [];
    return teamMembers.some(teamMember =>
      teamMember.username.toLowerCase().includes(filterValue.toLowerCase())
    );
  };
  
  const TagFilter = ({ column}) => {
    // Memoize unique tag names to avoid recalculating on every render
    const uniqueTags = useMemo(() => {
      const tagsSet = new Set();
      column.getFacetedRowModel().rows.forEach((row) => {
        const tags = row.getValue(column.id);
        if (Array.isArray(tags)) {
          tags.forEach((tag) => {
            if (tag && tag.tagName && tag.tagColour) {
              tagsSet.add(JSON.stringify({ tagName: tag.tagName, tagColour: tag.tagColour }));
            }
          });
        }
      });
      return Array.from(tagsSet).map(tag => JSON.parse(tag));
    }, [column]);
    // Filter by selected taga
    const handleChange = (event, newValue) => {
      column.setFilterValue(newValue ? newValue.tagName.toLowerCase() : undefined);
    };
  
    return (
      <Box sx={{ marginBottom: 2 }}>
        <Autocomplete
          options={uniqueTags}
          value={column.getFilterValue() || ''}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} label="Filter by Tag Name"  
        />}
          renderOption={(props, option) => (
            <Box component="li" sx={{ display: 'flex', alignItems: 'center', gap: 1 }} {...props}>
              <Chip label={option.tagName} sx={{ backgroundColor: option.tagColour, color: '#fff', fontSize:'10px', padding: '4px 8px',}} />
            </Box>
          )}

          sx={{
            "& .MuiInputBase-root": {
              backgroundColor: "#fff",
              borderRadius: "4px",
              width: "400px",
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
      </Box>
    );
  };

  const tagFilterFn =   (row, columnId, filterValue) => {
        const tags = row.original.Tags || [];
        return tags.some(tag => tag.tagName.toLowerCase().includes(filterValue.toLowerCase()));
      };
  
      const TypeFilter = ({ column }) => {
        const handleChange = (event) => {
          column.setFilterValue(event.target.value || undefined); // Set the filter value based on the selection
        };
      
        return (
          <Box sx={{ marginBottom: 2 }}>
            <Select
            
              value={column.getFilterValue() || ''}
              onChange={handleChange}
              displayEmpty
               renderInput={(params) => <TextField {...params} label="Filter by type"/>}
              sx={{
                "& .MuiSelect-select": {
                  padding: '10px',
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: '#ccc',
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: '#888',
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: '#3f51b5',
                },
              }}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="individual">Individual</MenuItem>
              <MenuItem value="company">Company</MenuItem>
            </Select>
          </Box>
        );
      };
      
      const typeFilterFn = (row, columnId, filterValue) => {
        const type = row.original.Type;
        return type ? type.toLowerCase() === filterValue.toLowerCase() : false;
      };
      

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
  const [accountData, setAccountData] = useState(data);
  const isMobile = useMediaQuery("(max-width: 1000px)");
  const [uniqueTags, setUniqueTags] = useState([]);
  const UserInitials = ({ username }) => {
    // Check if username is a string and provide a default if not
    const validUsername = typeof username === "string" ? username : "";

    return (
      <span title={validUsername}>
        {validUsername
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase()) // Convert to uppercase
          .join("")}
      </span>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          method: "get",
          maxBodyLength: Infinity,
          url: "http://192.168.1.116:8080/admin/account/accountdetailslist",
          headers: {},
        };

        const response = await axios.request(config);
        setAccountData(response.data.accountlist);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchData();
  }, []);

  // Update unique tags when accountData changes
  useEffect(() => {
    if (accountData.length > 0) {
      // Extract unique tags
      const tagsSet = new Set();
      accountData.forEach((item) => {
        if (Array.isArray(item.Tags)) {
          // Check if Tags property exists and is an array
          item.Tags.forEach((tag) => {
            tagsSet.add(tag[0]);
          });
        }
      });
      // Convert set to array and update state
      setUniqueTags(Array.from(tagsSet));
      console.log(uniqueTags);
    }
  }, [accountData]); // Update when accountData changes

  const columns = useMemo(
    //column definitions...
    () => [
      {
        accessorKey: "Name",
        header: "AccountName",
        muiTableBodyCellProps: {
          sx: {
            // backgroundColor: "lightblue",
            color: "darkblue",
            fontWeight: "bold",
          },
        },
        Cell: ({ cell }) => (
          <Link to={`/accountsdash/overview/${cell.row.original.id}`} style={{ textDecoration: 'none', color: 'blue' }}>
            {cell.getValue()}
          </Link>
        ),
      },
      {
        accessorKey: "Follow",
        header: "Follow",
      },
      {
        accessorKey: "Type",
        header: "Type",
        filterFn: typeFilterFn, // Use the custom filter function
    // Filter: TypeFilter,
    Filter: ({ column, table }) => <TypeFilter column={column} table={table} />,
        Cell: ({ cell }) => (
          <div style={{ display: "flex", justifyContent: "center", gap: "0px" }}>
            <Badge
              badgeContent={cell.getValue()}
              color="primary"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </div>
        ),
        // footer: "City",
      },
      {
        accessorKey: 'Team',
        header: 'Team Members',
        filterFn: teamMemberFilterFn,
        Filter: ({ column, table }) => <TeamMemberFilter column={column} table={table} />,
        Cell: ({ cell }) => {
          const teamMembers = Array.isArray(cell.getValue()) ? cell.getValue() : [];

          if (teamMembers.length === 0) return null;

          return (
            <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '100%', gap: '15px' }}>
              {teamMembers.map((teamMember, index) => (
                <Tooltip key={index} title={teamMember.username}>
                  <Badge
                    badgeContent={<UserInitials username={teamMember.username} />}
                    color="primary"
                    sx={{
                      '& .MuiBadge-badge': {
                        backgroundColor: '#F4D03F',
                        color: 'white',
                      },
                      marginRight: '8px',
                      marginBottom: '8px',
                      cursor: 'pointer',
                    }}
                  />
                </Tooltip>
              ))}
            </div>
          );
        },
      },
      
      {
        accessorKey: 'Tags',
        header: 'Tags',
        size: 200,
        filterFn: tagFilterFn, // Use the custom filter function
        Filter: ({ column, table }) => <TagFilter column={column} table={table} />,
        Cell: ({ cell }) => {
          const tagsData = cell.getValue();
          if (tagsData && tagsData.length > 0) {
            return (
              <Tooltip
                title={
                  <Box>
                    {tagsData.map((tag, index) => (
                      <Box
                        key={index}
                        sx={{
                          backgroundColor: tag.tagColour,
                          color: 'white',
                          padding: '4px 8px',
                          margin: '2px 0',
                          borderRadius: '4px',
                        }}
                      >
                        {tag.tagName}
                      </Box>
                    ))}
                  </Box>
                }
                placement="top"
                arrow
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0px' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
                    <Badge
                      badgeContent={tagsData[0]?.tagName?.slice(0, 10)}
                      sx={{
                        '& .MuiBadge-badge': {
                          backgroundColor: tagsData[0]?.tagColour,
                          color: 'white',
                          padding: '8px 12px',
                          maxWidth: '100px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        },
                      }}
                    />
                  </div>
                  {tagsData.length > 1 && (
                    <div style={{ display: 'flex', minWidth: '50px' }}>
                      <Badge
                        badgeContent={`+${tagsData.length - 1}`}
                        sx={{
                          '& .MuiBadge-badge': {
                            backgroundColor: '#d1d1d1',
                            color: 'black',
                          },
                        }}
                      />
                    </div>
                  )}
                </div>
              </Tooltip>
            );
          } else {
            return null;
          }
        }
      },

      
      {
        accessorKey: "Invoices",
        header: "Invoices",
        // footer: "City",
      },
      {
        accessorKey: "Credits",
        header: "Credits",
        // footer: "City",
      },
      {
        accessorKey: "Tasks",
        header: "Tasks",
        // footer: "City",
      },

      {
        accessorKey: "Proposals",
        header: "Proposals",
        // footer: "City",
      },
      {
        accessorKey: "Unreadchats",
        header: "Unreadchats",
        // footer: "City",
      },
      {
        accessorKey: "Pendingorganizers",
        header: "PendingOrganizers",
        // footer: "City",
      },
      {
        accessorKey: "Pendingsignatures",
        header: "PendingSignatures",
        // footer: "City",
      },
      {
        accessorKey: "Lastlogin",
        header: "LastLogin",
        // footer: "City",
        filterVariant: "range",
      },
    ],
    [uniqueTags]
    //end
  );

  const table = useMaterialReactTable({
    columns,
    data: accountData,
    enableBottomToolbar: true,
    enableStickyHeader: true,
    columnFilterDisplayMode: "custom", //we will render our own filtering UI
    enableRowSelection: true, // Enable row selection
    enablePagination: true,
    muiTableContainerProps: { sx: { maxHeight: "400px" } },
    initialState: {
      columnPinning: { left: ["mrt-row-select", "Name"], },
    },

    muiTableBodyCellProps: {
      sx: (theme) => ({
        backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[50],
      }),
    },
  });

  return (
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
  );
};

export default Example;
