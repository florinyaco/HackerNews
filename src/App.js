import './App.css';
import React, {useEffect, useState} from "react";
import StoryList from "./components/StoryList/StoryList";
import './Styles/Style.css'

function App() {

    const [storyIds, setStoryIds] = useState([])

    const handleResult = (res) => {
        const storyIds = res
        const randomizedIds = storyIds.sort(() => 0.5 - Math.random()).slice(0, 10)
        setStoryIds(randomizedIds)
    }

    useEffect(() => {
        fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
            .then(res => res.json())
            .then(result => {
                    handleResult(result);
                })
    }, [])

    return (
        <div className="container">
            <StoryList ids={storyIds}/>
        </div>
    );
}

export default App;
