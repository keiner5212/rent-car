import './About.css'

function About() {
    return (<>
        <section>
            <div>
                <h1 className="section-title">Creators</h1>
            </div>
        </section>
        <section className="image-container">
            <div className='div-image-container'>
                <img className="section-image" src="https://avatars.githubusercontent.com/u/122523028?s=400&u=addcdda9709ca3ec0d62f85b31c9e11211d2420b&v=4" alt="" />
                <p className="NameCreators">
                    Keiner Alvarado
                </p>
                <p className='descriptionCreators'>
                <br /> Keiner Alvarado is a talented student of systems engineering at the University of Magdalena. 
                <br />In addition to his academic background, he excels as a mobile and web developer with experience
                <br />in various technologies. Currently, Keiner works as a programmer, applying his technical skills
                <br />and passion for innovation in developing technological solutions.
                </p>
                <section className='SocialMedia-Creators'>
                    <a href="https://github.com/keiner5212" target='_blank'><img src="/src/pages/about/iconos/github.png" alt=""/></a>
                    <a href="https://www.facebook.com/profile.php?id=100088796413906" target='_blank'> <img src="/src/pages/about/iconos/facebook.png" alt=""/></a>
                    <a href="https://www.linkedin.com/in/keiner-alvarado-96245a232/" target='_blank'><img src="/src/pages/about/iconos/linkedin.png" alt=""  /></a>
                </section>
            </div>
            <div div className='div-image-container'>
                <img className="section-image" src="/src/pages/about/iconos/Foto.jpeg" alt="" />
                <p className="NameCreators">
                    Carlos Romero
                </p>
                <p className='descriptionCreators'>
                <br />Carlos Romero is a dedicated student of systems engineering at the University of 
                <br />Magdalena, with a great passion for the world of web development, software, and 
                <br />the technological and audiovisual field.
                </p>
                <section className='SocialMedia-Creators'>
                    <a href="https://github.com/Carlos-RomeroRo" target='_blank'><img src="/src/pages/about/iconos/github.png" alt=""/></a>
                    <a href="https://www.facebook.com/carlosalberto.romerorocha?mibextid=ZbWKwL" target='_blank'> <img src="/src/pages/about/iconos/facebook.png" alt=""/></a>
                    <a href="https://www.linkedin.com/in/carlos-romero-626b08287/" target='_blank'><img src="/src/pages/about/iconos/linkedin.png" alt=""  /></a>
                </section>
            </div>
        </section>
    </>);
}

export default About;