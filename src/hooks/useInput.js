import { useState } from "react";
const useInput = (ValidateInput) => {

    const [enteredValue, setEnteredValue] = useState("");
    const [isTouched, setisTouched] = useState(false);
    const ValuesIsValid = ValidateInput(enteredValue);
    const hasError =  !ValuesIsValid['isVal']  && isTouched;
    const errorMessage = ValuesIsValid['errorMessage'];
    
    const valueChangeHandler = (event) => {
        setEnteredValue(event.target.value);
    };
      const valueBlurHandler = (event) => {
        setisTouched(true);
      };
    const reset = () => {
        setEnteredValue('');
        setisTouched(false);
    }
    return { value: enteredValue, isValid:!ValuesIsValid['isVal'], hasError,errorMessage, valueChangeHandler, valueBlurHandler, reset }
};

export default useInput;