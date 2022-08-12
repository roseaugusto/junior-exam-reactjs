import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/tailwind.output.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Article from './pages/Article';
import ArticleForm from './pages/AriticleForm';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/articles' element={<Article />} />
        <Route path='/articles/register' element={<ArticleForm />} />
        <Route path='/articles/:id' element={<ArticleForm />} />
        <Route path='/articles/view/:id' element={<ArticleForm />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
