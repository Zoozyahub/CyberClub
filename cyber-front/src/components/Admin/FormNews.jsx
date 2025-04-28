import React from 'react'
import '../Admin/FormNews.css'

const FormNews = () => {

    const addNews = (e) => {
        e.preventDefault();
        const title = e.target.elements.title.value;
        const description = e.target.elements.description.value;
        const image = e.target.elements.image.value;
        const news = {title, description, image};
        fetch('http://localhost:8080/add-news',{
            method: 'POST',
            body: JSON.stringify(news),
            headers: {'content-type': "application/json"}
        }).then(res=>res.text()).then(res=>{
            console.log(res);
            alert("Новость добавлена!");
        })
    }

  return (
    <div className='form-news-container'>
        <form onSubmit={addNews}>
            <input type="text" placeholder='Заголовок новости' name='title' required/>
            <input type="text" placeholder='Описание новости' name='description' required/>
            <input type="text" placeholder='Картинка для новости' name='image' required/>
            <button>Добавить новость</button>
        </form>
    </div>
  )
}

export default FormNews