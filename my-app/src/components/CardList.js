import React, {useState, useEffect} from 'react'
import axios from 'axios';
import '../styling/StudentCard.css';

const CardList = () =>{

    const [items, setItems]= useState([]);
    const [searchInput, setSearchInput]= useState('');
    const [show,setShow]= useState(false);
    const [button,setButton] =useState(false);

    useEffect(()=>{
        axios
        .get("https://api.hatchways.io/assessment/students")
          .then(res=>{
            console.log('itemlistttttttt: ', res.data)
            setItems(res.data.students)
          })
          .catch((err)=>{
              console.log("the error is:", err)
          })
      },[])
    
    return(
        <div>
            <div className='input-flex'>
                <input className='input-search' type="text" placeholder='Search by name' onChange={(e)=> setSearchInput(e.target.value)} />
                <input className='input-search' placeholder='Search for tag'/>
            </div>
      
            {items.filter((val)=>{
                if(searchInput == ""){
                    return val
                } else if(val.firstName.toLowerCase().includes(searchInput.toLowerCase())){
                    return val
                }
                else if(val.lastName.toLowerCase().includes(searchInput.toLowerCase())){
                    return val
                }
                
            }).map((card, key)=>{
                //find the average total grade
                const fullName = card.firstName + ' ' + card.lastName;
    
                const avg = card.grades.reduce((sum, curr)=>sum + Number(curr), 0) / card.grades.length;
                return(
                    <div  className='flexbox-div' key={key}>

                        <div className='student-photo-div'>
                            <img className='students-img-size'  src={card.pic} alt ="student-photo"/>
                        </div>

                        <div className='card-basic-info' key={card.key}>
                            <div className='div-div'>
                                <h1 className='full-capitalize'>{fullName}</h1>
                                <p>Email: {card.email}</p>
                                <p>Company: {card.company}</p>
                                <p>Skills: {card.skill}</p>
                                <p>Average: {avg} </p>
                                {show?
                                <div>
                                    <p>Test 1: {card.grades[0]}%</p>
                                    <p>Test 2: {card.grades[1]}%</p>
                                    <p>Test 3: {card.grades[2]}%</p>
                                    <p>Test 4: {card.grades[3]}%</p>
                                    <p>Test 5: {card.grades[4]}%</p>
                                    <p>Test 6: {card.grades[5]}%</p>
                                    <p>Test 7: {card.grades[6]}%</p>
                                    <p>Test 8: {card.grades[7]}%</p>
                                </div>:null
                                    }   
                            </div>
                            {!show ?
                            <div className='button-info'>
                               <button className='hide-button' onClick={()=> setShow((prev)=>!prev)}>show</button>
                            </div> : <div className='button-info'>
                                         <button className='hide-button' onClick={()=> setShow((prev)=>!prev)}>hide</button>
                                     </div>
            }
                        </div>
                    </div>
                    
                )
            })}
        </div>
    )
}
export default CardList;