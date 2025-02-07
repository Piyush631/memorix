
import { RecoilRoot } from "recoil";
import { Signin } from "./components/Signin"
import { Signup } from "./components/Singup"
import { MainContent } from "./Pages/MainContent"
import { BrowserRouter , Routes,Route } from 'react-router-dom';
import { Bounce, ToastContainer} from 'react-toastify';
import { SharedPage } from "./Pages/SharedPage";
import { Notfound } from "./Pages/NotFound";

function App() {
 

return (
  <div >
    
    <RecoilRoot>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Signin/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/signin" element={<Signin/>} />
      <Route path="/dashboard" element={<MainContent/>}/>

      <Route path="/share/:sharelink" element={<SharedPage/>}/>
      <Route path="*" element={<Notfound/>}/>
    </Routes>
    
    </BrowserRouter>
    </RecoilRoot>
   
    <ToastContainer
position="bottom-right"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={true}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Bounce}
/>
  </div>
)
}

export default App
