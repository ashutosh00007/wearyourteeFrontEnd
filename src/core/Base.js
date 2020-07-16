import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "WEARYOURTEE.",
  description = "Where to find your tee ? HERE.",
  className = "p-4",
  children
}) => (
  <div>
  <Menu/>
    <div className="container-fluid grad">
      <div className="jumbotron bg-dark text-white text-center grad">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
      </div>
    </div>
    
    <div style={{marginBottom:70}} className={className}>{children}</div>

    <footer className="footer mt-auto py-3">
      <div className="container-fluid text-light text-center py-3">
        <h4>If you got any questions, feel free to reach out!</h4>
        <button className="btn btnclass btn-lg">Contact Us</button>
      </div>
      
				<div>
					<ul className="list-unstyled list-inline social text-center icons text-light">
						<li className="list-inline-item"><a href="facebook.com/ashutosh.rockx" rel="noopener noreferrer" target="_blank"><i className="fa fa-facebook"></i></a></li>
						<li className="list-inline-item"><a href="https://twitter.com/Ash_khajuria" rel="noopener noreferrer" target="_blank"><i className="fa fa-twitter"></i></a></li>
						<li className="list-inline-item"><a href="https://www.instagram.com/ashutosh__khajuria/" rel="noopener noreferrer" target="_blank"><i className="fa fa-instagram"></i></a></li>
						<li className="list-inline-item"><a href="https://www.linkedin.com/in/ashutosh-khajuria07" rel="noopener noreferrer" target="_blank"><i className="fa fa-linkedin"></i></a></li>
						<li className="list-inline-item"><a href="https://www.github.com/ashutosh00007" rel="noopener noreferrer" target="_blank"><i className="fa fa-github"></i></a></li>
					</ul>
				</div>
			
      <div className="container">
        <div className="text-muted">
          An Amazing place to find your perfect TEE <span className="text-white">WHEREYOURTEE.</span>
        </div>
        <div className="text-muted">
          Made with love by: <span className="text-white">Ashutosh Khajuria, Student at Lovely Professional University.</span>
        </div>
        <div className="text-muted">
          Contact Email: <span className="text-white">ashutoshkhajuria07@gmail.com</span>
        </div>
      </div>
    </footer>
  </div>
);

export default Base;
