import React from "react";
import styled from "styled-components";

const Card = (props) => {
  return (
    <StyledWrapper>
      <div className="book">
        <p>
          {props.output}
        </p>
        <div className="cover">
          <p>Analysis Result</p>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Anton+SC&display=swap');
  .book {
    position: relative;
    border-radius: 10px;
    left: 40%;
    top: 30px;
    width: 250px;
    height: 150px;
    
    background-color: white;
    -webkit-box-shadow: 1px 1px 1px lightgrey;
    box-shadow: 1px 2px lightgrey;
    -webkit-transform: preserve-3d;
    -ms-transform: preserve-3d;
    transform: preserve-3d;
    -webkit-perspective: 2000px;
    perspective: 2000px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    color: #000;
  }

  .cover {
    top: 0;
    position: absolute;
    background-color: white;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    cursor: pointer;
    
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
    -webkit-transform-origin: 0;
    -ms-transform-origin: 0;
    transform-origin: 0;
    -webkit-box-shadow: 1px 0px 1px lightgrey;
    box-shadow: 0px 1px 3px lightgrey;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  }

  .book:hover .cover {
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
    -webkit-transform: rotatey(-87deg);
    -ms-transform: rotatey(-87deg);
    transform: rotatey(-87deg);
  }

  p {
    font-size: 20px;
    color:#2D336B;
    font-family:"Anton";
    text-align:center;
    // font-weight: bolder;
  }
`;

export default Card;
