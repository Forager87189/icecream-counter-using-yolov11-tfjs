import React from "react";
import { useNavigate } from "react-router-dom";
import "/src/style/start.css"

const Start = () => {
        const navigate = useNavigate();
       
        const navigateToMain = () => {
          navigate("/yolov11-tfjs/main");
        };

    return(
    <div>
        <main>
            <div className="container">
                <div className="text-wrap">
                    <h2>어서오세요!<br></br>아래의 시작하기 버튼을 눌러주세요</h2>
                    <div className="btn-wrap">
                        <a id="start-button" className="btn" onClick={navigateToMain}>시작하기</a>
                    </div>
                </div>
            </div>
        </main>
    </div>
    );
}

export default Start;