import{useState,useEffect} from 'react';

import Searchbox from './component/search-box';
import ItemCard from './component/ItemList';
import CardItems from './component/CardItems';
import logo from './logo.svg';
import './App.css';
// import { useState } from 'react';

const App = () => {
  const [searchField,setsearchField] = useState('');
  const [fake_json,setfake_json] =useState([]);
  const [filteredfake_json,setFilterfake_json] = useState(fake_json);

 useEffect(()=>{
   setfake_json([
    {
      "id": 1,
      "itemName": "ashish"
    }, {
      "id": 2,
      "itemName": "Diskha"
    }, {
      "id": 3,
      "itemName": "Aman"
    },
  ]);
 },[])

  useEffect(() => {
    const newFilteredfake_jason = fake_json.filter((user) => {
      return user.itemName.toLocaleLowerCase().includes(searchField);
    });
    setFilterfake_json(newFilteredfake_jason);
  }, [fake_json, searchField]);
  


  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
     setsearchField(searchFieldString);
  };


  return (
    <div className="App">
      <h1 className='app-title'>ToDo list</h1>

      <Searchbox
        className='todo list'
        onChangeHandler={onSearchChange}
        placeholder='work list' />
      <CardItems items={filteredfake_json} />

    </div>
  );
}

export default App;
