import React from "react";
import ray from "../images/ray.png"

function AboutPage(){
    return(
        <>
        <div className="homeContainer">
        <section className="leftHome"></section>
        <section className="midHome">
            <img src={ray}height={200}width={200} alt={"Raymond Rater"}></img>
            <section className="leftAlign">
                Ray Rater can provide solar usage data for the building at any address in the world. Properties are broken up into sections and defined with a latitude/longitude pairing and assigned an average expected yield over the course of the year. Ray Rater also provides the carbon offset per MWH generated in your area.
                <p>Designed by Ben Martin using React, Google Maps Places API, and Google Maps Solar API.</p>
                </section>
        </section>
        <section className="rightHome"></section>
        </div>
        </>
    )
}

export default AboutPage