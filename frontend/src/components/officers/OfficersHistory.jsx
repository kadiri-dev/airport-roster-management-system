import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useContext, useState } from 'react';
import { AddOfficers } from './ModifyOfficers';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { officerContext } from '../../context/OfficerContext';

export function OfficerHistory(){
    const[txt,setTxt]=useState("");
    const [open,setOpen] = useState(false);
    const [id,setId] = useState(null);
    const [editState,setEditState]=useState(false);
    const [officers,setOfficers] = useContext(officerContext);
    let officerData =
    txt !== ""
    ? officers.filter(officer =>
        Object.values(officer).some(value =>
          String(value).toLowerCase().includes(txt.toLowerCase())
        )
      )
    : officers;

    const handleSubmit = () => {
        setOfficers(officerData.filter(officer=>officer.id!==id));
        setOpen(false);
        setId(null);
    }
    
    const handleDelete = (id) => {
        setOpen(true);
        setId(id);
    }

    const handleClose = () => {
        setOpen(false);
        setId(null);
    };

    return (
        <>
            <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{display:"flex",
                gap: 2,
                mb:2
            }}
            >
                <TextField
                id="outlined-required"
                defaultValue="name...."
                value={txt}
                 placeholder="Search officer..."
                onChange={(e)=>setTxt(e.target.value)}
                />
                <AddOfficers editState={editState} setEditState={setEditState} id={id}/>
            </Box>
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>
                        Serial Number
                    </TableCell>
                    <TableCell>
                        Name
                    </TableCell>
                    <TableCell>
                        DOB
                    </TableCell>
                    <TableCell>
                        DOJ
                    </TableCell>
                    <TableCell>
                        Gov Mail
                    </TableCell>
                    <TableCell>
                        Cadre
                    </TableCell>
                </TableRow>
            </TableHead>
                <TableBody>
                    {officerData.map((officer,index)=>(<TableRow key={officer.id} sx={{
    '&:hover': {
      backgroundColor: 'action.hover'
    }
  }}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{officer.Name}</TableCell>
                    <TableCell>{officer.DOB}</TableCell>
                    <TableCell>{officer.DOJ}</TableCell>
                    <TableCell>{officer.GovMail}</TableCell>
                    <TableCell>{officer.Cadre}</TableCell>
                    <TableCell><Button onClick={()=>{setEditState(true);setId(officer.id)}}><EditIcon/>Edit</Button></TableCell>
                    <TableCell><Button onClick={()=>{handleDelete(officer.id)}}><DeleteIcon/>Delete</Button></TableCell>
                    </TableRow>))}
                    <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Delete Officer</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Do you want to Delete the Row really?
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit" onClick={handleSubmit}>
                          Delete
                        </Button>
                    </DialogActions>
                    </Dialog>
                </TableBody>
        </Table>
    </TableContainer>
    </>);
}

