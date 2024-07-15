import { useMemo, useEffect, useState } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import axios from 'axios';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Stack, Select, MenuItem, TextField, Paper, useMediaQuery, Autocomplete } from "@mui/material";
import { MRT_ColumnDef, MRT_TableContainer, MRT_TableHeadCellFilterContainer } from "material-react-table";

const Example = () => {
  const API_KEY = process.env.REACT_APP_API_IP;
  const [contactData, setContactData] = useState([]);
  const [uniqueTags, setUniqueTags] = useState([]);
  const [filterValue, setFilterValue] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `${API_KEY}/common/contact/contactlist/list/`,
          headers: {},
        };

        const response = await axios.request(config);
        setContactData(response.data.contactlist);
        console.log(response.data.contactlist);
      } catch (error) {
        console.log('Error:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (contactData.length > 0) {
      const tagsSet = new Set();
      contactData.forEach((item) => {
        if (Array.isArray(item.Tags)) {
          item.Tags.forEach((tag) => {
            tagsSet.add(JSON.stringify(tag[0]));
          });
        }
      });
      setUniqueTags(Array.from(tagsSet).map(tag => JSON.parse(tag)));
      console.log(uniqueTags);
    }
  }, [contactData]);

  const filteredData = useMemo(() => {
    if (!filterValue) return contactData;

    return contactData.filter(item => {
      if (Array.isArray(item.Tags)) {
        return item.Tags.some(tag => tag.some(subTag => subTag.tagName.toLowerCase().includes(filterValue.tagName.toLowerCase())));
      }
      return false;
    });
  }, [contactData, filterValue]);

  const renderFilterContainers = () => {
    return selectedFilters.map((selectedFilterIndex) => {
      const header = table.getLeafHeaders()[selectedFilterIndex + 1];
      return (
        <div className="MRT_TableHeadCellFilterContainer" key={header.id}>
          <MRT_TableHeadCellFilterContainer header={header} table={table} in />
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
      );
    });
  };

  const [selectedFilterIndex, setSelectedFilterIndex] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleFilterChange = (event) => {
    const selectedIndex = event.target.value;
    setSelectedFilterIndex(selectedIndex);
    if (selectedIndex === null) {
      setSelectedFilterIndex(null);
      setSelectedFilters([]);
    } else {
      setSelectedFilters((prevFilters) => {
        const index = prevFilters.indexOf(selectedIndex);
        if (index === -1) {
          return [...prevFilters, selectedIndex];
        } else {
          return prevFilters.filter((item) => item !== selectedIndex);
        }
      });
    }
  };

  const isMobile = useMediaQuery("(max-width: 1000px)");

  const columns = useMemo(
    () => [
      {
        accessorKey: 'Name',
        header: 'Name',
        size: 150,
        
      },
      {
        accessorKey: 'Email',
        header: 'Email',
        size: 150,
      },
      {
        accessorKey: 'phoneNumber',
        header: 'Phone Number',
        size: 200,
      },
      {
        accessorKey: 'companyName',
        header: 'Company Name',
        size: 150,
      },
      {
        accessorKey: 'Tags',
        header: 'Tags',
        Cell: ({ cell }) => {
          const tagsData = cell.getValue();
          if (tagsData && tagsData.length > 0) {
            return (
              <Tooltip
                title={
                  <Box>
                    {tagsData.flat().map((tag, index) => (
                      <Box
                        key={index}
                        sx={{
                          backgroundColor: tag.tagColour,
                          color: 'white',
                          padding: '4px 8px',
                          margin: '2px 0',
                          borderRadius: '4px',
                          textAlign: 'left',
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
                      badgeContent={tagsData[0]?.[0]?.tagName?.slice(0, 10)}
                      sx={{
                        '& .MuiBadge-badge': {
                          backgroundColor: tagsData[0]?.[0]?.tagColour,
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
                        badgeContent={`+${tagsData.flat().length - 1}`}
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
        },
        Filter: () => (
          <Autocomplete
            options={uniqueTags}
            getOptionLabel={(option) => option.tagName}
            onChange={(event, newValue) => {
              setFilterValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} label="Filter by Tag Name"  
        />}
            renderOption={(props, option) => (
              <li {...props}>
                <Box
                  sx={{ backgroundColor: option.tagColour, color: '#fff', fontSize:'10px', padding: '4px 8px', borderRadius:'20px'}}
                >
                  {option.tagName}
                </Box>
              </li>
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
    ],
    [uniqueTags, filterValue]
  );

  const table = useMaterialReactTable({
    columns,
    data: filteredData,
    enableBottomToolbar: true,
    enableStickyHeader: true,
    columnFilterDisplayMode: 'custom',
    enableRowSelection: true,
    enablePagination: true,
    muiTableContainerProps: { sx: { maxHeight: '400px' } },
    initialState: {
      columnPinning: { left: ['mrt-row-select', 'Name'] },
    },
  });

  return (
    <Stack direction={isMobile ? "column-reverse" : "column"} gap="8px">
      <Paper style={{ border: '2px solid blue', display: 'flex', overflowX: 'auto' }}>
        <Stack p="8px" gap="8px" display="flex" direction="row">
          <>
            <Select
              value={selectedFilterIndex}
              onChange={handleFilterChange}
              sx={{
                backgroundColor: 'white',
                minWidth: 200,
                '& .MuiSelect-select': {
                  padding: '10px',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'blue',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'green',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'purple',
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

            <Stack direction="row" gap="8px">
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