import { useState, useEffect } from 'react';
import axios from 'axios';
import jsSHA from 'jssha';


const Activity =({currentCity,searchInput,setActivitylength})=>{
    
    const [data, setData] = useState([]);


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


    useEffect(() => {
        axios
          .get(`https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity/${currentCity}`, {
            headers: getAuthorizationHeader()
          })
          .then(function (response) {
            console.log(response.data)
            setData(response.data)
            
          })
          .catch(error => console.log(error));
         
      }, [currentCity])
     

      const listItems = data.map((item) => {
        return (item.Name.includes(searchInput) && <div className='item-card' key={item.ID} >
          <h3>{item.Name}</h3>
    
          <ul className='class-tag'>
            <li>活動</li>
            {item.Class1 && <li>{item.Class1}</li>}
            {item.Class2 && <li>{item.Class2}</li>}
          </ul>
    
          {item.Address && <p>Address:{item.Address}</p>}
          {item.Phone && <p>Phone: {item.Phone}</p>}
          {item.Picture.PictureUrl1 && <img src={item.Picture.PictureUrl1} alt="" />}
          {/* <p>{item.DescriptionDetail}</p> */}
          {item.TicketInfo && <p>票價：{item.TicketInfo}</p>}
          {item.Remarks && <p>注意事項：{item.Remarks}</p>}
          <p>資料更新時間：{item.SrcUpdateTime}</p>
        </div>)
      })
      if( listItems ){
        setActivitylength(listItems.length)
      }
      

    return(
       <div>
       
        <hr />
        <header className="App-header">
          {listItems}
        </header>
        </div>

    )
}

export default Activity;