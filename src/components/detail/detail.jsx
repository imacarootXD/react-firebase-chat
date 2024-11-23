import "./detail.css"

const Detail = () => {
    return (
      <div className='detail'>
         <div className="user">
            <img src="./avatar.png" alt="" />
            <h2>the user</h2>
            <p>description description description description description</p>
         </div>
         <div className="info">
            <div className="option">
               <div className="title">
                  <span>chat settings</span>
                  <img src="./arrowUp.png" alt="" />
               </div>
            </div>
            <div className="option">
               <div className="title">
                  <span>chat settings</span>
                  <img src="./arrowUp.png" alt="" />
               </div>
            </div>
            <div className="option">
               <div className="title">
                  <span>privacy and help</span>
                  <img src="./arrowUp.png" alt="" />
               </div>
            </div>
            <div className="option">
               <div className="title">
                  <span>shared photos</span>
                  <img src="./arrowDown.png" alt="" />
               </div>
               <div className="photos">
                  <div className="photoItem">
                     <div className="photoDetail">
                        <img src="https://th.bing.com/th/id/R.1f845bd1a8aab9436352c02e2289ddaf?rik=XE2G8WrgIRrElA&pid=ImgRaw&r=0" alt="" />
                        <span>date of image</span>
                     </div>
                     <img src="./download.png" alt="" className="icon" />
                  </div>

               <div className="photoItem">
                     <div className="photoDetail">
                        <img src="https://th.bing.com/th/id/R.1f845bd1a8aab9436352c02e2289ddaf?rik=XE2G8WrgIRrElA&pid=ImgRaw&r=0" alt="" />
                        <span>date of image</span>
                     </div>
                     <img src="./download.png" alt="" className="icon" />
                  </div>
                  <div className="photoItem">
                     <div className="photoDetail">
                        <img src="https://th.bing.com/th/id/R.1f845bd1a8aab9436352c02e2289ddaf?rik=XE2G8WrgIRrElA&pid=ImgRaw&r=0" alt="" />
                        <span>date of image</span>
                     </div>
                     <img src="./download.png" alt="" className="icon" />
                  </div>
                  <div className="photoItem">
                     <div className="photoDetail">
                        <img src="https://th.bing.com/th/id/R.1f845bd1a8aab9436352c02e2289ddaf?rik=XE2G8WrgIRrElA&pid=ImgRaw&r=0" alt="" />
                        <span>date of image</span>
                     </div>
                     <img src="./download.png" alt="" className="icon" />
                  </div>
                  <div className="photoItem">
                     <div className="photoDetail">
                        <img src="https://th.bing.com/th/id/R.1f845bd1a8aab9436352c02e2289ddaf?rik=XE2G8WrgIRrElA&pid=ImgRaw&r=0" alt="" />
                        <span>date of image</span>
                     </div>
                     <img src="./download.png" alt="" className="icon" />
                  </div>
                  <div className="photoItem">
                     <div className="photoDetail">
                        <img src="https://th.bing.com/th/id/R.1f845bd1a8aab9436352c02e2289ddaf?rik=XE2G8WrgIRrElA&pid=ImgRaw&r=0" alt="" />
                        <span>date of image</span>
                     </div>
                     <img src="./download.png" alt="" className="icon" />
                  </div>  
               </div>             
            </div>
            <div className="option">
               <div className="title">
                  <span>shared files</span>
                  <img src="./arrowUp.png" alt="" />
               </div>
            </div>
            <button>block user</button>
            <button className="logout">logout</button>
         </div>
      </div>
   );
};
  
export default Detail