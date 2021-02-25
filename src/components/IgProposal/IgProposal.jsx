import React, { useEffect, useState } from 'react';
import axios from 'axios';

const IgProposal = () => {
  const initialState = { igHandle: '', igPosts: 0, igChecked: false }
  const [igUser, setIgUser] = useState(initialState);
  const [listOfHandles, setListOfHandles] = useState([]);
  
  
  const addHandleToList = () => {
    setListOfHandles((oldArr) => [...oldArr, { handle: igUser.igHandle, posts: igUser.igPosts, checked: igUser.igChecked }]);
    setIgUser(initialState);
  };

  const handleOnCheck = (e) => {
    const { name } = e.target;

    let newArr = listOfHandles.map((item) => {
      if (item.handle === name) {
        item.checked = !item.checked
      }
      return item
    })
    console.log('check',newArr)
    setListOfHandles(newArr)
  }

  const handleNumOfPosts = (e) => {
    const { name, value } = e.target;
    let newArr = listOfHandles.map((item) => {
      if (item.handle === name) {
        item.posts = value
      }
      return item
    })
    console.log('post',newArr)
    setListOfHandles(newArr)


  }

  const showSelected = async () => {
    let selectedHandles = listOfHandles.filter(item => item.checked)
    console.log('selected', selectedHandles)
    const { data } = await axios.post('http://localhost:5000/ig-proposal', {
      selectedHandles,
    })
    console.log('data', data)
  }



  // useEffect(() => {
  //   console.log('iguser: ', igUser);
  // }, [igUser]);

  // useEffect(() => {
  //   console.log('checkedItems: ', checkedItems);
  // }, [checkedItems]);

  // useEffect(() => {
  //   console.log('list: ', listOfHandles);
  // }, [listOfHandles]);

  return (
    <div>
      <h1>IG Stats for Proposal</h1>
      <input
        type="text"
        name="igHandle"
        placeholder="Add IG handle"
        value={igUser.igHandle}
        onChange={(e) => setIgUser({...igUser, [e.target.name]:e.target.value})}
        style={{ marginRight: '10px' }}
      />
      <button type="button" onClick={addHandleToList}>
        Add
      </button>
      {listOfHandles.length > 0 && (<>
        <ul>
          {listOfHandles.map((listItem, ind) => (
            <li
              key={ind}
              style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid red',
              }}
            >
              <input
                type="checkbox"
                name={listItem.handle}
                checked={listItem.checked}
                onChange={handleOnCheck}
                style={{ marginRight: '10px' }}
                />
              <p style={{ border: '1px dashed blue', margin: '10px', width: '140px' }}>{listItem.handle}</p>
              <input
                type="number"
                name={listItem.handle}
                placeholder="Num of posts"
                value={listItem.posts}
                onChange={handleNumOfPosts}
                style={{ marginLeft: '10px' }}
              />
            </li>
          ))}
        </ul>
        <button onClick={showSelected}>Upload</button>
        </>
      )}
    </div>
  );
};

export default IgProposal;

/* <div>
  <h1>Stats</h1>
  <div>
    <h4>Followers:</h4>
    <p>{amountOfFollowers}</p>
  </div>
  <div>
    <h4>Avg Likes for last {numOfPosts} Posts:</h4>
    <p>{averageLikes}</p>
  </div>
</div> */
