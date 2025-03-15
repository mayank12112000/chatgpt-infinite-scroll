import React from 'react';
import { Link } from 'react-router-dom';
import "./navbar.css"
const Navbar = () => {
    return (
        <nav className=" navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" href="#">ChatGPTs <i className="fa fa-chevron-circle-down" aria-hidden="true"></i></Link>
                <div>

                <button style={{border:"2px grey solid",borderRadius:"1.25rem"}} className='btn mx-2'>Share <i className="fa fa-share-square" aria-hidden="true"></i></button>

                <img style={{width:"2.25rem",borderRadius:"50%"}} src="https://lh3.googleusercontent.com/a/AEdFTp5pWJTt2-lzs0pJlgPXX5NpCD09K8Ic51RFKE4pEQ=s96-c" alt="" />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;