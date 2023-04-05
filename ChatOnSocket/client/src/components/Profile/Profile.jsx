import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CssProfile from './Profile.module.css'
import { getImg } from '../../Stuff/img/imgexport';
import { useStore } from '../../store/store';


function Profile() {
    const user = useStore((state) => state.users)
    const OwnUser = useStore((state) => state.OwnUser)
    const delOwnUser = useStore((state) => state.delOwnUser)
    const addAboutMe = useStore((state) => state.addAboutMe)
    const About = useStore((state) => state.About)
    const navigate = useNavigate()


    let b;

    const [text, setText] = useState('')

    user.forEach((arg) => {
        if (arg.log === OwnUser.log) {
            b = arg
        }
    })

    function FindMeAbout() {
        About.forEach((arg) => {
            if (arg.user === OwnUser.log) {
                return arg.text
            }
        })
        return ''
    }

    function handleExitAcc() {
        delOwnUser()
        navigate('/Home')
    }

    function handleAbout(e) {
        setText(e.target.value)
    }
    function handleSendAboutMe() {
        addAboutMe(b.log, text)
        setText('')
    }

    var sectionStyle = {
        backgroundImage: `url(${getImg("/bg1.jpg")})`
    };

    return (
        <div style={sectionStyle} className={CssProfile.wrap}>
            <div className={CssProfile.content}>
                <div className={CssProfile.name}>
                    <img onClick={() => {}} className={CssProfile.img} alt='foto' src={getImg(b.img)} width='100' height={100} />
                    {b.log}
                </div>
                <div className={CssProfile.info}>
                    <div>NickName: {b.log}</div>
                    <div>URLNane: {b.Name}</div>
                    <div>
                        <div>О себе</div>
                        {(FindMeAbout() !== '')
                            ?
                            <div>
                                {FindMeAbout()}
                            </div>
                            :
                            <div>
                                <input type="text" value={text} onChange={handleAbout} />
                                <button onClick={handleSendAboutMe} placeholder=' Нажми'>Нажми</button>
                            </div>
                        }
                    </div>
                </div>
                <div className={CssProfile.idei}>
                    Создать страничку для изменения Имени, о себе фотографию, а так идё тхорошо, конечно
                    Я мог это сделат за два дея а не за 5, ну что поделать, это мой первый большой проект, и
                    я часто отвлекаюсь на всякую ненужную ерунду, а мне ещё предстоит навести красоту, подключить бэкэнд, да ещё всякого добавить.
                    Нажеюсь сделать за месяц, добавлю всякого. Нужно создать глобальные посты. И в профиле свои посты и их редактирование. Честно не знаю зачем нужен профиль, ну там будут храниться очивки
                </div>
                <button onClick={handleExitAcc}>Выйти из аккаунта</button>
            </div>
        </div>
    )
}

export default Profile