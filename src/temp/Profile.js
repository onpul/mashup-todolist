import React from 'react';
import { useParams } from 'react-router-dom';

// 프로필에서 사용할 데이터
const profileData = {
    velopert: {
        name: '김민준',
        description:
            'Frontend Engineer @ Laftel Inc. 재밌는 것만 골라서 하는 개발자',
    },
    gildong: {
        name: '최문정',
        description: 'Frontend Engineer / 감자 개발자임 ㅇㅇㅇㅇㅇ',
    },
};

const Profile = ({ animate }) => {
    // 파라미터를 받아올 땐 match 안에 들어있는 params 값을 참조
    const params = useParams();
    const { username } = params;
    const profile = profileData[username];
    console.log(params);
    if (!profile) {
        return <div>존재하지 않는 사용자입니다.</div>;
    }
    return (
        <div>
            <h3>
                {username}({profile.name})
            </h3>
            <p>{profile.description}</p>
        </div>
    );
};

export default Profile;
