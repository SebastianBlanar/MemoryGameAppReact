export function Card({ animal , cardStatus , updateGrid , index }){
    const handleClick = () => {
        updateGrid(animal,index)
        
    } 
    const placeHolderImage = "https://www.shutterstock.com/image-vector/no-photo-thumbnail-graphic-element-600nw-2311073121.jpg"
    return(
        <div 
            className={`flex flex-col justify-between transition-all duration-200 hover:-translate-y-2 border border-gray-800`}
            onClick={handleClick}
            >
            <img src={cardStatus != "hidden" ? animal.image : placeHolderImage } className={`h-full w-full object-cover`} alt="" />
        </div>
    )
}