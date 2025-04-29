'use client';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Groups3Icon from '@mui/icons-material/Groups3';
import { DRAWER_WIDTH } from '@/constants';
import { AppBar, DrawerHeader } from './styles';
import ToggleColorMode from '../ThemeToggle';
import { AppRoutes } from '@/types';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import BugReportIcon from '@mui/icons-material/BugReport';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import Link from 'next/link';
import { useMediaQuery } from '@mui/material';

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
};

const DashboardDrawer: React.FC<Props> = ({ open, setOpen }) => {
  const drawerMenu = [
    {
      text: 'Staff Directry',
      icon: <Groups3Icon color='primary' />,
      id: 1,
      url: AppRoutes.STAFF_DIRECTORY,
    },
    {
      text: 'IT Support',
      icon: <LaptopChromebookIcon color='primary' />,
      id: 2,
      url: AppRoutes.IT_REQUEST,
    },
    {
      text: 'Tickets',
      icon: <BugReportIcon color='primary' />,
      id: 3,
      url: AppRoutes.TICKETS,
    },
    {
      text: 'Tasks&Todos',
      icon: <AssignmentTurnedInIcon color='primary' />,
      id: 4,
      url: AppRoutes.TODOS,
    },
  ];

  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:900px)');
  React.useEffect(() => {
    if (isMobile && open) {
      setOpen(false); // Close the drawer if the screen width is less than 900px
    }
  }, [isMobile]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position='fixed' open={open}>
        <Toolbar
          sx={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={[
              {
                mr: 2,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon color='primary' />
          </IconButton>
          <div className='flex items-center justify-between w-full'>
            <Typography variant='h6' noWrap component='div'>
              Internal Dashboard
            </Typography>
            <ToggleColorMode />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
          },
        }}
        variant='persistent'
        anchor='left'
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon color={'primary'} />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {drawerMenu.map((text, index) => (
            <ListItem key={text.id} disablePadding>
              <Link className='w-full' href={text.url}>
                <ListItemButton>
                  <ListItemIcon>{text.icon}</ListItemIcon>
                  <ListItemText primary={text.text} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
};
export default DashboardDrawer;
