import React from 'react'

function Modal(props) {
  return (
    <>
        <div className="modal modal-dialog-centered" id="myModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">{props.title}</h5>
                <button type="button" onClick={props.close} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <pre>{JSON.stringify(props.data,null, 2)}</pre>
            </div>
            <div className="modal-footer">
                <button type="button" onClick={props.close} className="btn btn-success">Okay</button>
            </div>
            </div>
        </div>
        </div>
    </>
  )
}

export default Modal