import AppRouter from "./router";
import { AuthProvider } from "./contexts/AuthContext";
import { DeptProvider } from "./contexts/DeptContext";

function App() {
   return (
    <AuthProvider>
    <DeptProvider>
 
      <AppRouter />
   
    </DeptProvider>
    </AuthProvider>
  );
}

export default App;


