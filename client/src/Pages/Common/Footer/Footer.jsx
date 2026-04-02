import React from 'react';
import { Link } from 'react-router-dom';
import { FaBriefcase } from 'react-icons/fa';
import './Footer.css';
function Footer() {
    const userId = localStorage.getItem("custid")

    return (
        <footer className='footer'>
            <div className='container-fluid p-0 bg-primary-custom text-white'>
                <div className='row justify-content-center'>
                    <div className='col-md-3 py-5 px-4'>
                        <div className="d-flex align-items-center mb-3">
                            <FaBriefcase className="navbar-icon me-2" />
                            <Link className="text-white text-decoration-none fs-3 fw-bold" to="/">
                                Quick to click
                            </Link>
                        </div>
                        <p className='mb-1'>Chat Directly, Hire Instantly</p>
                        <p className='small'>Trusted by 3.8M+ verified job seekers and 190K+ verified recruiters.</p>
                    </div>
                    <div className='col-md-3 text-white py-5 px-4'>
                        <h5 className='fs-3 mb-4'>Links</h5>
                        <ul className='list-unstyled'>
                            {
                                userId === null ? (
                                    <li className='mb-2'>
                                        <Link className='text-white footer-links text-decoration-none' to={'/'}>Home</Link>
                                    </li>

                                ) : (
                                    <li className='mb-2'>
                                        <Link className='text-white footer-links text-decoration-none' to={'/customer-home'}>Home</Link>
                                    </li>

                                )
                            }
                            {
                                userId === null ? (
                                    <li className='mb-2'>
                                        <Link className='text-white footer-links text-decoration-none' to={'/alljobs'}>Works</Link>
                                    </li>

                                ) : (
                                    <li className='mb-2'>
                                        <Link className='text-white footer-links text-decoration-none' to={'/user-view-postjob'}>Works</Link>
                                    </li>

                                )
                            }
                            {
                                userId === null ? (
                                    <li className='mb-2'>
                                        <Link className='text-white footer-links text-decoration-none' to={'/aboutus'}>About Us</Link>
                                    </li>

                                ) : (<></>)
                            }
                        </ul>
                    </div>
                    <div className='col-md-3 text-white py-5 px-4'>
                        <h5 className='fs-3 mb-4'>Support</h5>
                        <p className='text-decoration-underline mb-1'>quicktoclickofficial@gmail.com</p>
                        <p className='mb-1'>For Recruiters</p>
                        <p className='mb-0'>Schedule a Call</p>
                    </div>
                </div>

            </div>

        </footer>
    )
}

export default Footer
