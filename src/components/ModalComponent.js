import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, FormControl } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function ModalComponent({
  titleName,
  show,
  hideModal,
  addUpdateTask,
  selectedTask,
}) {
  const [task, setTask] = useState('');

  /**
   * Calls a method to add/update a task
   */
  const handleAddTask = () => {
    addUpdateTask(task);
    setTask('');
  };

  /**
   * To update the initial state depanding on the props passed
   */
  useEffect(() => {
    setTask(selectedTask.task);
  }, [selectedTask]);

  return (
    <Modal show={show} onHide={hideModal} centered size='sm'>
      <Modal.Body>
        + {titleName} Task
        <FormControl
          type='text'
          placeholder='Task Name'
          name='task'
          className='mt-3'
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <div className='d-grid gap-2 mt-3'>
          <Button
            style={{
              backgroundColor: '#5285ec',
            }}
            variant='primary'
            disabled={!task}
            onClick={handleAddTask}
          >
            <i className='fas fa-plus'></i> {titleName} Task
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
