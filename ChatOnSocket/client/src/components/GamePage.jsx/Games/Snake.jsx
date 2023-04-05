import React from 'react'
import { Context, SnakeGame } from "react-game-snake";

function Snake() {
    console.log(Context.game);
    return (
        <div style={{fontSize: '100px'}}>
             В разработке
            {/* <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                
            </div>
            <div style={{position: 'absolute', top: '50px', right: '30px'}}>
                В разработке
            </div> */}
        </div>
    )
}

export default Snake