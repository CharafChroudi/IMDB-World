import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
	:root {
    --primary-color: #cc5500;
    --accent-color: #F9C700;
		--mostly-transparent: rgba(255,255,255,0.4);
    --max-content-width: 1200px;
		--base-size: 5px;
    --heading-font-family: 'Teko', sans-serif;
		--min-content-height: calc(100vh - 55px - 2.5rem);
		--min-details-content-height: calc(75vh - var(--base-size) - 2.5rem);
  }
	body {
		min-height: 100dvh;
		font-size: 1.5rem;
		background-color: #14181c;
	}
	* {
		margin: 0;
		padding: 0;
		text-align: center;
	}
	h2{
		color : white;
		font-size: 2rem;
		margin: 100px;
	}
	h3 {
		color : white;
		font-size: 1.3rem;
		width: 15vw;
		
	} 

	h3:hover{
		color: #ffff00;
	}
	h4{
		font-size: 2rem;
		margin-bottom: 20px;
	}
	img {
		width: 10vw;
		height: 30vh;
	}
	.movies{
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: flex-start;
		margin: 5vh;
		gap :40px;
	}
	.ratings{
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		margin: 100px;
		gap :40px;
	}

	.login:hover{
		color: red
	}

	span {
		color : white;
		font-size : 1.5rem;
	}

	.search-bar {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.search-bar input[type=text] {
		background-color: gold;
		padding: 10px;
		font-size: 1.4rem;
		border: 1px solid #ccc;
		border-radius: 8px;
		width: 20vw;
		height: 3vh;
}
	.search-bar input[type=text]:focus {
		outline: none;
		border-color: #666;
	}

	#searchButton{
		background-color: gold;
		width: 5vw;
		height: 6vh;
		border-radius: 8px;
		font-size: 1.8rem;
		text-align: center;
		z-index: 9;
	}

	.rating {
 		 font-size: 24px; 
}

	.star {
		cursor: pointer;
		color: #ccc; 
	}

	.star.selected {
		color: gold;
	}
`;

export default GlobalStyles;
