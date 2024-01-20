import "./Home.css";
import ghibli_logo from "../../assets/ghibli.png";

function Home() {
  return (
    <div className="home_container">
      <div className="wrapper">
        <div className="wrapper_logo">
          <section>
            <blockquote>
              "The creation of a single world comes from a huge number of
              fragments and chaos" - Hayao Miyazaki
            </blockquote>
          </section>
          <img className="logo" src={ghibli_logo} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Home;
