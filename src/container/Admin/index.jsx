import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CategoryAPI from '../../API/CategoriesAPI';
import TableAPI from '../../API/TableAPI';
import { getKey } from '../../Features/getAuth';
import CategoriesAdmin from './Categories';
import ConfirmOrder from './ConfirmOrder';
import FoodsAdmin from './Foods';
import TableAdmin from './Table';
import { useNavigate } from 'react-router-dom';
import ChartAdmin from './Chart/Chart';

export default function AdminPage() {
  const [render, setRender] = useState(1);
  const [expanded, setExpanded] = useState('tab1');
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const [addCategory, setAddCategory] = useState('');
  const [openAddTable, setOpenAddTable] = useState(false);
  const [addTable, setAddTable] = useState('');

  const navigation = useNavigate();
  const handleChange = (panel) => (isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const confirmAddCategory = async () => {
    setOpenAddCategory(false);
    const category = {
      name: addCategory,
      deleteflag: null,
    };
    const res = await CategoryAPI.createCategory(category);
    console.log(res);
  };

  const confirmAddTable = async () => {
    setOpenAddTable(false);
    const newTable = {
      status: 0,
      numberOfChair: addTable,
    };
    const res = await TableAPI.createTable(newTable);
    console.log(res);
  };
  useEffect(() => {
    if (getKey('role') !== 'ROLE_ADMIN') {
      navigation('/');
    }
  }, []);
  return (
    <Grid container spacing={3} mt={1}>
      <Grid item md={3} xs={12}>
        <Paper variant='elevation' elevation={6}>
          <Stack spacing={2} p={2}>
            <Typography textAlign='center' variant='h5' mb={2}>
              Danh m???c
            </Typography>
            <Stack spacing={2}>
              <Accordion
                expanded={expanded === 'tab1'}
                onChange={handleChange('tab1')}
              >
                <AccordionSummary
                  aria-controls='panel1a-content'
                  onClick={() => setRender(1)}
                >
                  <Typography>Bi???u ????? doanh thu</Typography>
                </AccordionSummary>
              </Accordion>
              <Accordion
                expanded={expanded === 'tab2'}
                onChange={handleChange('tab2')}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1a-content'
                  onClick={() => setRender(2)}
                >
                  <Typography>Th??? lo???i</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Button
                    color='success'
                    onClick={() => setOpenAddCategory(true)}
                  >
                    Th??m th??? lo???i
                  </Button>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === 'tab3'}
                onChange={handleChange('tab3')}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel2a-content'
                  onClick={() => setRender(3)}
                >
                  <Typography>????? ??n</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Link to='/admin/foods/new-food'>
                    <Button color='success'>Th??m M??n</Button>
                  </Link>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === 'tab4'}
                onChange={handleChange('tab4')}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel2a-content'
                  onClick={() => setRender(4)}
                >
                  <Typography>Qu???n l?? b??n</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Button color='success' onClick={() => setOpenAddTable(true)}>
                    Th??m b??n
                  </Button>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === 'tab5'}
                onChange={handleChange('tab5')}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel2a-content'
                  onClick={() => setRender(5)}
                >
                  <Typography>X??c nh???n ????n h??ng</Typography>
                </AccordionSummary>
              </Accordion>
            </Stack>
          </Stack>
        </Paper>
      </Grid>
      <Grid item md={9} xs={12}>
        <Paper elevation={24}>
          <Typography variant='h5' pt={2} textAlign='center'>
            Qu???n l??
          </Typography>
          {render === 1 && <ChartAdmin />}
          {render === 2 && <CategoriesAdmin />}
          {render === 3 && <FoodsAdmin />}
          {render === 4 && <TableAdmin />}
          {render === 5 && <ConfirmOrder />}
        </Paper>
      </Grid>
      {/* Dialog for add new category */}
      <Dialog open={openAddCategory} onClose={() => setOpenAddCategory(false)}>
        <DialogTitle>{'Th??m th??? lo???i m???i: '}</DialogTitle>
        <DialogContent>
          <TextField
            label='T??n th??? lo???i'
            fullWidth
            variant='standard'
            onChange={(e) => setAddCategory(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddCategory(false)}>Disagree</Button>
          <Button onClick={confirmAddCategory} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog for add Table */}
      <Dialog open={openAddTable} onClose={() => setOpenAddTable(false)}>
        <DialogTitle>{'Th??m m???t b??n m???i: '}</DialogTitle>
        <DialogContent>
          <TextField
            label={`S??? gh??? c???a b??n n??y: `}
            fullWidth
            variant='standard'
            onChange={(e) => setAddTable(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddTable(false)}>Disagree</Button>
          <Button onClick={confirmAddTable} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
