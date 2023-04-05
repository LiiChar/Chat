import { Link } from 'react-router-dom'
import CssGame from './GamePage.module.css';
import { getImg } from '../../Stuff/img/imgexport';

function GamePages() {
    let isGame = false

    function hadleGames() {
        isGame = !isGame
    }

    return (
        <div style={{backgroundImage: `url(${getImg("/bg1.jpg")})`}} className={CssGame.wrap}>
            <div className={CssGame.games}>

                Выберите игру:
                <Link className={CssGame.link}
                    to={'/Game/Snake'}
                    onClick={hadleGames}>
                    1.Змейка
                </Link>
                <Link className={CssGame.link}
                    to={'/Game/Packman'}
                    onClick={hadleGames}>
                    2.Packman
                </Link>
                <Link className={CssGame.link}
                    to={'/Game/ArgryBird'}
                    onClick={hadleGames}>
                    3.ArgryBird
                </Link>
            </div>
        </div>
    )
}

export default GamePages