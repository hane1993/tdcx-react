import React, { useContext } from 'react';
import Header from './Header';
import Tasks from './Tasks';
import { UserContext } from './context/UserContext';
import { PieChart } from './components/PieChart';

import './Dashboard.css';

export default function Dashboard() {
  const { tasks } = useContext(UserContext);

  const getTotalTasks = () => {
    return Object.keys(tasks).length;
  };

  const getTasksCompleted = () => {
    const completedTasks = Object.entries(tasks).filter(([index, task]) => {
      return task.isComplete;
    });

    return completedTasks.length;
  };

  const getLatestTasks = () => {
    const total = 3;
    const result = {};

    for (var index = 0; index < total; index++) {
      var key = Object.keys(tasks)[index];
      result[key] = tasks[key];
    }

    return result;
  };

  return (
    <div>
      <Header />
      <div className='container mt-5'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-lg-4 col-md-6'>
              <div style={{
                  borderRadius: 11,
                  padding: 20,
                }}
                className='card card-background card-background-mask-primary mt-md-0 mt-5 h-75'>
                <div className='full-background'></div>
                <div className='card-body pt-1 dashboard-widgets'>
                  <div className='icon mx-auto text-lg'>
                    <i className='ni ni-html5'></i>
                  </div> 
                  <h3 className='text-secondary mb-2'><strong>Tasks Completed</strong></h3>
                  <p>
                    <span style={{
                      fontWeight: 'bold',
                      padding: 4
                    }}
                      className='completed-tasks text-primary'>
                      {getTasksCompleted()}
                    </span>
                    <strong>/</strong>
                    <span style={{ padding: 4}} className='total-tasks'>
                      <strong>
                        {getTotalTasks()}
                      </strong>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className='col-lg-4 col-md-6'>
              <div style={{
                  borderRadius: 11,
                  padding: 20,
              }}
                className='card card-background card-background-mask-primary mt-md-0 mt-5 h-75'>
                <div className='full-background'></div>
                <div style={{
                  padding: 5
                }} className='card-body pt-1 dashboard-widgets'>
                  <div className='icon mx-auto text-lg'>
                    <i className='ni ni-html5'></i>
                  </div>
                  <h3 className='text-secondary mb-2'><strong>Latest Created Tasks</strong></h3>
                  <ul>
                    {Object.keys(tasks).length > 0
                      ? Object.entries(getLatestTasks()).map(
                          ([index, task]) => {
                            if (task) {
                              return (
                                <li
                                  key={index}
                                  style={{
                                    color: '#94a2a6',
                                    fontWeight: 'bold',
                                    textDecorationThickness: 2,
                                    textDecorationColor: '#707070'
                                  }}
                                  className={
                                    task.isComplete ? 'mark-completed' : ''
                                  }
                                >
                                  {task.task}
                                </li>
                              );
                            }
                          }
                        )
                      : ''}
                  </ul>
                </div>
              </div>
            </div>
            <div className='col-lg-4 col-md-6'>
              <div style={{
                  borderRadius: 11,
                  padding: 20,
              }}
                className='card card-background card-background-mask-primary mt-md-0 mt-5 h-75'>
                <div className='full-background'></div>
                <div className='card-body pt-1 dashboard-widgets'>
                  <PieChart
                    completedTasks={getTasksCompleted()}
                    totalTasks={getTotalTasks()}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Tasks />
      </div>
    </div>
  );
}
