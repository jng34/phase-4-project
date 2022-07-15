import React, {useState, useEffect} from 'react';
import QuestionCard from './QuestionCard';
import UserCard from './UserCard';


function BattleField({user}) {

    const [inven, setInven] = useState([])
    function fetchItems() {
        fetch('/items')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setInven(data);
            })
    }
    useEffect(() => {
        fetchItems()
    },[]);
    console.log("Inventory:", inven)
    
    const dropItem = Math.floor(Math.random() * user.powers.length)


    const {name, profile_img, total_hp, total_str, powers} = user;
   
    const [uhp, setUhp] = useState(total_hp)

    const monster = "steve";
    const monsterimg = "https://www.smashbros.com/wiiu-3ds/images/character/pikachu/main.png"
    const mstr = 1
    const baseMHp = 3

    const [ mhp, setMhp ] = useState(baseMHp)
    
    const setTimeAtk = () => {
            setTimeout(takeDamage, 10000)
    } 

    const handleAttack = () => {
        const newHp = mhp - total_str
        return (setMhp(newHp))
    }
    const takeDamage = () => {  
        const newHp = uhp - mstr
        return (setUhp(newHp))
    }
    const zeroHp = () => {  
        if (uhp <= 0){
            console.log(user.power[dropItem].id)
        } else if (mhp <= 0){
            console.log("winner", inven[dropItem])

        } else {
            setTimeAtk()
        }
    }

    // const handlePatch = () => {fetch(`/me`, {
    //     method: 'PATCH',
    //     headers: { 
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         "base_hp": user.base_hp + 2,
    //         "base_str": user.base_str + 1
    //     }),
    //     }).then((r) => r.json())
    //     .then((data) => console.log(data))
    //     }

    // const handleDelete = () => {
    //     fetch(`/users/${id}`, {
    //     method: "DELETE"
    //     })
    //     .then(resp => console.log(resp.status))
    
    //     }
zeroHp()

    return (
        <div>
            <div class="container">
                <div class="row">
                    <div class="col">
                    <UserCard name={name} profile_img={profile_img} total_hp={uhp} total_str={total_str} powers={powers}/>
                    </div>
                    <div className="col"><button onClick ={handleAttack}>ATTACK</button></div>
                    <div className="col"><button onClick={takeDamage}>Hurt Me</button></div>
                    <div className="col">
                    Opponent card
                        <UserCard name={monster} profile_img={monsterimg} total_hp={mhp} total_str={mstr} />
                    </div>
                </div>
            </div>
            <div>
                {/* <QuestionCard /> */}
            </div>
        </div>
    )
}

export default BattleField;