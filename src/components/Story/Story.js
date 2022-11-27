import {useEffect, useState} from "react";
import timestampConverter from "../../helpers/timestampConverter";
import classes from './Story.module.css';
import hnImage from '../../hn.PNG';

function Story(props) {
    const {title, URL, timestamp, score, authorId} = props;
    const [author, setAuthor] = useState({
        id: '',
        karmaScore: ''
    });

    //Set author name and karma
    const getAuthorDetails = (data) => {
        setAuthor({
            id: data.id,
            karmaScore: data.karma
        })
    };

    //Get author name and karma
    useEffect(() => {
        fetch(`https://hacker-news.firebaseio.com/v0/user/${authorId}.json`)
            .then(res => res.json())
            .then(result => {
                getAuthorDetails(result);
            })
    }, [authorId])

    return (
        <div className={classes.card}>
            <img src={hnImage}/>
            <div className={classes.cardText}>
                <h3>{title}</h3>
                <div className={classes.flexHorizontal}>
                    <div className={classes.storyScore}>Score: {score}</div>
                    <div className={classes.date}>{timestampConverter(timestamp)}</div>
                </div>
                <div className={classes.link}>
                    {URL ? <a href={URL}>{URL}</a> : 'Sorry no link available :('}
                </div>
                <div className={classes.flexHorizontal}>
                    <div className={classes.author}>By: {author.id}</div>
                    <div className={classes.karma}>Karma: {author.karmaScore}</div>
                </div>
            </div>
        </div>
    )
}

export default Story