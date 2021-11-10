import './App.css';
import axios from 'axios';
import jsSHA from 'jssha';

import { useState, useEffect } from 'react';

function App() {

  const [data, setData] = useState([]);
  const [currentCity, setCity] = useState(['臺北市', 'Taipei']);
  const citys =
    [
      ['臺北市', 'Taipei'],
      ['新北市', 'NewTaipei'],
      ['桃園市', 'Taoyuan'],
      ['臺中市', 'Taichung'],
      ['臺南市', 'Tainan'],
      ['高雄市', 'Kaohsiung'],
      ['基隆市', 'Keelung'],
      ['新竹市', 'Hsinchu'],
      ['新竹縣', 'HsinchuCounty'],
      ['苗栗縣', 'MiaoliCounty'],
      ['彰化縣', 'ChanghuaCounty'],
      ['南投縣', 'NantouCounty'],
      ['雲林縣', 'YunlinCounty'],
      ['嘉義縣', 'ChiayiCounty'],
      ['嘉義市', 'Chiayi'],
      ['屏東縣', 'PingtungCounty'],
      ['宜蘭縣', 'YilanCounty'],
      ['花蓮縣', 'HualienCounty'],
      ['連江縣', 'LienchiangCounty'],
      ['澎湖縣', 'PenghuCounty'],
      ['臺東縣', 'TaitungCounty'],
    ]

  useEffect(() => {
    axios
      .get(`https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${currentCity[1]}`, {
        headers: getAuthorizationHeader()
      })
      .then(function (response) {
        console.log(response.data)
        setData(response.data)
      })
      .catch(error => console.log(error));

  }, [currentCity]);

  const listItems = data.map((item) =>
    <div className='item-card' key={item.ID}>
      <h3>{item.Name}</h3>

      <ul className='class-tag'>
        {item.Class1 && <li>{item.Class1}</li>}
        {item.Class2 && <li>{item.Class2}</li>}
        {item.Class3 && <li>{item.Class3}</li>}
        {item.Level && <li>{item.Level}</li>}
      </ul>
      
      {item.Address&&<p>Address:{item.Address}</p>}
      {item.Phone&&<p>Phone: {item.Phone}</p>}
      {item.Picture.PictureUrl1&&<img src={item.Picture.PictureUrl1} alt="" />}
      {/* <p>{item.DescriptionDetail}</p> */}
      {item.TicketInfo && <p>票價：{item.TicketInfo}</p>}
      {item.Remarks && <p>注意事項：{item.Remarks}</p>}
      <p>資料更新時間：{item.SrcUpdateTime}</p>
    </div>

  );

  const city = citys.map(item => <div className='citybtn' key={item} onClick={() => handleCity(item)}>{item[0]}</div>)

  function getAuthorizationHeader() {
    //  填入自己 ID、KEY 開始
    let AppID = '368ef97460a54b2ea2f20dc70fc219e8';
    let AppKey = 'uCykbicq1p1HTtyvdgUhtRY0NKU';
    //  填入自己 ID、KEY 結束
    let GMTString = new Date().toGMTString();
    let ShaObj = new jsSHA('SHA-1', 'TEXT');
    ShaObj.setHMACKey(AppKey, 'TEXT');
    ShaObj.update('x-date: ' + GMTString);
    let HMAC = ShaObj.getHMAC('B64');
    let Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
    return { 'Authorization': Authorization, 'X-Date': GMTString };
  }

  function handleCity(item) {
    console.log(item)
    setCity(item)
  }
  return (
    <div className="App">

      {city}
      <h1 >{currentCity[0]}({listItems.length})</h1>
      <header className="App-header">

        {listItems}

      </header>
    </div>
  );
}

export default App;
