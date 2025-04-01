import Searchbox from './component/search-box/search-box';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const App = () => {
  const [searchField, setsearchField] = useState('');

  const onSearchChange = (event)=> {
    const searchFieldString = event.target.value.toLocaleLowerCase();
     setsearchField(searchFieldString);
    };

  return (
    <div className="App">
      <h1 className='app-title'>ToDo list</h1>

      <Searchbox
        className='todo list'
        onChangeHandler={onSearchChange}
        placeholder='search monsters' />
    </div>
  );
}

export default App;
