import React from 'react'
import {Redirect} from 'react-router-dom';
import NavbarMenu from '../../components/NavbarMenu'

export default function AdminLogout() {
    localStorage.clear()
    return(
        <>
                    <NavbarMenu />
        <Redirect to="/" />
        </>
    )
}
