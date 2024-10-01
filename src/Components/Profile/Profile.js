import { useRef, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import "./../../App.css";


let Profile = ({ authUser, ...props }) => {
    const [edit, setEdit] = useState(false);
    let userData = authUser;

    const filePicker = useRef(null);
    const userName = useRef();
    const userSurname = useRef();
    const userPhone = useRef();

    const putProfile = () => {
        setEdit(!edit);
    };
    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const img = new Image();
                img.src = reader.result;
                img.onload = () => {
                    // Создаем canvas для изменения размера изображения
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    // Устанавливаем желаемые размеры
                    const desiredWidth = 400; // Например, 200 пикселей ширины
                    const desiredHeight = 400; // Например, 200 пикселей высоты
                    canvas.width = desiredWidth;
                    canvas.height = desiredHeight;

                    // Рисуем изображение на canvas с новыми размерами
                    ctx.drawImage(img, 0, 0, desiredWidth, desiredHeight);

                    // Преобразуем canvas в Base64
                    const base64Image = canvas.toDataURL('image/jpeg'); 
                    resolve(base64Image);
                };
                img.onerror = error => reject(error);
            };
            reader.onerror = error => reject(error);
        });
    };
    

    const updateNewText = async () => {
        debugger
        const photoFile = filePicker.current.files[0];
        let base64Photo = null;

        if (photoFile) {
            base64Photo = await fileToBase64(photoFile);
        }

        props.updateNewText(
            userName.current.value,
            userSurname.current.value,
            userPhone.current.value,
            base64Photo
        );
    };
    

    const updateUser = async () => {
        const updatedUser = {
            name: userName.current.value || userData.name,  
            surname: userSurname.current.value || userData.surname,
            phone: userPhone.current.value || userData.phone,
            photo: filePicker.current.files[0] 
                ? await fileToBase64(filePicker.current.files[0]) 
                : userData.photo  //
        };
    
        fetch(`http://localhost:8080/users/${userData.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Ошибка HTTP, статус " + response.status);
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem('user', JSON.stringify(data));
            props.updateUser(userData.id, data); 
            putProfile();  
        })
        .catch(error => {
            console.error("Произошла ошибка:", error);
        });
    };
    

    const handlePhotoChange = () => {
        filePicker.current.click();
    };

    return (
        <div className="profile">
            {userData ? (
                <div className="container">
                    <div className="wrapper-profile">
                        <div className="profile-up"></div>
                        {edit ? (
                            <div className="profile-edit">
                                <div className="image-profile">
                                    <button onClick={handlePhotoChange} className="profile-button-photo">
                                        <input
                                            className="hidden"
                                            type="file"
                                            ref={filePicker}
                                            onChange={updateNewText}
                                            accept="image/*"
                                        />
                                        <img
                                            className="camera-icon"
                                            src="https://cdn.icon-icons.com/icons2/788/PNG/512/photo-camera_icon-icons.com_65001.png"
                                            alt="Camera Icon"
                                        />
                                        <img
                                            src={userData.photo ? userData.photo : "https://webstockreview.net/images/neck-clipart-oval-face-11.png"}
                                            alt="Profile"
                                        />
                                    </button>
                                </div>
                                <div className="profile-data-edit">
                                    <input
                                        placeholder={userData.name}
                                        ref={userName}
                                        onChange={updateNewText}
                                    />
                                    <input
                                        placeholder={userData.surname}
                                        ref={userSurname}
                                        onChange={updateNewText}
                                    />
                                    <input
                                        placeholder={userData.phone}
                                        ref={userPhone}
                                        onChange={updateNewText}
                                    />
                                </div>
                                <div className="profile-edit-buttons">
                                    <button className="profile-edit-save" onClick={updateUser}>Сохранить</button>
                                    <button onClick={putProfile} className="profile-edit-close">Отмена</button>
                                </div>
                            </div>
                        ) : (
                            <div className="profile-down">
                                <div className="first-side">
                                    <div className="image-profile">
                                        <img
                                            src={userData.photo ? userData.photo : "https://webstockreview.net/images/neck-clipart-oval-face-11.png"}
                                            alt="Profile"
                                        />
                                    </div>
                                    <div className="name-profile">
                                        <p>{userData.name + ' ' + userData.surname}</p>
                                    </div>
                                    <div className="location-profile">
                                        <div className="location-dev">
                                            <FaLocationDot /> {userData.country ? userData.country : 'не задано'}
                                        </div>
                                    </div>
                                    <div className="number-profile">
                                        {userData.phone}
                                    </div>
                                    <div className="email-profile">
                                        {userData.email}
                                    </div>
                                </div>
                                <div className="button-profile">
                                    <button onClick={putProfile}>Изменить профиль</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
};

export default Profile;
