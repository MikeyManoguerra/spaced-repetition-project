import React from 'react';
import { connect } from 'react-redux';
import {
  setCurrentLanguage
} from '../actions/index'

export class LanguageSelector extends React.Component {

  selectALanguage(language){
    this.props.dispatch(setCurrentLanguage(language))
  }


  render() {
    const options = this.props.availableLanguages.map((language, index) =>
      <option
        key={index}
        label={language}
        value={language}>
        {language}
      </option>);

    return (
      <select className="node-select"
        label="Select a Language"
        name="languageSelect"
        value={this.props.currentLanguage}
        options={options}
        onChange={e => this.selectALanguage(e.target.value)}>{options}
      </select>
    )
  }
}


const mapStateToProps = state => ({
  availableLanguages:state.main.availableLanguages,
  currentLanguage:state.main.currentLanguage
});

export default connect(mapStateToProps)(LanguageSelector);