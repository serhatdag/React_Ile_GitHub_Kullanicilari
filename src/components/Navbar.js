import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import { setData } from '../Redux/Slice';
import { useDispatch} from 'react-redux';
import { NavLink } from 'react-router-dom';

export const width = window.innerWidth;
export const height = window.innerHeight;

const Navbar = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get("https://api.github.com/users").
            then((res) => {
                console.log(
                    dispatch(setData({data:res.data}))
                )
            })
    }, [])
    return (
        <header className='container' >
            <nav className=' bg-dark rounded header my_navbar' style={{height: (height*10)/100}} >
                <NavLink className="navlink">
                    <i className="bi bi-github" style={{fontSize: width/50}} ></i>                    
                </NavLink>
                <span className='navbar_text' style={{fontSize: width/75}} >GitHub Users</span>
            </nav>
            <div><Outlet /></div>
        </header>

    )
}

export default Navbar