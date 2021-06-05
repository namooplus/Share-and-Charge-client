import React from 'react';
import { withRouter } from 'react-router-dom';
import firebase from "firebase/app";

import { BaseLayout, HeaderLayout, CloseIcon, ContentLayout, CustomLink } from './components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function Menu(props) {
    const logout = () => {
        firebase.auth().signOut();
        localStorage.removeItem("username");
        localStorage.removeItem("token");
    }
    return (
        <BaseLayout>
            <HeaderLayout>
                <CloseIcon onClick={props.history.goBack}><FontAwesomeIcon icon={faTimes}/></CloseIcon>
            </HeaderLayout>
            <ContentLayout>
                <CustomLink to="/">주변의 공유 충전소</CustomLink>
                <CustomLink to="/mycharger">나의 공유 충전소</CustomLink>
                <CustomLink to="/mypage">나의 정보</CustomLink>
                <CustomLink onClick={logout} to="/">로그아웃</CustomLink>
            </ContentLayout>
        </BaseLayout>
    );
}

export default withRouter(Menu);