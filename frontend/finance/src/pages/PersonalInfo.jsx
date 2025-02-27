import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"; // Контекст для работы с пользователем
import "../styles/PersonalInfo.css";

function PersonalInfo() {
    const { user, token } = useAuth(); // Получаем пользователя из контекста
    const [userData, setUserData] = useState(null); // Состояние для данных пользователя
    const [profilePicture, setProfilePicture] = useState(null); // Состояние для фото
    const [error, setError] = useState(""); // Состояние для ошибок

    useEffect(() => {
        if (user) {
            fetch("http://localhost:8000/api/user-info/", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((data) => setUserData(data))
                .catch((error) => setError("Failed to fetch user data"));
        }
    }, [user, token]);

    const handleProfilePictureChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    const handleSubmitPicture = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("profile_picture", profilePicture);

        try {
            const response = await fetch("http://localhost:8000/api/upload-profile-picture/", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                // Успешная загрузка фото
                alert("Profile picture updated!");
            } else {
                setError("Failed to upload profile picture");
            }
        } catch (err) {
            setError("Something went wrong while uploading the picture");
        }
    };

    return (
        <section className="personal-info">
            <div className="personal-info-container">
                <h1>Personal Information</h1>

                {userData ? (
                    <div className="user-details">
                        <p><strong>Name:</strong> {userData.name}</p>
                        <p><strong>Email:</strong> {userData.email}</p>
                    </div>
                ) : (
                    <p>Loading user data...</p>
                )}

                <form onSubmit={handleSubmitPicture}>
                    <div className="form-group">
                        <label htmlFor="profile-picture">Upload Profile Picture</label>
                        <input
                            type="file"
                            id="profile-picture"
                            accept="image/*"
                            onChange={handleProfilePictureChange}
                        />
                    </div>
                    <button type="submit" className="upload-button">
                        Upload Picture
                    </button>
                </form>

                {error && <p className="error-message">{error}</p>}
            </div>
        </section>
    );
}

export default PersonalInfo;