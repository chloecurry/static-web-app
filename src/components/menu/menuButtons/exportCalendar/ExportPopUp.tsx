import { Button } from '@mui/material'
import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

const ExportPopUp = (props: any) => {
  const [open, setOpen] = React.useState(false)

  const handleClickIcs = () => {
    setOpen(true)
    // get all events for given calendar year
    // convert to ics using ics npm
    // download ics file that is generated 
  }

  const handleClose = () => {
    setOpen(false)
    props.updateState(0)
  }

  function ExportButton() {
    return (
    <Button
        className="menu-button"
        size="medium"
        variant="contained"
        color="primary"
        onClick={handleClickIcs}
        >
        Export 
    </Button>
    )
  }

  return (
    <>
      <ExportButton />
      <Dialog
        sx={{
          '& .MuiDialog-container': {
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '90vh'
          }
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Export Calendar'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please choose the format you would like to export the calendar in:
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}> Cancel</Button>
          <Button onClick={handleClickIcs} autoFocus>
            .ics
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ExportPopUp