import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { BaseLayout, HeaderLayout, MenuLayout, HeaderLabel, ToggleLayout, ToggleItem, ContentLayout } from './components';
import Hamburger from '../../common/Hamburger';
import ShadowCard from '../../common/ShadowCard';
import AppIcon from '../../common/AppIcon';

import axios from 'axios';
import { DOMAIN } from '../../../util/domain';

function SearchChargerHome(props) {
    const [chargerList, setChargerList] = useState([0]);

    const successGet = (position) => {
        // 주변의 공유 충전소 리스트 요청
        // axios.get('./tempData/chargerList.json')
        axios.get(`${DOMAIN}/current/${position.coords.latitude}/${position.coords.longitude}`)
        .then(res => {
            setChargerList(res.data.chargers_near);
        })
        .catch(err => {
            setChargerList([1]);
        });
    };
    const failGet = () => {
        setChargerList([1]);
    };

    useEffect(() => {
        // 현재 위치 찾기
        if (navigator.geolocation)
            navigator.geolocation.getCurrentPosition(successGet, failGet);
        else
            setChargerList([1]);
    }, []);

    return (
        <BaseLayout>
            <HeaderLayout>
                <MenuLayout>
                    <AppIcon width="40px" height="40px"/>
                    <Hamburger/>
                </MenuLayout>
                <HeaderLabel>주변의 공유 충전소</HeaderLabel>
                <ToggleLayout>
                    <ToggleItem selected>리스트</ToggleItem>
                    <ToggleItem><Link style={{textDecoration: "none", color: "inherit"}} to="/map">지도</Link></ToggleItem>
                </ToggleLayout>
            </HeaderLayout>
            <ContentLayout>
                {chargerList.map((data) => {
                    if (data === 0)
                        return <div style={{textAlign: 'center'}}>불러오는 중...</div>
                    else if (data === 1)
                        return <div style={{textAlign: 'center'}}>오류 : 주변의 공유 충전소를 불러올 수 없습니다!</div>
                    else
                        return (
                            <Link
                                key={data.charger_key}
                                style={{textDecoration: "none", color: "inherit"}} 
                                to={{
                                    pathname: "/detail",
                                    state: data
                                }}>
                                <ShadowCard
                                    chargerImage={data.image_src}
                                    chargerTitle={`${data.region_1depth_name} ${data.region_2depth_name} ${data.region_3depth_name}`}
                                    chargerDescription={`${data.distance_from.toFixed(1)}km | 시간 당 ${data.price_per_hour}원 | ${data.available[0]}시 ~ ${data.available[data.available.length-1] + 1}시`}
                                    chargerUserLabel={data.owner_name}/>
                            </Link>
                        )
                })}
            </ContentLayout>
        </BaseLayout>
    );
}

export default SearchChargerHome;