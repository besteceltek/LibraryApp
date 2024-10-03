import './AppTable.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AppButton from "../Utils/AppButton";
import { Box } from '@mui/material';
import Chip from '@mui/material/Chip';

function AppTable({ keyItem, list, updateFunc, deleteFunc }) {
  return (
    <TableContainer id='table-container' component={Paper}>
      <Table sx={{ minWidth: 650, width: '100%' }} stickyHeader>
        <TableHead>
          <TableRow>
            {Object.keys(keyItem).map((key) => (
              <TableCell 
                id='header-cell' 
                key={key} 
                sx={{ flexGrow: 1, textAlign: 'left', width: '15%' }}
              >
                {key}
              </TableCell>
            ))}
            <TableCell id='header-cell' sx={{ width: 300, textAlign: 'center' }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((prop, index) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {Object.keys(keyItem).map((key) => {
                if (key === "categories") {
                  return (
                    <TableCell key={key}>{prop[key].map((category, index) => 
                      { return (
                        <Chip key={`${index}-${category}`} label={category.name} />
                      )})}
                    </TableCell>
                  )
                } else {
                  return (
                    <TableCell 
                      id='body-cell' 
                      key={key} 
                      sx={{ flexGrow: 1, textAlign: 'left', width: '20%' }}
                    >
                      {typeof prop[key] === "object" ? prop[key].name : prop[key]}
                    </TableCell>
                  )
                }
              })}
              <TableCell id='action-cell' sx={{ width: 200, textAlign: 'center' }}>
                <Box id='action-buttons'>
                  <AppButton
                    text="Update"
                    buttonFunc={() => {updateFunc(prop)}}
                  />
                  <AppButton
                    id={prop.id}
                    text="Delete"
                    buttonFunc={deleteFunc}
                  />
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AppTable