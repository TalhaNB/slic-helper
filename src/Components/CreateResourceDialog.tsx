import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControlLabel, Grid2, Switch } from "@mui/material";

interface CreateResourceProps {
  handleClose: () => void;
  origin: "Client" | "Sales Representative" | "Sales Manager";
}
const CreateResource: React.FC<CreateResourceProps> = ({ handleClose, origin }) => {
  return (
    <Dialog
      open
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          console.log("formJson", formJson);
          handleClose();
        },
      }}
    >
      <DialogTitle>Add New {origin}</DialogTitle>
      <DialogContent>
        <DialogContentText>Fill out this form to add a new {origin} to your records.</DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="code"
          name="code"
          label="Code"
          type="code"
          fullWidth
          variant="standard"
        />
        <TextField
          required
          margin="dense"
          id="firstName"
          name="firstName"
          label="First Name"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          required
          margin="dense"
          id="lastName"
          name="lastName"
          label="Last Name"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          margin="dense"
          id="email"
          name="email"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
        <TextField
          margin="dense"
          id="phone"
          name="phone"
          label="Phone Number"
          type="phone"
          fullWidth
          variant="standard"
        />
        <FormControlLabel control={<Switch />} id="bDayAlert" name="bDayAlert" label="Enable Birthday Alerts" />
        <Grid2 size={12} mt={1}>
          <label htmlFor="birthday">Birthday: &nbsp;</label>
          <input type="date" id="birthday" name="birthday" />
        </Grid2>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateResource;
