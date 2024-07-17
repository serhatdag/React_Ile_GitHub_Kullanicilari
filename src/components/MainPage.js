import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "../Styles/MainPage.css"
import { width, height } from './Navbar';
import { Button } from 'bootstrap';
import { setSearchData } from '../Redux/Slice';
import axios from "axios";

const MainPage = () => {
  const selector = useSelector(state => state.github_data.data);
  const selector_search_data = useSelector(state => state.github_data.search_data);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [is_search, setIsSearch] = useState(false);
  const [button_disabled, setButtonDisabled] = useState(true)


  useEffect(() => {
    if (selector.length > 0) {
      setData(selector);
      setLoading(false);
    }
  })

  const searchData = (keyword) => {
    if(keyword.length > 0){
      setIsSearch(true);
      setLoading(false);
      axios.get(`https://api.github.com/search/users?q=${keyword}`).
      then((res) => {
              dispatch(setSearchData({data:res.data.items}))         
      })
      .then(()=>{setLoading(false);})
    }

    else{
      alert("Please enter a 'keyword'")
    }
    
  }

  useEffect(()=>{
    if(text.length > 0 && button_disabled == true){
      setButtonDisabled(false)
    }
    else if(text.length == 0 && button_disabled == false){
      setButtonDisabled(true)
    }
  },[text])

  const clearSearch = () => {
    setIsSearch(false);
    setText("");
  }

  return (
    <div className='main_page_container'>

      <div className='input_container' style={{ height: (height * 5) / 100, borderRadius: width / 160 }} >
        <input type='text' className='text_input' placeholder='keyword' value={text} onChange={(e)=>{setText(e.target.value)}} style={{ borderRadius: width / 160 }} />
        <input type='button' value={"Ara"} className='text_button' style={{ borderRadius: width / 160 }} onClick={()=>{searchData(text)}} />
        <input type='button' value={"Temizle"} disabled={button_disabled} className='text_button_clear' style={{ borderRadius: width / 160 }} onClick={()=>{clearSearch()}} />
      </div>


      {
        loading == true
          ?
          <div className="d-flex justify-content-center loading ">
            <div className="spinner-border" role="status">
              <span className="visually-hidden"></span>
            </div>
          </div>

          :

          <div className="content ">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
              {
                data
                &&
                is_search==false
                ?
                data.map((item) => {
                  return (
                    <div className="col mt-4 " key={item.id} >
                      <div className="card" style={{ borderRadius: width / 120 }}>
                        <div className="button_content " style={{ borderRadius: width / 120 }} onClick={() => { console.log(item.login) }} >
                          <img src={item.avatar_url} className="card-img-top" alt="..." style={{ borderRadius: width / 120 }} />
                          <div className="card-body">
                            <h5 className="card-text text_card text-light " >{item.login.length > 10 ? item.login.substring(0,7)+"...":item.login}</h5>
                            <a href={item.html_url} target='_blank' className="link_button" ><i className="bi bi-github text-light " style={{ fontSize: width / 50 }} ></i>  </a>
                          </div>
                        </div>
                      </div>
                    </div>

                  )
                })
                :

                selector_search_data != null && selector_search_data.map((item) => {
                  return (
                    <div className="col mt-4 " key={item.id} >
                      <div className="card" style={{ borderRadius: width / 120 }}>
                        <button className="button_content " style={{ borderRadius: width / 120 }} onClick={() => { console.log(item.login) }} >
                          <img src={item.avatar_url} className="card-img-top" alt="..." style={{ borderRadius: width / 120 }} />
                          <div className="card-body">
                            <h5 className="card-text text_card text-light " >{item.login.length > 10 ? item.login.substring(0,7)+"...":item.login}</h5>
                            <a href={item.html_url} target='_blank' className="link_button" ><i className="bi bi-github text-light " style={{ fontSize: width / 50 }} ></i>  </a>
                          </div>
                        </button>
                      </div>
                    </div>

                  )
                })
              }
            </div>
          </div>
      }

    </div>
  );
};

export default MainPage;
