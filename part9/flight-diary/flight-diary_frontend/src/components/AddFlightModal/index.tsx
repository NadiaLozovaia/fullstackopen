import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';

import AddFlightForm from "./AddFlightForm";
import { NewDiaryEntry } from "../../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewDiaryEntry) => void;
  error?: string;
}

const AddFlightModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new patient</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      <AddFlightForm onSubmit={onSubmit} onCancel={onClose}/>
    </DialogContent>
  </Dialog>
);

export default AddFlightModal;
