import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import apiRequest from '../utils/apiRequest';

const Article = () => {
  const [articles, setArticles] = useState([]);
  const [message, setMessage] = useState({
    text: '',
    isShow: false,
    type: 0,
  });
  const location = useLocation();

  useEffect(() => {
    if (location.state !== null) {
      setMessage({
        text: `Successfully ${location.state.isAdd ? 'inserted' : 'updated'} an article`,
        isShow: true,
        type: 1,
      });
    }
  }, [location.state]);

  const getAllArticles = async () => {
    await apiRequest
      .get('/')
      .then((res) => {
        setArticles(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteArticle = async (id) => {
    await apiRequest
      .delete(`/articles/${id}`)
      .then((res) => {
        getAllArticles();
        setMessage({
          text: 'Successfully deleted the article',
          isShow: true,
          type: 1,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const resetMessage = () => {
    window.history.replaceState({}, document.title);
    setMessage({
      text: '',
      isShow: false,
      type: 0,
    });
  };

  const setFlashColor = () => {
    if (message.type === 2) {
      return 'bg-red-200';
    } else if (message.type === 1) {
      return 'bg-green-200';
    }

    return 'bg-gray-200';
  };

  const formatDescription = (desc, id) => {
    if (desc.length > 20) {
      return (
        <>
          {desc.slice(0, 20)}{' '}
          <a href={`articles/view/${id}`} className='italic hover:text-blue-500'>
            ...(Read More)
          </a>
        </>
      );
    }

    return desc;
  };

  useEffect(() => {
    getAllArticles();
  }, []);

  return (
    <div className='main-layout'>
      {message.isShow && (
        <div className={`flex justify-between items-center w-full p-3 mb-5 ${setFlashColor()}`}>
          <p>{message.text}</p>
          <button className='action-button bg-red-800 text-sm' onClick={() => resetMessage()}>
            Close
          </button>
        </div>
      )}
      <Link to='/articles/register'>
        <button className='primary-button'>Add Article</button>
      </Link>
      <div className='bg-slate-500 flex p-3 justify-items-between text-lg border text-white mt-8'>
        <div className='flex-1'>Title</div>
        <div className='flex-1'>Content</div>
        <div className='flex-1 text-right'>Actions</div>
      </div>
      {articles.map((article, index) => (
        <div className='bg-slate-200 flex p-3 justify-items-between' key={index}>
          <div className='flex-1'>{article.title}</div>
          <div className='flex-1'>{formatDescription(article.content, article.id)}</div>
          <div className='flex flex-1 justify-end gap-x-2 text-right'>
            <Link to={`/articles/${article.id}`}>
              <button className='action-button bg-green-600'>Edit</button>
            </Link>
            <button className='action-button bg-red-600' onClick={() => deleteArticle(article.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Article;
