import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { registerUser } from '../actions/users';
import { login } from '../actions/auth';
import Input from './input';
import { connect } from 'react-redux'
import { required, nonEmpty, matches, length, isTrimmed } from '../validators';
import { getAvailableSubjects } from '../actions';
const passwordLength = length({ min: 10, max: 72 });
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {

  componentDidMount() {
    this.props.dispatch(getAvailableSubjects())
  }


  onSubmit(values) {

    const { username, password, fullname, subjectId } = values;
    const user = { username, password, fullname, subjectId };
    return this.props
      .dispatch(registerUser(user))
      .then(() => this.props.dispatch(login(username, password)));
  }

  render() {
    let options;
    if (this.props.loading) {
      options =
        <option>
          loading
      </option>
    }
    if (this.props.availableSubjects.length) {
      options = this.props.availableSubjects.map((subject, index) =>
        <option
          key={index}
          label={subject.subject}
          value={subject.id}>
          {subject.subject}
        </option>);
      options.unshift(<option
      >
        pick one
        </option>)
     
    }
    return (
      <form
        className="login-form"
        onSubmit={this.props.handleSubmit(values =>
          this.onSubmit(values)
        )}>
        <label htmlFor="fullname">Full Name</label>
        <Field component={Input} type="text" name="fullname" />
        <label htmlFor="username">Username</label>
        <Field
          component={Input}
          type="text"
          name="username"
          validate={[required, nonEmpty, isTrimmed]}
        />
        <label htmlFor="password">Password</label>
        <Field
          component={Input}
          type="password"
          name="password"
          validate={[required, passwordLength, isTrimmed]}
        />
        <label htmlFor="passwordConfirm">Confirm password</label>
        <Field
          component={Input}
          type="password"
          name="passwordConfirm"
          validate={[required, nonEmpty, matchesPassword]}
        />

        <label className='select-label'>Select your first subject</label>
        <Field
          component={Input}
          element='select'
          className="select-subject"
          name="subjectId"
          type='select'
          value={options}
          options={options}
          validate={[required]}
        >{options}</Field>
        < button
          type="submit"
          disabled={this.props.pristine || this.props.submitting} >
          Register
                </button >
      </form >
    )
  };
};

const mapStateToProps = state => ({
  loading: state.main.loading,
  availableSubjects: state.main.availableSubjects
});


export default connect(mapStateToProps)(reduxForm({
  form: 'registration',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm));
