import { Icon, Label, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import MyPopup from "./MyPopup";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../redux/postcart/postcart.actions";
import { selectPostCart } from "../redux/postcart/postcart.selectors";

const SaveButton = ({ user, post}) => {
    const [saved, setSaved] = useState(false);
    const dispatch=useDispatch();
    const postcart=useSelector(selectPostCart)
    useEffect(() => {
        if (user && postcart.find(pos=>pos.id===post.id) ) {
            setSaved(true);
        } else {
            setSaved(false);
        }
    }, [user,postcart,post]);

    const SaveButton =user ? (
            saved ?(
           <Button color="pink" onClick={()=> dispatch(addPost(post))}>
               <Icon name="save" />
           </Button>
       ) : (
           <Button color="blue" basic onClick={()=> dispatch(addPost(post))}>
               <Icon name="save" />
           </Button>
       )
   ) : (
       <Button as={Link} to="/login" color="teal" basic>
           <Icon name="save" />
       </Button>
   );
    return (
        <MyPopup content={saved?"Unsave":"Save"}>{SaveButton}</MyPopup>
    );
};

export default SaveButton;