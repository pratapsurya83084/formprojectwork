//import component and rappe into div
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";

import SuccessSubmitForm   from './components/SuccessSubmitForm'
import Admin from './admin/Admin'
import ProtectedRoute from "./protectRoute/ProtectedRoute";
import Login from './login/Login'
import CreatePassword  from './components/forgotPassword/CreatePassword'


function App() {
  return (
 
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/submit/success" element={<SuccessSubmitForm/>}/>
       
      
     {/* if localstorage authtoken is present then redirects /admin otherwise not redirects */}
      
     <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
        
       <Route path="/login" element={<Login/>} />
        <Route path="/admin/Updatepassword"  element={<CreatePassword/>}/>
        </Routes>
      </Router>
     
  );
}

export default App;
