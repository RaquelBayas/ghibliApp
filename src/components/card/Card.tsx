import { useEffect, useState } from "react";
import "./card.css";

interface CardProps {
  title: string;
  image: string;
  gifPath?: string;
}

function Card({ title, image, gifPath }: CardProps) {
  const [isMouseOver, setIsMouseOver] = useState(false);

  useEffect(()=> {
    console.log('gifpath:',gifPath);
  },[gifPath])
  return (
    <div
      className="card"
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      <h1>{title}</h1>
      <img
        src={isMouseOver ? gifPath : image}
        alt={title}
      />
    </div>
  );
}

export default Card;
