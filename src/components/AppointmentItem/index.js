import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleStar} = props
  const {id, title, date, isStarred} = appointmentDetails

  const onClickStar = () => {
    toggleStar(id)
  }

  const imgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="list-item">
      <div className="display-container">
        <p className="title">{title}</p>
        <button
          className="star-button"
          type="button"
          onClick={onClickStar}
          data-testid="star"
        >
          <img src={imgUrl} className="icon" alt="star" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
