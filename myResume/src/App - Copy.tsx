// import { useState } from 'react';
import './App.css'

function App() {
  // const [expand, setExpand] = useState(true);
  const expand = null;
  return (
    <div className="resumeContainer container">
      <div className="row">
        <div className={`border-end text-center position-relative sideBar ${expand ? 'col-md-3 expand' : 'col-md-1 collapsed'}`}>
          <div className="imgWrapper">
            <img src="personalImage.svg" alt="Passport Size Photo" />
          </div>
          <h2 className="mt-4">YOGESH JADHAV</h2>
          <strong>Sr. Software Developer</strong>
          <p>I am having 12+ years of experience in IT industry. Creativity have no limits but you with the same believe I want to explore and want to create something amazing.</p>
          {/* <ul className="list-group text-start">
            <li className="list-group-item d-flex justify-content-between align-items-start"><span>Angular</span><span className="badge text-bg-primary rounded-pill">8/10</span></li>
            <li className="list-group-item d-flex justify-content-between align-items-start"><span>React</span><span className="badge text-bg-primary rounded-pill">8/10</span></li>
            <li className="list-group-item d-flex justify-content-between align-items-start"><span>Bootstrap</span><span className="badge text-bg-primary rounded-pill">8/10</span></li>
            <li className="list-group-item d-flex justify-content-between align-items-start"><span>Node</span><span className="badge text-bg-primary rounded-pill">8/10</span></li>
            <li className="list-group-item d-flex justify-content-between align-items-start"><span>AWS</span><span className="badge text-bg-primary rounded-pill">8/10</span></li>
          </ul> */}
          {/* <ul className="list-group text-start">
            <li className="list-group-item"><a href="">Home</a></li>
            <li className="list-group-item"><a href="">About Us</a></li>
            <li className="list-group-item"><a href="">Blogs</a></li>
            <li className="list-group-item"><a href="">Contact Us</a></li>
          </ul> */}
          <a href="">Home</a> | <a href="">About Us</a> | <a href="">Blogs</a> | <a href="">Contact Us</a>
          <div className="col-md-12 mt-2">
            <button type="button" className="btn btn-outline-primary m-1">
              Angular <span className="badge text-bg-secondary">8/10</span>
            </button>
            <button type="button" className="btn btn-outline-primary m-1">
              React <span className="badge text-bg-secondary">8/10</span>
            </button>
            <button type="button" className="btn btn-outline-primary m-1">
              JS <span className="badge text-bg-secondary">8/10</span>
            </button>
            <button type="button" className="btn btn-outline-primary m-1">
              Bootstrap <span className="badge text-bg-secondary">8/10</span>
            </button>
            <button type="button" className="btn btn-outline-primary m-1">
              CSS3 <span className="badge text-bg-secondary">8/10</span>
            </button>
            <button type="button" className="btn btn-outline-primary m-1">
              AWS <span className="badge text-bg-secondary">8/10</span>
            </button>
          </div>
          <div className="col-md-12 mt-2">
            <img src="https://yogeshjadhav.tech/LTIM.png" width={40} className='me-2' alt="" />
            <img src="https://yogeshjadhav.tech/cybage_logo1.webp" height={20} className='me-2' alt="" />
            <img src="https://yogeshjadhav.tech/Capgemini_201x_logo.svg" height={20} className='me-2' alt="" />
            <img src="data:image/png;base64,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" width={50} className='me-2' alt="" />
            <img src="https://yogeshjadhav.tech/extremewebtech.jpg" height={20} className='me-2' alt="" />
          </div>
          <div className="col-md-12 mt-3">
            {/* <button className="btn btn-outline-primary w-100" onClick={() => setExpand(!expand)}>
              Collapse
              {/* <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg> * /}
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
            </button> */}
          </div>
        </div>
        <div  className={`bgGray border-top-right-10 border-bottom-right-10 ${expand ? 'col-md-9' : 'col-md-11'}`}>
          <div className="row">
            <div className="col-md-12">
              <div className="card mt-4">
                <div className="card-body">
                  <h5 className="card-title">About Me</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
              </div>
              <div className="card mt-2">
                <div className="card-body">
                  <h5 className="card-title">Motivation behind blogs</h5>
                  <blockquote>Knowledge is a sword. You have to use it and maintain it wisely so it will help you in your battle.</blockquote>
                  <p className="card-text">Now everyone must be thinking about the context and its reference. Why we have used this statement and how it is reffered to motivation behind this website?</p>
                  <p className="card-text">Within 13+ years of experience I have learned lot of things but which habbit helps me a lot is keeping reference of your knowledge as a POC, so whenever you work simillar kind of work you can easily find out its reference and you quickly worked on your task easily and effectly.</p>
                  <p className="card-text">In our computer we used to store all files in a structured way so that we can easily find required file, simillarly I have created this website to manitain one index with all POCs and study material I have learned so far.</p>
                  <p className="card-text">I would like to thanks all the people who are behind my knowledge and content. I have reffered all content from various websites and trainings. I try to draft it in my own words so it will be easy to understand [someone like me :)], and as because there are so many sites and tutors are behind this knowledge so I would not thanks each individual but frankly speaking I am really glad that I got your reference and knowledge to learn and share.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
