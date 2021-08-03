// import React from "react";
// import {Button} from "../Button/Button";
//
// const AdvanceEntry = () => {
//
//     return (
//         <div className="background-white-wine">
//             <div className="card-add-wine-black">
//                 <form onSubmit={handleFormSubmit}>
//                     <h1>Advance Entry</h1>
//                     <label>
//                         Year:
//                         <input className="input-add-wine" type="text"
//                                onChange={handleFormChange}/>
//                     </label>
//                     <label>
//                         Region:
//                         <input type="text" className="input-add-wine"
//                                onChange={handleFormChange}/>
//                     </label>
//                     <label>
//                         Taste:
//                         <input type="text" className="input-add-wine"
//                                onChange={handleFormChange}/>
//                     </label>
//                     <label>
//                                     <textarea className="textarea-add-wine"
//                                               onChange={handleFormChange}/>
//                     </label>
//                     <div className="text-align-center">
//                         <Button className="btn" sizebutton="btn--large"
//                                 stylebutton="btn--dark-red-wine">Add</Button>
//                     </div>
//                     {error && (
//                         <div>
//                             {error.message}
//                         </div>
//                     )}
//                 </form>
//             </div>
//         </div>
//
//     );
// };
//
// export default AdvanceEntry;