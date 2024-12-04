import React from 'react';
import "./App.css";
function App () {
    return (
        <div className="container">
            <div className="row">
                <div className="col">Header content</div>
            </div>
            <div className="row">
                <div className="col-sm-2">Left</div>
                <div className="col-sm-10">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">Main content</div>
                        </div>
                        
                        <div className="row">
                            <div className="col-sm-4 col-md-3">
                                <div className="card" style={{width: "100%"}}>
                                    <img src="..." class="card-img-top" alt="..."></img>
                                    <div className="card-body">
                                        <h5 className="card-title">Item1</h5>
                                        <p className="card-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus velit rerum maiores, officia tempore unde quidem esse modi commodi alias ab maxime possimus quam beatae cumque vel ipsum perferendis dolores?</p>
                                        <a href="#" className="btn btn-primary">View Detail</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4 col-md-3">
                                <div className="card" style={{ width: "100%" }}>
                                    <img src="..." class="card-img-top" alt="..."></img>
                                    <div className="card-body">
                                        <h5 className="card-title">Item1</h5>
                                        <p className="card-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus velit rerum maiores, officia tempore unde quidem esse modi commodi alias ab maxime possimus quam beatae cumque vel ipsum perferendis dolores?</p>
                                        <a href="#" className="btn btn-primary">View Detail</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4 col-md-3">
                                <div className="card" style={{ width: "100%" }}>
                                    <img src="..." class="card-img-top" alt="..."></img>
                                    <div className="card-body">
                                        <h5 className="card-title">Item1</h5>
                                        <p className="card-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus velit rerum maiores, officia tempore unde quidem esse modi commodi alias ab maxime possimus quam beatae cumque vel ipsum perferendis dolores?</p>
                                        <a href="#" className="btn btn-primary">View Detail</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4 col-md-3">
                                <div className="card" style={{ width: "100%" }}>
                                    <img src="..." class="card-img-top" alt="..."></img>
                                    <div className="card-body">
                                        <h5 className="card-title">Item1</h5>
                                        <p className="card-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus velit rerum maiores, officia tempore unde quidem esse modi commodi alias ab maxime possimus quam beatae cumque vel ipsum perferendis dolores?</p>
                                        <a href="#" className="btn btn-primary">View Detail</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div> 
            </div>
            <div className="row">
                <div className="col-md-4">Column1</div>
                <div className="col-md-4">Column2</div>
                <div className="col-md-4">Column3</div>
            </div>
        </div>
    )
}

export default App;