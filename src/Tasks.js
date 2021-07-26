import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from './context/UserContext';
import ModalComponent from './components/ModalComponent';
import { Button } from 'react-bootstrap';
import { apiRequest } from './api';
import { Alert } from './components/Alert';

import './Tasks.css';

export default function Tasks() {
  const { tasks, setTasks } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [selectedTask, setSelectedTask] = useState('');
  const [taskId, setTaskId] = useState('');
  const [searchTask, setSearchTask] = useState('');

  /**
   * Show Modal
   * @param {String} selectedId
   */
  const showModal = (selectedId) => {
    setShow(true);

    if (typeof selectedId === 'string') {
      setTaskId(selectedId);

      apiRequest(`tasks/${selectedId}`, 'GET').then((response) => {
        setSelectedTask(response.task);
      });
    }
  };

  /**
   * Hide Modal
   */
  const hideModal = () => {
    setShow(false);
    setTaskId('');
    setSelectedTask('');
  };

  /**
   * Add or Update a task in Database depending on taskId is set or not
   * @param {String} task
   */
  const addUpdateTask = (task) => {
    if (taskId) {
      apiRequest(`tasks/${taskId}`, 'PUT', { task }).then((response) => {
        setShow(false);

        setNewTask(response);

        Alert('Success', 'Task Successfully Updated!', 'success');
      });
    } else {
      apiRequest(`tasks`, 'POST', { task }).then((response) => {
        setNewTask(response);

        setShow(false);

        Alert('Success', 'Task Successfully Created!', 'success');
      });
    }
  };

  /**
   * Mark the task as complete/incomplete in DB when user checks the box
   * @param {Event} e
   */
  const handleTaskComplete = (e) => {
    const id = e.target.value;
    const isComplete = e.target.checked ? true : false;

    apiRequest(`tasks/${id}`, 'PUT', { isComplete }).then((response) => {
      Alert('Success', 'Task Status Successfully Changed!', 'success');

      setNewTask(response);
    });
  };

  /**
   * Delete a task from DB when user clicks on the trash icon
   * @param {String} selectedId
   */
  const deleteTask = (selectedId) => {
    apiRequest(`tasks/${selectedId}`, 'DELETE').then(() => {
      Alert('Success', 'Task Successfully Deleted!', 'success');
    });
  };

  /**
   * Get all tasks from DB
   */
  const handleGetAllTasks = () => {
    apiRequest(`tasks`, 'GET').then((response) => {
      setTasks(response);
    });
  };

  /**
   * Run a search query in DB when user stops typing
   * @param {Event} e
   */
  const handleSearchOnChange = (e) => {
    setSearchTask(e.target.value);
  };

  /**
   * Wait for the user to finish typing, to avoid multiple api requests
   */
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      apiRequest(`tasks?search=${searchTask}`, 'GET').then((response) => {
        setTasks(response);
      });
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [searchTask]);

  /**
   * Initial call to the DB when the page is rendered (will run only once)
   */
  useEffect(() => {
    handleGetAllTasks();
  }, []);

  /**
   * Get latest tasks as soon as the task state is updated
   */
  useEffect(() => {
    handleGetAllTasks();
  }, [newTask]);

  return (
    <div className='tasks-page'>
      {Object.keys(tasks).length > 0 ? (
        <div className='container'>
          <div className='row mb-3'>
            <div className='col-lg-6 col-md-4 col-xs-12'>
              <h3 style={{ color: '#6c757d!important' }} className='text-lg-start text-center'>
                <strong>
                  Tasks
                </strong>
              </h3>
              
            </div>
            <div className='col-lg-6 col-md-8 col-xs-12'>
              <div className='row'>
                <div className='col-md-8 col-xs-12'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Search by task name'
                    onChange={handleSearchOnChange}
                  />
                </div>
                <div style={{
                  marginTop: -4,
                }}
                  className='col-md-4 col-xs-12'>
                  <Button
                    className='btn-block mr-1 mt-1 task-btn'
                    variant='primary'
                    block
                    onClick={showModal}
                    style={{
                      backgroundColor: '#5285ec'
                    }}
                  >
                    <i className='fas fa-plus'></i> New Task
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div style={{
                borderRadius: 11,
                padding: 20,
              }}
            className='card card-background card-background-mask-primary mt-md-0 mt-5 h-75'
          >
          <table className='table table-hover'>
            <tbody>
              {Object.entries(tasks).map(([index, task]) => {
                return (
                  <tr key={index}>
                    <th scope='row'>
                      <input
                        type='checkbox'
                        name='task'
                        defaultChecked={task.isComplete}
                        value={index}
                        onChange={handleTaskComplete}
                      />
                    </th>
                    <td className={task.isComplete ? 'mark-completed-table' : 'simple-task'}>
                      <strong>
                        {task.task}
                      </strong>
                    </td>
                    <td>
                      <i
                        onClick={() => showModal(index)}
                        className='fa fa-pencil'
                        aria-hidden='true'
                        style={{
                          color: '#647278'
                        }}
                      ></i>
                      <i
                        onClick={() => deleteTask(index)}
                        className='fa fa-trash'
                        aria-hidden='true'
                        style={{
                          color: '#647278'
                        }}
                      >
                      </i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      ) : (
        <div className='row no-task-card'>
          <div className='col-lg-4 offset-lg-4 col-md-4 offset-md-4'>
            <div style={{
                  borderRadius: 11,
                  padding: 20,
              }}
                className='card card-background card-background-mask-primary mt-md-0 mt-5'>
              <div className='card-body pt-5 text-center'>
                <h4>You have No task.</h4>
                  <Button
                    style={{
                      backgroundColor: '#5285ec'
                    }}
                    variant='primary'
                    onClick={showModal}>
                  <i className='fas fa-plus'></i> New Task
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ModalComponent
        show={show}
        hideModal={hideModal}
        addUpdateTask={addUpdateTask}
        selectedTask={selectedTask}
      />
    </div>
  );
}
