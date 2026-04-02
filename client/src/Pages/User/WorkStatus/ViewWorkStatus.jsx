// import React,{useState} from 'react'
// import { Dropdown, Modal, NavDropdown } from 'react-bootstrap';
import edit_profile from '../../../Assets/edit_profile.png'
import viewstatusprofile from '../../../Assets/viewstatusprofile.png'
// import EditWorkStatus from './EditWorkStatus';
import './ViewWorkStatus.css'
import {useNavigate} from 'react-router-dom'

function ViewWorkStatus({close}) {

    const navigate =useNavigate();
    
    const navigateToEditWorkStatus=()=>{
        navigate('/user-edit-workstatus')
    }

   
return (
    <>
        <div className="viewworkstatus-modal-container">
	<article className="">
		<header className="viewworkstatus-modal-container-header">
			<span className="viewworkstatus-modal-container-title">
				Work Status
			</span>
			<button className="viewworkstatus-icon-button" onClick={close}>
            <svg fill="#fff" width="24px" height="24px" 
            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="m20.48 3.512c-2.172-2.171-5.172-3.514-8.486-3.514-6.628 0-12.001 5.373-12.001 12.001 0 3.314 1.344 6.315 3.516 8.487 2.172 2.171 5.172 3.514 8.486 3.514 6.628 0 12.001-5.373 12.001-12.001 0-3.314-1.344-6.315-3.516-8.487zm-1.542 15.427c-1.777 1.777-4.232 2.876-6.943 2.876-5.423 0-9.819-4.396-9.819-9.819 0-2.711 1.099-5.166 2.876-6.943 1.777-1.777 4.231-2.876 6.942-2.876 5.422 0 9.818 4.396 9.818 9.818 0 2.711-1.099 5.166-2.876 6.942z"/><path d="m13.537 12 3.855-3.855c.178-.194.287-.453.287-.737 0-.603-.489-1.091-1.091-1.091-.285 0-.544.109-.738.287l.001-.001-3.855 3.855-3.855-3.855c-.193-.178-.453-.287-.737-.287-.603 0-1.091.489-1.091 1.091 0 .285.109.544.287.738l-.001-.001 3.855 3.855-3.855 3.855c-.218.2-.354.486-.354.804 0 .603.489 1.091 1.091 1.091.318 0 .604-.136.804-.353l.001-.001 3.855-3.855 3.855 3.855c.2.218.486.354.804.354.603 0 1.091-.489 1.091-1.091 0-.318-.136-.604-.353-.804l-.001-.001z"/></svg>
			</button>
		</header>
		<section className="viewworkstatus-modal-container-body ">
        <form>
          <div>
            <div className='row'>
                <div className='col'>
                    <div className=''>
                        <button style={{border:'none',background:'#fff'}} 
                        onClick={navigateToEditWorkStatus}>
                            <img src={edit_profile} alt='img' />
                        </button>
                        
                    </div>

                    <div className='mt-3'>
                        <label className='viewworkstatus-label'>Job Name</label>
                    </div>
                    <div className='mt-3'>
                        <label  className='viewworkstatus-label'>Worker Name</label>
                    </div>
                    <div className='mt-3'>
                        <label  className='viewworkstatus-label'>Work Details</label>
                    </div>
                    <div className='mt-3'>
                        <label  className='viewworkstatus-label'>Status</label>
                    </div>
                </div>
                <div className='col mt-4'>
                    
                    <div className='mt-3'>
                        <label>:</label>
                    </div>
                    <div className='mt-4'>
                        <label>:</label>
                    </div>
                    <div className='mt-5'>
                        <label>:</label>
                    </div>
                    <div className='mt-4'>
                        <label>:</label>
                    </div>
                </div>
                <div className='col mt-4'>
                    
                    <div className='mt-3'>
                        
                           <label>name</label> 
                        
                    </div>
                    <div className='mt-3'>
                    
                           <label>worker name</label> 
                        
                    </div>
                    <div className='mt-3'>
                    
                           <label>worker details</label> 
                       
                    </div>
                    <div className='mt-3'>
                        
                           <label className='viewworkstatus-status'>Completed</label> 
                        
                    </div>
                </div>
                <div className='col'>
                <div className=''>
                        <button style={{border:'none',background:'#fff'}}>
                            <img src={viewstatusprofile} alt='img' />
                        </button>
                    </div>
                </div>
            </div>
          </div>
        </form>
		</section>
		<footer className="viewworkstatus-modal-container-footer mt-5">
			<button className="viewworkstatus-button is-primary" style={{background:'#3D9AE0'}}>Payment</button>
		</footer>
	</article>
        </div>
        
    </>
  )
}

export default ViewWorkStatus
