import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import CategoryAPI from '../../../API/CategoriesAPI';
import styles from './Categories.module.css';

export default function CategoriesAdmin() {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [Categories, setCategories] = useState([]);
  const [openDLFix, setOpenDLFix] = useState(false);
  const [openDLDelete, setOpenDLDelete] = useState(false);
  const [fixCategory, setFixCategory] = useState('');
  const [select, setSelect] = useState([]);
  const handleClickOpenFix = (item) => {
    setSelect(item);
    setOpenDLFix(true);
  };

  const handleClickOpenDelete = (item) => {
    setSelect(item);
    setOpenDLDelete(true);
  };

  const handleClose = () => {
    setOpenDLFix(false);
    setOpenDLDelete(false);
  };

  const confirmSetFixCategory = async () => {
    setOpenDLFix(false);
    setFixCategory('');
    setSelect([]);
    const category = {
      name: fixCategory,
    };
    const res = await CategoryAPI.updateCategory(select.id, category);
    console.log(res);
  };

  const confirmDeleteCategory = async () => {
    setOpenDLDelete(false);
    setSelect([]);
    const res = await CategoryAPI.deleteCategory(select.id);
    console.log(res);
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await CategoryAPI.getAllCategories();
      setCategories(res);
      console.log(res);
    };
    fetchData();
  }, []);
  return (
    <Grid container mt={1}>
      {Categories?.map((item, index) => (
        <Grid key={item.id} className={styles.BoxCategory} item m={1}>
          <Typography width={isMobile ? 200 : '100%'}>
            {index + 1}, {item.name}
          </Typography>
          <Stack direction='row' spacing={1} position='absolute' right='1%'>
            <Button
              size='small'
              onClick={() => handleClickOpenFix(item)}
              variant='contained'
            >
              S???a
            </Button>
            <Button
              size='small'
              variant='contained'
              color='error'
              onClick={() => handleClickOpenDelete(item)}
            >
              X??a
            </Button>
          </Stack>
        </Grid>
      ))}
      {/* Dialog for fixCategory */}
      <Dialog open={openDLFix} onClose={handleClose}>
        <DialogTitle>{'S???a th??ng tin th??? lo???i: ' + select.name}</DialogTitle>
        <DialogContent>
          <TextField
            label='T??n th??? lo???i'
            fullWidth
            variant='standard'
            onChange={(e) => setFixCategory(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={confirmSetFixCategory} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog for deleteCategory */}
      <Dialog open={openDLDelete} onClose={handleClose}>
        <DialogTitle>{'X??a tr?????ng th??ng tin: ' + select.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            B???n ch???c ch???n mu???n x??a: {select.name}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={confirmDeleteCategory} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
