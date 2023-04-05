import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../../store/store';
import { getImg } from '../../Stuff/img/imgexport';
import { getTarUser } from '../../utils/utilsStore';
import FirsStr from '../FirsStr.module.css';
import SignCss from './ProfileSign.module.css'

function ProfileSign(props) {

    const users = useStore((state) => state.users)

    const [NavBar, setNavBar] = useState(true)
    let OwnUser = getTarUser(users, props.OwnUser)
  
    function handleNavBar() {
      setNavBar(!NavBar)
    }

    return (
        <div>
        {
            (props.reset.log === '' && props.OwnUser.log === '')
            ?
            <div>
                <div>
                    <Link onClick={handleNavBar} className={(window.location.pathname === '/SignIn') ? FirsStr.focus : FirsStr.link} to={'/SignIn'}>Вход</Link>
                </div>
                <div>
                    <Link onClick={handleNavBar} className={(window.location.pathname === '/RegIn') ? FirsStr.focus : FirsStr.link} to={'/RegIn'}>Регистрация</Link>
                </div>
            </div>
            :
            <div className={SignCss.name} onClick={handleNavBar}>
                <Link  className={(window.location.pathname === '/Profile') ? FirsStr.focus : FirsStr.link} to={'/Profile'}>{props.OwnUser.log || props.reset.log}</Link>
                <img className={SignCss.img} width={30} height={30} src={getImg(OwnUser.img)} alt="Foto" />
            </div>
        }
    </div>
  )
}

export default ProfileSign