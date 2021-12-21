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
        borderBottom: isHovering ? '2px solid black' : '2px solid transparent',
        transition: '800ms',
        userSelect: 'none',
        fontFamily: "Roboto-Bold",
    }

    const main_style = {
        cursor: 'pointer',
        display: "flex",
        flexDirection: "column",
        borderRadius: "2em",
        boxShadow: "0px 0px 20px rgb(216, 216, 216)",
        alignItems: "center",
        width: "100%",
        gap: "10px",
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
        <Tilt options={{ max: 2 }} style={main_style} className="main__GoodsTypes__Link__Type" onMouseEnter={hoverUp} onMouseLeave={unhoverUp}>
            <img className="main__GoodsTypes__Link__Type__Img" src={imgSrc} alt="" />
            <h3 style={title_style} className="main__GoodsTypes__Link__Type__Title">{title}</h3>
            <p style={desc_style} className="main__GoodsTypes__Link__Type__Description">{description}</p>
        </Tilt>
    )
}
export default Card;

