import "./Hero.css"
const Hero = () => {
  return (
    <div>
        <div className="bg-img-for-div">
            <div className="rightside">
                <div>
                    <h4>Graduate Hiring</h4>
                    <h3 className="bold-head"> Hire more graduates without visiting more campuses </h3>
                    <p>Scale your university recruitment strategies and identify your organisation's  future leaders with a flexible and fair experience </p>
                  <button>Request a demo</button>
                </div>
            </div>
            <div className="left side">
              <img src="https://webapi.hirevue.com/wp-content/uploads/2024/02/Hero-Campus-Devices_T2O_1x.png" alt="" srcset="" />
            </div>
        </div>
    </div>
  )
}

export default Hero