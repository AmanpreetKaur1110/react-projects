const  ItemCard = ({item}) => {

    const {id,itemName}= item;
    
    return(
    <div className="" key={id}>
   
         <li>{itemName}</li>
         
    </div> );
 };
export default ItemCard;