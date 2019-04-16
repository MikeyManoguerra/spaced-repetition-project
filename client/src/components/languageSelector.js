import React from 'react';
import { connect } from 'react-redux';
import {
  setCurrentSubject,
  newSubjectList,
  getQuestion
} from '../actions/index'

export class LanguageSelector extends React.Component {

  constructor(props) {
    super(props)
    this.state = { subjectId: this.props.currentSubject.id }
  }

  stageSubject(subjectId) {

    console.log(subjectId)
    this.setState({ subjectId: subjectId })
  }

  setCurrentSubject() {
    const subjectId = this.state.subjectId;
    // check if user already has a list on this subject
    const subjectOnUser = this.props.userSubjects.find(subject => {
      return subject.id === subjectId;
    })
    if (!subjectOnUser) {
      const availableSubject = this.props.availableSubjects.find(subject => {
        return subject.id === subjectId;
      })
      //create new list for user
      this.props.dispatch(newSubjectList(availableSubject))
    } else {
      // set the current subject
      this.props.dispatch(setCurrentSubject(subjectOnUser))
      this.props.dispatch(getQuestion(subjectId))
    }
  }

  render() {
    const options = this.props.availableSubjects.map((subject, index) =>
      <option
        key={index}
        label={subject.subject}
        value={subject.id}>
        {subject.subject}
      </option>);

    if (this.props.loading) {
      return <p> loading...</p>
    }

    else {
      return (
        <div>

          <label className='select-label'>Select a subject to learn</label>
          <select className="select-subject"
            name="subjectSelect"
            value={this.state.subjectId}
            options={options}
            onChange={e => this.stageSubject(e.target.value)}>{options}
          </select>
          <button className='select-button' onClick={() => this.setCurrentSubject()}>Switch Subject</button>
        </div>
      )
    }
  }
}


const mapStateToProps = state => ({
  loading: state.main.loading,
  availableSubjects: state.main.availableSubjects,
  currentSubject: state.main.currentSubject,
  currentUser: state.auth.currentUser,
  userSubjects: state.main.userSubjects
});

export default connect(mapStateToProps)(LanguageSelector);