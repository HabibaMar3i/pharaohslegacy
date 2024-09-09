import React from 'react';
import './NotFound.css'
import error from '../../Assets/error (6).png'
function NotFound() {
    return (
        <section className="d-flex align-items-center min-vh-100 py-5">
            <div className="container py-5">
                <div className="row align-items-center">
                    <div className="col-md-6 order-md-2">
                        <img src={error}/>
                    </div>
                    <div className="col-md-6 text-center text-md-start ">
                        <div className="lc-block mb-3">
                            <div editable="rich">
                                <h1 className="fw-bold h4">PAGE NOT FOUND!<br /></h1>
                            </div>
                        </div>
                        <div className="lc-block mb-3">
                            <div editable="rich">
                                <h1 className="display-1 fw-bold text-muted">Error 404</h1>
                            </div>
                        </div>
                        <div className="lc-block mb-5">
                            <div editable="rich">
                                <p className="rfs-11 fw-light"> The page you are looking for was moved, removed or might never existed.</p>
                            </div>
                        </div>
                        <div className="lc-block">
                            <button className="btn btn-lg btn-homepage">Back to homepage</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default NotFound;
