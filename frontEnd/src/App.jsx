import { Link, Route, Routes } from 'react-router-dom';
import Groups from './pages/groups/Groups';
import NewEvent from './pages/newEvent/NewEvent';
import Group from './pages/group/Group';

import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/groups" element={<Groups />} />
        <Route path="/newEvent" element={<NewEvent />} />
        <Route path="/group/:groupId/*" element={<Group />} />
      </Routes>
    </>
  );
}

export default App;

