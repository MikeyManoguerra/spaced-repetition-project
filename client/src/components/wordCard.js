import React from 'react';
import { connect } from 'react-redux';
import { setAnswer, evaluateAnswer, resetAnswerStatus, nextQuestion, handleStreakCorrect, handleStreakIncorrext, getQuestion } from '../actions/index'

export class Card extends React.Component {
	buildAndDispatchEvalObject = (userAnswer) => {
		const wordWithAnswer = Object.assign({}, this.props.word, {
			userAnswer,
		})
		this.props.dispatch(evaluateAnswer(wordWithAnswer))
	}

	handleChange = (e) => {
		this.props.dispatch(setAnswer(e.target.value))
	}

	handleClick = () => {
		this.buildAndDispatchEvalObject(this.props.answer)
		// this.evaluateAnswer(this.props.answer) === true ? this.props.dispatch(evaluateAnswer('true')) :
		// 	this.props.dispatch(evaluateAnswer('false'));
		// this.evaluateAnswer(this.props.answer) === true ? this.props.word.mValue *= 2 : this.props.word.mValue = 1;
		// this.evaluateAnswer(this.props.answer) === true ? this.props.dispatch(handleStreakCorrect()) : this.props.dispatch(handleStreakIncorrext())
	}

	handleNext = () => {
		this.props.dispatch(resetAnswerStatus());
		this.props.dispatch(nextQuestion(this.props.word.germanWord, JSON.parse(this.props.correct)));
	}

	componentWillMount() {
		this.props.dispatch(getQuestion())
	}

	componentDidMount() {
		this.props.dispatch(resetAnswerStatus())
	}

	render() {
		let feedback;
		if (this.props.correct === 'true') {
			feedback = 'You got it Right!'
		} else if (this.props.correct === 'false') {
			feedback = `Wrong! The answer is ${this.props.englishWord}`
		};
		let next;
		if (this.props.correct) {
			next = <button onClick={() => this.handleNext()}>Get Another!</button>
		}
		return (
			<div className="card">

				<h2>{this.props.word.germanWord}</h2>
				<div className="line" style={{ backgroundColor: this.props.bgc }}></div>
				<p className='card-text'></p>
				<input className='user-input'
					name='text'
					type='text'
					placeholder='answer'
					onChange={this.handleChange}>
				</input>
				<button
					className='submit-button'
					onClick={() => this.handleClick()}>
					Submit Guess
				</button>
				{next}
				<p>{feedback}</p>
				<p>Word Score: {this.props.word.mValue}</p>
			</div>
		)
	}
}


const mapStateToProps = state => ({
	answer: state.main.answer,
	streak: state.main.streak,
	feedback: state.main.feedback,
	englishWord: state.main.correct.englishWord,
	word: state.main.currentWord,
	correct: state.main.correct.correct
});

export default connect(mapStateToProps)(Card);