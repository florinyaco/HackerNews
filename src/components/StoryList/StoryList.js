import {useEffect, useState} from "react";
import Story from "../Story/Story";
import classes from "./StoryList.module.css"

function StoryList(props) {
    const {ids} = props;
    const [storiesArray, setStoriesArray] = useState([]);

    //Get all stories from array by id
    useEffect(() => {
        const promises = [];
        for (let i = 0; i < ids.length; i++) {
            promises.push(fetch(`https://hacker-news.firebaseio.com/v0/item/${ids[i]}.json`))
        };
        Promise.all(promises)
            .then(responses => {
                return Promise.all(responses.map(r => r.json())).then(stories => {
                    //sort stories asc by score
                    stories.sort((a, b) => a.score - b.score);
                    setStoriesArray(stories)
                })
            })
            .catch((e) => {
                //error handling
                console.log(e)
            })
    }, [ids]);

    return (
        <div className={classes.container}>
            {storiesArray.map(item =>
            <Story
                key={item.id}
                title={item.title}
                URL={item.url}
                timestamp={item.time}
                score={item.score}
                authorId={item.by}
            />)}
        </div>
    )

}

export default StoryList