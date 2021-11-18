import './App.css';
import axios from 'axios';
import jsSHA from 'jssha';

import { useState, useEffect } from 'react';
import Restaurant from './Restaurant';
import Hotel from './Hotel';
import Activity from './Activity';

function App() {

  const [data, setData] = useState([]);
  const [currentCity, setCity] = useState('Taipei');
  const [searchInput, setSearchInput] = useState('');
  const [topic, setTopic] = useState('ScenicSpot');
  const [restaurantlength, setRestaurantlength] = useState(0)
  const [hotellength, setHotellength] = useState(0)
  const [activitylength, setActivitylength]=useState(0)

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
      .get(`https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${currentCity}`, {
        headers: getAuthorizationHeader()
      })
      .then(function (response) {
        console.log(response.data)
        setData(response.data)
      })
      .catch(error => console.log(error));
  }, [currentCity]);

  const listItems = data.map((item) => {
    return (item.Name.includes(searchInput) && <div className='item-card' key={item.ID} >
      <h3>{item.Name}</h3>

      <ul className='class-tag'>
        <li>景點</li>
        {item.Class1 && <li>{item.Class1}</li>}
        {item.Class2 && <li>{item.Class2}</li>}
        {item.Class3 && <li>{item.Class3}</li>}
        {item.Level && <li>{item.Level}</li>}
      </ul>

      {item.Address && <p>Address:{item.Address}</p>}
      {item.Phone && <p>Phone: {item.Phone}</p>}
      {item.Picture.PictureUrl1 && <img src={item.Picture.PictureUrl1} alt="" />}
      {/* <p>{item.DescriptionDetail}</p> */}
      {item.TicketInfo && <p>票價：{item.TicketInfo}</p>}
      {item.Remarks && <p>注意事項：{item.Remarks}</p>}
      <p>資料更新時間：{item.SrcUpdateTime}</p>
    </div>)
  }


  );

  const city = citys.map(item => <option className='citybtn' key={item} value={item[1]}>{item[0]}</option>)

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

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
  }
  function handleTopic(item) {

    setTopic(item)


  }

  return (
    <div className="App">
      <input
        placeholder='Search...'
        onChange={(e) => searchItems(e.target.value)}
      />
      <select value={currentCity} onChange={(e) => handleCity(e.target.value)}>
        {city}
      </select>
      <h1>{citys.filter(item => item[1] === currentCity)[0][0]}</h1>

      <div className="tab">
        <button className="tablinks" onClick={() => handleTopic('ScenicSpot')}>景點({listItems.length})</button>
        <button className="tablinks" onClick={() => handleTopic('Restaurant')}>餐廳({restaurantlength})</button>
        <button className="tablinks" onClick={() => handleTopic('Hotel')}>住宿({hotellength})</button>
        <button className="tablinks" onClick={() => handleTopic('Activity')}>活動({activitylength})</button>
      </div>
      {topic === 'ScenicSpot' && <div>
        <hr />
        <header className="App-header">
          {listItems}
        </header></div>}
      {topic === 'Restaurant' && <Restaurant searchInput={searchInput} currentCity={currentCity} setRestaurantlength={setRestaurantlength} />}
      {topic === 'Hotel' && <Hotel searchInput={searchInput} currentCity={currentCity} setHotellength={setHotellength} />}
      {topic === 'Activity' && <Activity searchInput={searchInput} currentCity={currentCity} setActivitylength={setActivitylength} />}


    </div>
  );
}

export default App;
