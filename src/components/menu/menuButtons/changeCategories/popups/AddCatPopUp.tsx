import { Button } from '@mui/material'
import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { APIManager } from '@/utils/APIManager'
import { useAPIContext } from '@/store/APIContext'
import { icons } from '@/interfaces/Icons'
import { Category } from '@/interfaces/Category'

const AddCatPopUp = (props: any) => {
  const [open, setOpen] = useState(false)
  const { categories, setCategories } = useAPIContext()
  const admin_id_1 = 'user'
  const [popup, setPopup] = useState(100)

  const duplicateCheck = () => {
    APIManager.getInstance()
      .then((instance) => instance.getCategory())
      .then((data) => {
        setCategories(data.result)
      })
      .then(() => {
        let err = 0
        for (let i = 0; i < categories.length; i++) {
          if (categories[i].category_name === props.name) {
            console.log('name error')
            err += 1
            setPopup(1)
          } else if (
            categories[i].icon === props.icon &&
            props.color === categories[i].color
          ) {
            console.log('colour and symbol error')
            err += 1
            setPopup(2)
          }
        }
        if (err === 0) {
          addCategory(props.name, admin_id_1, props.icon, props.color)
          setPopup(0)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  async function addCategory(
    category_name: string,
    admin_id: string,
    icon: keyof typeof icons,
    color: string
  ) {
    let payload: Category = {
      category_id: null,
      category_name: category_name,
      admin_id: admin_id,
      icon: icon,
      color: color
    }
    APIManager.getInstance()
      .then((instance) => instance.addCategory(payload))
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleClickOpen = () => {
    duplicateCheck()
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    props.clickAway()
    props.updateState(0)
    setPopup(100)
  }

  function AddCategoryButton() {
    return (
      <Button
        className="menu-button"
        size="medium"
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
      >
        Add Category
      </Button>
    )
  }

  const Success = () => {
    return (
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
        <DialogTitle id="alert-dialog-title">{'Category Added'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Category {props.name} added successfully.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  const DuplicateName = () => {
    return (
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
        <DialogTitle id="alert-dialog-title">
          {'Category Not Added'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The name "{props.name}" is already in use by another category.
            Please try another name.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  const DuplicateCombo = () => {
    return (
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
        <DialogTitle id="alert-dialog-title">
          {'Category Not Added'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Colour and symbol combination already in use. Please try a unique
            combination.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  return (
    <>
      <AddCategoryButton />
      {popup === 0 ? (
        <Success />
      ) : popup === 1 ? (
        <DuplicateName />
      ) : popup === 2 ? (
        <DuplicateCombo></DuplicateCombo>
      ) : null}
    </>
  )
}

export default AddCatPopUp