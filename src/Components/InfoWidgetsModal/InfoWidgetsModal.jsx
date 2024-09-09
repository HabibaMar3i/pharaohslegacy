import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import InfoWidgets from '../InfoWidgets/InfoWidgets';

function InfoWidgetsModal({ open, onClose }) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogTitle>Information Widgets</DialogTitle>
            <DialogContent>
                <InfoWidgets />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default InfoWidgetsModal;
