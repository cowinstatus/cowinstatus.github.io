import './App.css';
import MainClass from './MainClass';
function App() {
  
  return (
    <div className="App">
      <header className="App-header">
       <h1>Check <a href="https://www.cowin.gov.in/" title="cowin site link">Cowin</a> Schedule Availability</h1>
       <sub>This project was initially created to get schedule availability from COWIN site as cowin site didn't contain availability which are now on top page.
         Will be adding notification feature soon. As of now, you can check if schedule is available for particular location and go to cowin site to book
       </sub>
       <MainClass />
      </header>
    </div>
  );
}

export default App;