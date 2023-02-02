import NewCard from "./NewCard";
import CardListing from "./CardListing";
import React from "react";
import { useState , useEffect } from "react";
import useHttp from "../../hooks/useHttp";
const Cards = () => {
    const [cardlist, setCardList] = useState([]);
    const {Error, sendRequest: fetchTask} = useHttp()
    useEffect(() => {
        const formatObj = (transobj) => {
            const cards = [];
            for (const key in transobj ) {
                cards.push({name: transobj[key].name, id: transobj[key].id, card: transobj[key].card, limit: transobj[key].limit})
            }
            setCardList(cards);
        }
        fetchTask({url: process.env.REACT_APP_API_URL},formatObj);
    }, [fetchTask] )
    const cardAddHandler = (card) => {
        setCardList((prevCardlist) => prevCardlist.concat(card)); //Add the new card details into UI table after submit
    };
        return (
            <React.Fragment> <NewCard onAddCard = {cardAddHandler}/>
            <CardListing cardlist= {cardlist} Error={Error}/>
            </React.Fragment>
        )

    }
    export default Cards;