import React from 'react';
// import qs from 'qs';
import { useSearchParams } from 'react-router-dom'; // react-router-dom 버전에 따라 적용 방법이 다름, 현재 버전 6

const About = ({ location }) => {
    // const query = qs.parse(location.search, {
    //     ignoreQueryPrefix: true,
    // });
    const [searchParams] = useSearchParams();
    const detail = searchParams.get('detail') === 'true'; // 쿼리의 파싱결과값은 문자열

    return (
        <div>
            <h1>소개</h1>
            <p>이 프로젝트는 리액트 라우터 기초를 실습해보는 예제 프로젝트임</p>
            {detail && <p>추가적인 정보가 어쩌구 저쩌구...</p>}
        </div>
    );
};

export default About;
