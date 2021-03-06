import React from 'react';
import { connect } from 'react-redux';
import {
  setCurrentSubject,
  newSubjectList,
  getQuestion,
  stageNewSubject
} from '../actions/index'

export class LanguageSelector extends React.Component {
  componentDidMount() {
    this.props.dispatch(stageNewSubject(this.props.currentSubject.id))
  }
  stageSubject(subjectId) {
    this.props.dispatch(stageNewSubject(subjectId))
  }

  setCurrentSubject() {
    const subjectId = this.props.stagedSubject;
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
    let options;
    if (this.props.loading) {
      options =
        <option>
          'loading'
      </option>

    }
    else {
      options = this.props.availableSubjects.map((subject, index) =>
        <option
          key={index}
          label={subject.subject}
          value={subject.id}>
          {subject.subject}
        </option>);
    }
    return (
      <div>
        <label className='select-label'>Select a subject to learn</label>
        <select className="select-subject"
          name="subjectSelect"
          value={this.props.stagedSubject}
          options={options}
          onChange={e => this.stageSubject(e.target.value)}>{options}
        </select>
        <button className='select-button' type='button' onClick={() => this.setCurrentSubject()}>Switch Subject</button>
      </div>
    )
  }
}



const mapStateToProps = state => ({
  loading: state.main.loading,
  availableSubjects: state.main.availableSubjects,
  currentSubject: state.main.currentSubject,
  currentUser: state.auth.currentUser,
  userSubjects: state.main.userSubjects,
  stagedSubject: state.main.stagedSubject
});

export default connect(mapStateToProps)(LanguageSelector);