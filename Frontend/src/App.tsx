import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GetBlog } from './assets/Pages/Blog';
import { Publish } from './assets/Pages/Publish';
import { Signin } from './assets/Pages/Signin';
import { Signup } from './assets/Pages/Signup';
import { Blogs } from './assets/Pages/BlogsLists';


const App: React.FC = () => {
    return (
      <Router>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path='/' element={<Signup/>}></Route>
          <Route path='/blog/:id' element={<GetBlog/>}></Route>
          <Route path='/publish' element={<Publish/>}></Route>
          <Route path='blogs' element={<Blogs/>}></Route>
        </Routes>
      </Router>
    );
  };
  
  export default App;