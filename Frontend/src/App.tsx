import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GetBlog } from './assets/Pages/Blog';
import { Publish } from './assets/Pages/Publish';
import { Signin } from './assets/Pages/Signin';
import { Signup } from './assets/Pages/Signup';
import { Blogs } from './assets/Pages/BlogsLists';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ProtectedRoute } from './Components/ProtectedRoute';
import { MyBlogs } from './assets/Pages/MyBlogs';


const App: React.FC = () => {
    return (
      <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path='/' element={<Signup/>}></Route>
          <Route path='/blog/:id' element={<GetBlog/>}></Route>
          <Route 
            path="/publish" 
            element={
              <ProtectedRoute>
                <Publish />
              </ProtectedRoute>
            } 
          />
          <Route path='/blogs' element={
            <ProtectedRoute>
              <Blogs/>

            </ProtectedRoute>
            }>

            </Route>
          <Route path='/MyBlogs' element={<MyBlogs/>}></Route>
        </Routes>
      </Router>
      </Provider>
    );
  };
  
  export default App;