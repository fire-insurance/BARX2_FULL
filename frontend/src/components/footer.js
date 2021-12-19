import React from "react";

import vk from '../Icons/SocialNetworks/vk_White_logo.png'
import inst from '../Icons/SocialNetworks/insta_White_logo.png'
import yt from '../Icons/SocialNetworks/youtube_White_logo.png'
import fb from '../Icons/SocialNetworks/fb_WhiteLogo.png'

function Footer() {
    return (
        <footer className="footer">
            <div className="SocialNetworks">
                <div className="SocialWrapper">
                    <img src={vk} alt="vk link" />
                </div>
                <div className="SocialWrapper">
                    <img src={inst} alt="instagram link" />
                </div>
                <div className="SocialWrapper">
                    <img src={yt} alt="youtube link" />
                </div>
                <div className="SocialWrapper">
                    <img src={fb} alt="facebook link" />
                </div>
            </div>
            <div className="FlexParagraphs">
                <p className="Number">8 (914) 423-26-93</p>
                <p className="Support">Поддержка</p>
                <p className="Entity">Юридическим лицам</p>
            </div>
        </footer>

    );
}

export default Footer;
