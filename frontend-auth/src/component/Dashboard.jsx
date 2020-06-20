import React from 'react';

const Dashboard = ({loggedInStatus}) => {
     return ( 
          <div>
               <h1>Dashboard</h1>
               <h1>Status: {loggedInStatus}</h1>
          </div>
     );
}

export default Dashboard;