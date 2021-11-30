import './DetailCard.css'
import { AiFillCloseCircle } from 'react-icons/ai'
const DetailCard = ({ itemInfo, closeCard }) => {
    const setClose = () => {
        closeCard()
    }
    return (
        <div className='detail-card-back'>
            <div className='detail-card'>
                <div onClick={setClose}>
                    <AiFillCloseCircle />
                </div>
                <p>{itemInfo.Name}</p>
                <p>{itemInfo.DescriptionDetail}</p>

            </div>
        </div>
    )


}

export default DetailCard;