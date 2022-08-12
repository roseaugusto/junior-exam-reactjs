import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiRequest from '../utils/apiRequest';

const AriticleForm = () => {
  const [article, setArticle] = useState({
    title: '',
    content: '',
  });
  const navigate = useNavigate();
  const { id } = useParams();

  const createArticle = async () => {
    await apiRequest
      .post('/articles/create/', article)
      .then((res) => {
        navigate('/articles', { state: { isSuccess: true, isAdd: true } });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateArticle = async () => {
    await apiRequest
      .patch(`/articles/${id}`, article)
      .then((res) => {
        navigate('/articles', { state: { isSuccess: true, isAdd: false } });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getArticle = async () => {
    await apiRequest
      .get(`/articles/${id}`)
      .then((res) => {
        console.log(res.data.title);
        setArticle({
          title: res.data.title,
          content: res.data.content,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (id) {
      getArticle();
    }
  }, []);

  return (
    <div className='main-layout'>
      <form className='bg-slate-200 shadow-md rounded p-6 mb-4'>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>Title</label>
          <input
            className='input-text'
            type='text'
            name='title'
            placeholder='Title'
            value={article.title}
            onChange={(e) => setArticle({ ...article, title: e.target.value })}
          />
        </div>
        <div className='mb-6'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>Content</label>
          <textarea
            className='input-text'
            name='content'
            value={article.content}
            onChange={(e) => setArticle({ ...article, content: e.target.value })}
          ></textarea>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <button
            className='primary-button font-bold'
            type='button'
            onClick={() => (id ? updateArticle() : createArticle())}
          >
            {id ? 'Update Article' : 'Add Article'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AriticleForm;
