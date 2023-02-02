import Section from "../../UI/Section";
import classes from "./CardListing.module.css";
const CardListing = (props) =>{

    let cardList = <h2>No cards found. Start adding some!</h2>;
    if (props.Error){
      cardList =  <h2>{props.Error}</h2>;
    }
    if (props.cardlist.length > 0) {
        cardList = (
            <table className={classes.table}>
            <tr>
                <th>Name</th>
                <th>Card Number </th>
                <th>Balance</th>
                <th>Limit</th>
            </tr>
            {(props.cardlist).map((t) =>(<tr><td>{t.name}</td> <td> {t.card} </td><td>£{t.balance}</td> <td>£{t.limit}</td></tr>))}
            </table>
        
      );
    }
  
    let content = cardList;
  
    // if (props.error) {
    //   content = <button onClick={props.onFetch}>Try again</button>;
    // }
  
    // if (props.loading) {
    //   content = 'Loading tasks...';
    // }
  
    return (
        <Section>
            {content}
        </Section>
    )
  
}
export default CardListing;

