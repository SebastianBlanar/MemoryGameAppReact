import { useState } from "react";
import { Card } from "./Card";

export function CardList() {
    const animalArray = [
        {name : 'seal', image : 'https://virginia-aquarium.transforms.svdcdn.com/production/Images/Experience/Cards/RUDDER_HARBOR_SEAL-2100x1400-f0e30a62-3c71-4d7e-86f2-a675d4d87418.jpg?w=2073&h=1164&auto=compress%2Cformat&fit=crop&dm=1728059988&s=538a8bc2aa2182fefc09e497f72de65d'},
        {name : 'meerkat', image : 'https://site-547756.mozfiles.com/files/547756/medium/Meerkat.jpg'},
        {name : 'shark', image : 'https://d1jyxxz9imt9yb.cloudfront.net/animal/219/meta_image/regular/AdobeStock_96520936_541522_reduced.jpg'},
        {name : 'snake', image : 'https://cdn.mos.cms.futurecdn.net/7grkegytV4qrcMb9zSQT8V.jpg'},
        {name : 'squirrel', image : 'https://i.abcnewsfe.com/a/c5cc166f-84f5-414d-9c80-e5a00e9661a3/wirestory_e6318ee7e74492465bb6b0fc22f085ad_16x9.jpg?w=1600'},
        {name : 'tiger', image : 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Siberischer_tiger_de_edit02.jpg/1280px-Siberischer_tiger_de_edit02.jpg'},
        {name : 'racoon', image : 'https://images.saymedia-content.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cq_auto:eco%2Cw_1200/MTk3MTk5NTI4Mzk3MzgyOTc1/raccoons8.png'},
        {name : 'wolf', image : 'https://hiddensignificance.com/wp-content/uploads/2024/09/spiritual-meaning-of-wolf-howling-2.webp'},
        {name : 'fox', image : 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8fA%3D%3D'},
        {name : 'seal', image : 'https://virginia-aquarium.transforms.svdcdn.com/production/Images/Experience/Cards/RUDDER_HARBOR_SEAL-2100x1400-f0e30a62-3c71-4d7e-86f2-a675d4d87418.jpg?w=2073&h=1164&auto=compress%2Cformat&fit=crop&dm=1728059988&s=538a8bc2aa2182fefc09e497f72de65d'},
        {name : 'shark', image : 'https://d1jyxxz9imt9yb.cloudfront.net/animal/219/meta_image/regular/AdobeStock_96520936_541522_reduced.jpg'},
        {name : 'snake', image : 'https://cdn.mos.cms.futurecdn.net/7grkegytV4qrcMb9zSQT8V.jpg'},
        {name : 'squirrel', image : 'https://i.abcnewsfe.com/a/c5cc166f-84f5-414d-9c80-e5a00e9661a3/wirestory_e6318ee7e74492465bb6b0fc22f085ad_16x9.jpg?w=1600'},
        {name : 'tiger', image : 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Siberischer_tiger_de_edit02.jpg/1280px-Siberischer_tiger_de_edit02.jpg'},
        {name : 'wolf', image : 'https://hiddensignificance.com/wp-content/uploads/2024/09/spiritual-meaning-of-wolf-howling-2.webp'},
        {name : 'racoon', image : 'https://images.saymedia-content.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cq_auto:eco%2Cw_1200/MTk3MTk5NTI4Mzk3MzgyOTc1/raccoons8.png'},
        {name : 'meerkat', image : 'https://site-547756.mozfiles.com/files/547756/medium/Meerkat.jpg'},
        {name : 'fox', image : 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8fA%3D%3D'},
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
