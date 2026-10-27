import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { officerContext } from '../../context/OfficerContext';
import { useContext } from 'react';

export function AddOfficers({editState=false,setEditState,id}){
  const [open, setOpen] = React.useState(false);
  const [cadre, setCadre] = React.useState('ACO');
  const [name,setName] = React.useState("");
  const [DOB,setDOB] = React.useState("");
  const [DOJ,setDOJ] = React.useState("");
  const [email,setEmail] = React.useState("");

  const [officers,setofficers] = useContext(officerContext);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditState(false);
    setName("");
    setEmail("");
    setDOB("");
    setDOJ("");
    setCadre("ACO");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editState) {
        setofficers(
            officers.map(officer =>
                officer.id === id
                    ? {
                        ...officer,
                        Name: name,
                        GovMail: email,
                        DOB: DOB,
                        DOJ: DOJ,
                        Cadre: cadre
                    }
                    : officer
            )
        );
    } else {
        setofficers([
            ...officers,
            {
                id: Date.now(),
                Name: name,
                GovMail: email,
                DOB: DOB,
                DOJ: DOJ,
                Cadre: cadre
            }
        ]);
    }

    handleClose();
};

    const handleChange = (event) => {
        setCadre(event.target.value);
    };

    React.useEffect(()=>{
        if(editState && id!==null){
            const officer = officers.find(officer => officer.id === id);
            setName(officer['Name']);
            setDOB(officer['DOB']);
            setDOJ(officer['DOJ']);
            setEmail(officer['GovMail']);
            setCadre(officer['Cadre']);
        }
    },[editState,id,officers])

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Officer
      </Button>
      <Dialog open={open||editState} onClose={handleClose}>
        <DialogTitle>{editState?("Edit Officer"):("Add Officer")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            All the mentioned details in the dialog are mandatory
          </DialogContentText>
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Enter Name..."
              type="text"
              fullWidth
              variant="standard"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="email"
              name="email"
              label="Enter Gov Mail id..."
              type="email"
              fullWidth
              variant="standard"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="DOB"
              name="DOB"
              label="Enter Date of Birth..."
              type="date"
              slotProps={{
                inputLabel: {
                shrink: true, // Prevents label overlapping with the native date placeholder
                },
              }}
              fullWidth
              variant="standard"
              value={DOB}
              onChange={(e)=>setDOB(e.target.value)}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="DOJ"
              name="DOJ"
              label="Enter Date of Joining..."
              type="date"
              slotProps={{
                inputLabel: {
                shrink: true, // Prevents label overlapping with the native date placeholder
                },
              }}
              fullWidth
              variant="standard"
              value={DOJ}
              onChange={(e)=>setDOJ(e.target.value)}
            />
            <InputLabel id="demo-simple-select-label">Cadre</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={cadre}
                    label="Cadre"
                    name="cadre"
                    onChange={handleChange}
                >
                    <MenuItem value={'ACO'}>ACO</MenuItem>
                    <MenuItem value={'ACS'}>ACS</MenuItem>
                    <MenuItem value={'AC/DC'}>AC/DC</MenuItem>
                </Select>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            {editState?"Update":"Add Officer"}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}