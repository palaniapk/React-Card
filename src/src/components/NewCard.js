import useInput from "../../hooks/useInput";
import useHttp from "../../hooks/useHttp";
import Section from "../../UI/Section";
import classes from './NewCard.module.css';
const isValid = (value) =>  { 
   if ( value.trim() === '' ) {
    return {isVal: false, errorMessage: ' The Name should not be empty' }
   }
   return {isVal: true, errorMessage: '' }
}

const cardValidator = (value) => {
    if ( value.trim() === '' ) {
        return {isVal: false, errorMessage: ' The Card should not be empty' }
    }
   let nCheck = 0, bEven = false;
	value = value.replace(/\D/g, "");

	for (var n = value.length - 1; n >= 0; n--) {
		var cDigit = value.charAt(n),
			  nDigit = parseInt(cDigit, 10);

		if (bEven && (nDigit *= 2) > 9) nDigit -= 9;

		nCheck += nDigit;
		bEven = !bEven;
	}
     if ((nCheck !== 0) && (nCheck % 10) === 0)  {
     return {isVal: true, errorMessage: '' } }
     else { return {isVal: false , errorMessage: 'Invalid Credit card!'  } }
}

const limitValidator = (value) => { 
    if (value.trim() === '') {
        return {isVal: false, errorMessage: ' The Limit should not be empty' }
  } 
    if (/[^0-9-\s]+/.test(value)) {
       
    console.log("Testing")
     return {isVal: false, errorMessage: ' It should be number only' }
 }
 
  return {isVal: true, errorMessage: '' }
}

const NewCard = (props) => {
    const { value: enteredName, isValid: entervalueValid,hasError: nameInputHasError, errorMessage: nameErrorMessage, valueChangeHandler:nameChangeHandler, valueBlurHandler: nameBlurHandler, reset: resetName } = useInput(isValid) 
    const { value: enteredCardNo,isValid: enterCardValid,hasError: cardHasError,errorMessage: cardErrorMessage,valueChangeHandler:cardChangeHandler, valueBlurHandler: cardBlurHandler, reset: resetCard } = useInput(cardValidator) 
    const { value: enteredLimit, isValid: enteredlimitValid, hasError: limitInputHasError,errorMessage: limitErrorMessage,valueChangeHandler: limitChangeHandler, valueBlurHandler: limitBlurHandler, reset: resetLimit}  = useInput(limitValidator)
   
    let formIsValid = false;

    if (!entervalueValid && !enterCardValid && !enteredlimitValid) {
        formIsValid = true;
      }
      const formatObj = (data) => {
        props.onAddCard(data);
    }
 
     const {sendRequest: sendCardRequest} = useHttp();
      const formSubmissionHandler = (event) => {
        event.preventDefault();
        if (entervalueValid && enterCardValid && enteredlimitValid) {
          return; // Doesn't submit the form to API request under error
        }
        sendCardRequest({url: process.env.REACT_APP_API_URL +'/card',
                        method: 'POST',
                        body: {id : Math.random(),name: enteredName, card: enteredCardNo, limit: enteredLimit , balance: 0},
                        headers: { 'Content-Type': 'application/json'}
                        }, formatObj)
        resetName();
        resetCard(); // Clear the Input after it submitted
        resetLimit();
        
      };

    return (
        <Section> 
        <form className={classes.form} onSubmit = {formSubmissionHandler}>
        <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && ( 
          <p className={classes.errorMessage}> {nameErrorMessage} </p>
        )}
      </div>
      <div>
      <label htmlFor="card">Card Number </label>
      <input type="number" name="card" id="card" onChange={cardChangeHandler} onBlur= {cardBlurHandler} value={enteredCardNo} />
      {cardHasError && (
          <p className={classes.errorMessage}>{cardErrorMessage}</p>
        )}
      </div>

      <div>
        <label htmlFor="Limit">Limit</label>
        <input
          type="text"
          id="limit"
          name= "limit"
          onChange={limitChangeHandler}
          onBlur={limitBlurHandler}
          value={enteredLimit}
        />
        {limitInputHasError && (
          <p className={classes.errorMessage}>{limitErrorMessage}</p>
        )}
      </div>

      <div className="form-actions">
        <button disabled={!formIsValid}>Add Card</button>
      </div>
        </form>
    </Section>
    )
}
export default NewCard;