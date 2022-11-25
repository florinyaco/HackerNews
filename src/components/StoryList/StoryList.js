import {useEffect, useState} from "react";
import Story from "../story/Story";

function StoryList(props) {
    const {ids} = props;
    const [storiesArray, setStoriesArray] = useState([]);

    useEffect(() => {
        const promises = [];
        for (let i = 0; i < ids.length; i++) {
            promises.push(fetch(`https://hacker-news.firebaseio.com/v0/item/${ids[i]}.json`))
        };
        Promise.all(promises)
            .then(responses => {
                return Promise.all(responses.map(r => r.json())).then(stories => {
                    stories.sort((a, b) => a.score - b.score);
                    setStoriesArray(stories)
                })
            })
            .catch((e) => {
                console.log(e)
            })
    }, [ids]);

    return (
        <div>
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