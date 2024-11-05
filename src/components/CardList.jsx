import { useState,useEffect } from "react";
import { Card } from "./Card";

export function CardList() {
    const [animalsArray,setAnimalsArray] = useState([])
    const [reset,setReset] = useState(false)
    const API_KEY = import.meta.env.VITE_API_KEY;
    
    function shuffleArray(array) {
        const shuffledArray = [...array]; 
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray; 
    }
    
    const STATUS = {
        hidden: "hidden",
        shown: "shown",
        revealed: "revealed"
    };

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch(`https://api.unsplash.com/photos/random?count=12&client_id=${API_KEY}&query=animal`);
                const data = await response.json();
                const duplicatedImages = [...data,...data]
                
                const imagesArray = duplicatedImages.map(image => ({
                    name: image.alt_description || "Animal",
                    image: image.urls.full 
                }));
                
                setAnimalsArray(shuffleArray(imagesArray));
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        fetchImages();
    }, [reset]);

    useEffect(()=>{
        if (animalsArray.length == 0) return
        setCardGrid( animalsArray.map((animal) => ({
            name: animal.name,
            status: STATUS.hidden
        }))) 
    },[animalsArray])

    const [cardGrid, setCardGrid] = useState([]);

    const checkMatch = (grid, index) => {
        const shownCard = grid.find((card, i) => card.status === STATUS.shown && i !== index);
        return shownCard && shownCard.name === grid[index].name ? grid.indexOf(shownCard) : null;
    };

    const updateGrid = (animal, index) => {
        if (animal.status === STATUS.revealed) return;
        
        const newGrid = [...cardGrid];
        newGrid[index] = { ...animal, status: STATUS.shown };

        const countShown = newGrid.filter(animal => animal.status === STATUS.shown).length;

        if (countShown === 1) {
            setCardGrid(newGrid);
        } else if (countShown === 2) {
            const matchIndex = checkMatch(newGrid, index);
            if (matchIndex !== null) {
                newGrid[index].status = STATUS.revealed;
                newGrid[matchIndex].status = STATUS.revealed;
                setCardGrid(newGrid);
            } else {
                setCardGrid(newGrid);
                setTimeout(() => {
                    setCardGrid(prevGrid => 
                        prevGrid.map((card) => 
                            card.status === STATUS.shown ? { ...card, status: STATUS.hidden } : card
                        )
                    );
                }, 1000);
            }
            
        }
    };

    const resetGame = () => {
        setReset(!reset)
    }

    return (
        <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-10 mt-10">
                {cardGrid.map((animal, index) => (
                    <Card
                        animal={{ ...animal, image: animalsArray[index].image }}
                        cardStatus={animal.status}
                        key={index}
                        index={index}
                        updateGrid={() => updateGrid(animal, index)}
                    />
                ))}
            </div>
            <div className="flex justify-center items-center">
                <button className="mt-10 text-white text-center" onClick={resetGame}>Reset game</button>
            </div>
        </section>
    );
}
