'use client'
import Image from "next/image";
import { IFeed, IStory } from "./types";
import "./styles.scss";
import { useEffect, useState } from "react";

const Story = ({ story }: IFeed) => {
  const [title, setTitle] = useState("")
  const [haveMore, setHaveMore] = useState<boolean>(false);

  useEffect(() => {
    let title = "";
    if (story?.title?.length >= 15) {
      title = story.title.substring(0, 15) + "..."
      setHaveMore(true)
    } else {
      title = story?.title;
    }
    setTitle(title);
  }, []);

  const showMore = () => {
    setTitle(story.title)
    setHaveMore(false);
  }
    return (
        <div className="flex story">
          <Image src={"https://upload.wikimedia.org/wikipedia/commons/1/1b/Square_200x200.png"} alt="Author profile pic is missing" width={200} height={200} />
          <div className="info">
            <div>{title} {haveMore && <span onClick={showMore}>more</span>}</div>
            <div>{story?.id}</div>
            <div>{story?.price}</div>
          </div>
        </div>
      );
};

export default Story;
