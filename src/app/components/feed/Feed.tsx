"use client"
import { useEffect, useState, useRef } from "react";
import Story from "./Story";
import { IStory } from "./types";

const Feed = () => {
    const [stories, setStories] = useState<IStory[]>([])
    const [total, setTotal] = useState<number>(0)
    const [isBottom, setIsBottom] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const scrollableDivRef = useRef(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async (limit=3, skip=0, loadMore=false, loadAll=false) => {        
        if(stories?.length !== total || !stories?.length) {
            setIsLoading(true)
            const data = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}&select=title,price`).then(res => res.json()).catch(e => {
                console.log(e)
            });
            setIsLoading(false)
            setTotal(data?.total)
            if (loadMore || loadAll) {
                setStories((prevState: IStory[]) => {
                    return [ ...prevState, ...data?.products];
                });
                return;
            }
            setStories(data?.products);
        }
    }

    const loadMore = () => {
        fetchPosts(3, stories?.length, true, false);
    }

    const loadAll = () => {
        fetchPosts(100 - stories?.length, stories?.length, false, true);
    }

    const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = scrollableDivRef.current;
        setIsBottom(scrollHeight <= Math.round(scrollTop + clientHeight));
    };

    useEffect(() => {
        const scrollableDiv = scrollableDivRef.current;
        scrollableDiv?.addEventListener('scroll', handleScroll);
        return () => {
        scrollableDiv?.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    useEffect(() => {
        if (isBottom)
            loadMore();
    }, [isBottom]);

    return (
        <>
        <div ref={scrollableDivRef} className="feed">
            {stories?.map((story: IStory) => (<div>
                <Story story={story}/>
            </div>))}
            {isLoading && <div>loading...</div>}
        </div>
        <div onClick={loadMore}>Load More</div>
        <div onClick={loadAll}>Load All</div>
        </>
    );
}

export default Feed;
