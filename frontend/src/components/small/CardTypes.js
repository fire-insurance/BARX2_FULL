import React from "react"
import Tilt from 'react-vanilla-tilt'

 function Card({ imgSrc, title, description }) {

    const [isHovering, setIsHovering] = React.useState(false)

    const desc_style = {
        opacity: isHovering ? '1' : '0',
        transition: 'opacity 800ms',
        userSelect: 'none',
    };

    const title_style = {
        borderColor: isHovering ? 'black' : 'transparent',
        transition: '800ms',
        userSelect: 'none',
        fontFamily: "Roboto-Bold",
        borderBottom: '2px solid black',
    }

    const main_style = {  
            cursor: 'pointer',
    }

    React.useEffect(() => {
        if (!isHovering) {
            return;
        }
    }, [isHovering]);

    const hoverUp = () => {
        setIsHovering(true);
    }

    const unhoverUp = () => {
        setIsHovering(false);
    }

    return (
        <Tilt options={{ max:2}} style={main_style} className="main__GoodsTypes__Type" onMouseEnter={hoverUp} onMouseLeave={unhoverUp}>
            <img className="main__GoodsTypes__Type__Img" src={imgSrc} alt=""/>
            <h3 style={title_style} className="main__GoodsTypes__Type__Title">{title}</h3>
            <p style={desc_style} className="main__GoodsTypes__Type__Description">{description}</p>
        </Tilt>
    )
}
export default Card;

