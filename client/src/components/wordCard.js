import React from 'react';
import { connect } from 'react-redux';
import {
	setAnswer,
	evaluateAnswer,
	resetAnswerStatus,
	getQuestion
} from '../actions/index'

export class Card extends React.Component {
	

	componentDidMount() {
		this.props.dispatch(resetAnswerStatus())
	}

	buildAndDispatchEvalObject = (userAnswer) => {
		const wordWithAnswer = Object.assign({}, this.props.word, {
			userAnswer,
			subjectId: this.props.currentSubject.id
		})
		this.props.dispatch(evaluateAnswer(wordWithAnswer))
	}

	handleChange = (value) => {
		this.props.dispatch(setAnswer(value))
	}

	handleClick = (e) => {
		e.preventDefault()
		//TODO change answer to userAnswer
		this.buildAndDispatchEvalObject(this.props.answer)
	}

	handleNext = () => {
		this.props.dispatch(resetAnswerStatus());
		this.props.dispatch(getQuestion(this.props.currentSubject.id));
	}



	render() {
		let feedback;
		if (this.props.correctAnswer) {
			if (this.props.correctAnswer.correct === true) {
				feedback = 'You got it Right!'
			} else if (this.props.correctAnswer.correct === false) {
				feedback = `Wrong! The answer is ${this.props.correctAnswer.nativeLanguage}`
			};
		}
		let submitNextButton;
		if (this.props.correctAnswer) {
			submitNextButton = <button type='button' onClick={() => this.handleNext()}>Get Another!</button>
		}
		else {
			submitNextButton = <button
			className='submit-button'
			type="submit"
		>
			Submit Guess
</button>
		}
		



		return (
			<div className="card">
				<div className='game-container'>
					<h2>{this.props.word.foreignLanguage}</h2>
					<div className="line" style={{ backgroundColor: this.props.bgc }}></div>
					<p className='card-text'></p>
					<form onSubmit={(e) => this.handleClick(e)}>
						<input className='user-input'
							name='text'
							type='text'
							value={this.props.answer}
							// defaultValue=''
							placeholder='answer'
							onChange={e => this.handleChange(e.target.value)}>
						</input>
					{submitNextButton}
					</form>
					<p>{feedback}</p>
				</div>
				<p className='word-score'>Word Score: {this.props.word.mValue}</p>
			</div>

		)
	}
}


const mapStateToProps = state => ({
	answer: state.main.answer,
	streak: state.main.streak,
	feedback: state.main.feedback,
	word: state.main.currentWord,
	correctAnswer: state.main.correctAnswer,
	subjects: state.auth.currentUser.subjects,
	currentSubject: state.main.currentSubject
});

export default connect(mapStateToProps)(Card);