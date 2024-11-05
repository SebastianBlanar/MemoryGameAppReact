import { useState } from "react";
import { Card } from "./Card";

export function CardList() {
    const animalArray = [
        {name : 'seal', image : '/assets/seal.jpg'},
        {name : 'shark', image : '/assets/shark.jfif'},
        {name : 'snake', image : '/assets/snake.jpg'},
        {name : 'squirrel', image : '/assets/squirrel.webp'},
        {name : 'tiger', image : '/assets/tiger.jpg'},
        {name : 'wolf', image : '/assets/wolf.webp'},
        {name : 'fox', image : '/assets/fox.webp'},
        {name : 'seal', image : '/assets/seal.jpg'},
        {name : 'shark', image : '/assets/shark.jfif'},
        {name : 'snake', image : '/assets/snake.jpg'},
        {name : 'squirrel', image : '/assets/squirrel.webp'},
        {name : 'tiger', image : '/assets/tiger.jpg'},
        {name : 'wolf', image : '/assets/wolf.webp'},
        {name : 'racoon', image : '/assets/racoon.jpg'},
        {name : 'racoon', image : '/assets/racoon.jpg'},
        {name : 'meerkat', image : '/assets/meerkat.jpeg'},
        {name : 'meerkat', image : '/assets/meerkat.jpeg'},
    ];

    const STATUS = {
        hidden: "hidden",
        shown: "shown",
        revealed: "revealed"
    };

    const [cardGrid, setCardGrid] = useState(
        animalArray.map((animal) => ({
            name: animal.name,
            status: STATUS.hidden
        }))
    );

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
            } else {
                newGrid.forEach((card, i) => {
                    if (card.status === STATUS.shown) newGrid[i] = { ...card, status: STATUS.hidden };
                });
            }
            setCardGrid(newGrid);
        }
    };

    return (
        <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-10 mt-10">
                {cardGrid.map((animal, index) => (
                    <Card
                        animal={{ ...animal, image: animalArray[index].image }}
                        cardStatus={animal.status}
                        key={index}
                        index={index}
                        updateGrid={() => updateGrid(animal, index)}
                    />
                ))}
            </div>
        </section>
    );
}
