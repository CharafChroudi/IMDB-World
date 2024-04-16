import { LoggedInUserContext } from "../../contexts/LoggedInUserContext";
import { useContext } from "react";
import { styled } from "styled-components";

const GoogleSignIn = () => {
  const { LoggedInUser, setIsUserLoggedIn } = useContext(LoggedInUserContext);
  const navigate = (url) => {
    window.location.href = url;
  };

  const signIn = async () => {
    const response = await fetch("http://localhost:3000/request/googleSignIn", {
      method: "post",
    });
    const data = await response.json();
    navigate(data.url);
  };
  return (
    <>
      {!LoggedInUser.loggedIn && (
        <StyledButton
          onClick={() => {
            signIn();
          }}
        >
          Sign In
        </StyledButton>
      )}
    </>
  );
};

const StyledButton = styled.button`
  color: white;
  margin: 0 20px;
  text-decoration: none;
  background-color: transparent;
  background-image: none;
  border: none;
  font-weight: bold;
  font-family: Ar;
  font-size: 1.3rem;
  &:hover {
    color: #ffff00;
    cursor: pointer;
  }
`;

export default GoogleSignIn;
