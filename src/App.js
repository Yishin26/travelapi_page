import './App.css';
import axios from 'axios';
import jsSHA from 'jssha';

import { useState, useEffect } from 'react';

function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$top=20&$format=JSON', {
        headers: getAuthorizationHeader()
      })
      .then(function (response) {
        console.log(response.data)
        setData(response.data)
      })
      .catch(error => console.log(error));

  }, []);

  const listItems = data.map((item) =>
    <div  className='item-card' key={item.ID}>
      <h3>{item.Name}</h3>
      <p>{item.Address} / {item.Phone}</p>
      <img src={item.Picture.PictureUrl1} alt="" />
      <p>{item.Description}</p>
    </div>
    
  );

  function getAuthorizationHeader() {
    //  填入自己 ID、KEY 開始
    let AppID = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
    let AppKey = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
    //  填入自己 ID、KEY 結束
    let GMTString = new Date().toGMTString();
    let ShaObj = new jsSHA('SHA-1', 'TEXT');
    ShaObj.setHMACKey(AppKey, 'TEXT');
    ShaObj.update('x-date: ' + GMTString);
    let HMAC = ShaObj.getHMAC('B64');
    let Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
    return { 'Authorization': Authorization, 'X-Date': GMTString };
  }



  return (
    <div className="App">
      <header className="App-header">
        {listItems}

      </header>
    </div>
  );
}

export default App;
