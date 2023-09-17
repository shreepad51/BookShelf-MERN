import axios from "axios";
import { useState } from "react";
import "./style.css";


const BookSearch=()=>{
    const [search,setSearch]=useState("");
    const [bookData,setData]=useState([]);
    const [one,setImagePath] = useState();
    console.log("Main");
    console.log(one);
    const searchBook=(evt)=>{
        if(evt.key==="Enter")
        {
            axios.get('https://www.googleapis.com/books/v1/volumes?q='+search+'&key=AIzaSyA6SaT23KNiiA6DnUfUQTvFeyAcQEkwnSU'+'&maxResults=5')
            .then(res=>setData(res.data.items))
            .catch(err=>console.log(err))
        }
    }

    return(
        <>
            <div className="header">
                <div className="row1">
                    <h3>Book is our Best Friend</h3>
                </div>
                <div className="row2">
                    <div className="search">
                        <input className="search-container" type="text" placeholder="Search in Google Books..."
                        value={search} onChange={e=>setSearch(e.target.value)}
                        onKeyPress={searchBook}/>
                        <button><i className="fas fa-search"></i></button>
                    </div>
                </div>
            </div>
            <div className="container">
            </div>
            <>
            
        <>
            {
                bookData.map((item) => {
                    let thumbnail=item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
                    let amount=item.saleInfo.listPrice && item.saleInfo.listPrice.amount;
                    if(thumbnail!= undefined && amount !=undefined)
                    {
                        return (
                            <>
                            <div className="card" 
                            onClick={()=>setImagePath(thumbnail)}>
                        
                                <img src={thumbnail} alt="" />
                                <div className="bottom">
                                    <h3 className="title">{item.volumeInfo.title}</h3>
                                    <p className="amount">&#8377;{amount}</p>
                                </div>
                            </div>
                            </>
                        )
                    }
                })
            }
        </>
            </>
        </>
    )
}

export default BookSearch;