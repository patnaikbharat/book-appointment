import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentsList: [],
    isFilterActive: false,
  }

  toggleStar = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  updateFilterStatus = () => {
    this.setState(prevState => ({isFilterActive: !prevState.isFilterActive}))
  }

  updateTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  updateDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  addAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    if (titleInput !== '' && dateInput !== '') {
      const formattedDate = format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      const newAppointment = {
        id: uuidv4(),
        title: titleInput,
        date: formattedDate,
        isStarred: false,
      }
      this.setState(prevState => ({
        appointmentsList: [...prevState.appointmentsList, newAppointment],
        titleInput: '',
        dateInput: '',
      }))
    }
  }

  filteringArray = () => {
    const {appointmentsList, isFilterActive} = this.state
    if (isFilterActive) {
      const filterArrays = appointmentsList.filter(
        eachAppointment => eachAppointment.isStarred === true,
      )
      return filterArrays
    }
    return appointmentsList
  }

  render() {
    const {titleInput, dateInput} = this.state
    const filteredArray = this.filteringArray()

    return (
      <div className="bg-container">
        <div className="card-container">
          <div className="top-container">
            <form className="form-container" onSubmit={this.addAppointment}>
              <h1 className="heading">Add Appointment</h1>
              <label htmlFor="title" className="label-text">
                TITLE
              </label>
              <input
                type="text"
                className="user-input"
                id="title"
                onChange={this.updateTitleInput}
                value={titleInput}
                placeholder="Title"
              />
              <label htmlFor="date" className="label-text">
                DATE
              </label>
              <input
                type="date"
                className="user-input"
                id="date"
                onChange={this.updateDateInput}
                value={dateInput}
              />
              <button className="add-button" type="submit">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              className="image"
              alt="appointments"
            />
          </div>
          <hr />
          <div className="bottom-container">
            <h1 className="appointments-text">Appointments</h1>
            <button
              className="starred-button"
              type="button"
              onClick={this.updateFilterStatus}
            >
              Starred
            </button>
          </div>
          <ul className="list-container">
            {filteredArray.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                toggleStar={this.toggleStar}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
