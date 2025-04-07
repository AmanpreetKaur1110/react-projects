import ItemCard from "./ItemList";
// import'./card-list.style.css';

const CardItems = ({ items }) => (
    <div className="item-container">
        {

            items.map((item => {
                return (
                    < ItemCard item={item} />
                );
            }))
        }
    </div >
);


export default CardItems;
