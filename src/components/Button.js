
import styled from "styled-components"


export const Button = styled.button`
border: 2px solid black;
  background-color: white;
  color: black;
  
  font-size: 16px;
  cursor: pointer;
  border-color: #e7e7e7;
  color: black
  height: 45px;
  width: 100px
  &:hover{
    background-color: #e7e7e7;
  }
`
export default Button

export const SubButton = styled.button`
border: 2px solid black;
  background-color: white;
  color: black;
  
  font-size: 18px;
  cursor: pointer;
  border-color: #e7e7e7;
  color: black
  height: 50px;
  width: 25%
  &:hover{
    background-color: #e7e7e7;
  }
`