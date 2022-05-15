import './App.css';
import NewsFeed from './components/NewsFeed';
import CurrencyConverter from './components/CurrencyConverter';

const  App = () => {
  return (
    <div className="App">
      <CurrencyConverter />
      <NewsFeed />
    </div>
  );
}

export default App;
