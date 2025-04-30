import { useTodos } from '@/providers/TodosProvider';
import { Todo } from '@/types';
import {
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useState } from 'react';
import TodosForm from './TodoForm';

type Props = {
  todos: Todo;
};
const TodoItem: React.FC<Props> = ({ todos }) => {
  const { deleteTodo } = useTodos();
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const handleDeleteOpen = () => {
    setOpenDelete(true);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };
  const handleEditOpen = () => {
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  return (
    <>
      <Card
        component={'li'}
        className='p-4 shadow-md hover:shadow-lg transition-shadow duration-300'
      >
        <Typography
          sx={{
            fontWeight: 'bold',
            textOverflow: 'hidden',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            maxWidth: '100%',
          }}
          variant='h5'
        >
          {todos.title}
        </Typography>
        <FormControlLabel
          sx={{
            pointerEvents: 'none',
            fontSize: '1.2rem',
          }}
          label={todos.completed ? 'Completed' : 'Not Completed'}
          control={<Checkbox checked={todos.completed} color='primary' />}
        />
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <Button
            onClick={handleDeleteOpen}
            sx={{
              width: '100%',
            }}
          >
            Delete
          </Button>
          <Button
            onClick={handleEditOpen}
            sx={{
              width: '100%',
            }}
            variant='outlined'
          >
            Edit
          </Button>
        </Stack>
      </Card>
      <Dialog
        open={openDelete}
        onClose={handleDeleteClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to delete this todo?
            <br />
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancel</Button>
          <Button
            onClick={() => {
              deleteTodo(todos.id);
              handleDeleteClose();
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openEdit}
        onClose={handleEditClose}
        aria-labelledby='Todo form dialog'
        aria-describedby='Todo form dialog used to edit todos'
      >
        <DialogContent>
          <TodosForm
            id={todos.id}
            title={todos.title}
            completed={todos.completed}
            handleClose={handleEditClose}
            isEdit={true}
          />
        </DialogContent>
        <DialogActions sx={{ padding: '1rem' }}>
          <Button onClick={handleEditClose}>Cancel</Button>
          {/* <Button
            onClick={() => {
              deleteTodo(todos.id);
              handleClose();
            }}
            autoFocus
          >
            Yes
          </Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
};
export default TodoItem;
