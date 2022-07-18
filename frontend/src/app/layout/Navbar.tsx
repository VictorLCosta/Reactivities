import { observer } from "mobx-react-lite"
import { Button, Container, Menu, Image, Dropdown } from "semantic-ui-react"
import { Link, NavLink } from "react-router-dom"

import logo from '../../../public/assets/logo.png'
import { useStore } from "../stores/store"

const Navbar = () => {
    const {userStore: {currentUser, logout}} = useStore()

    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item as={NavLink} to="/" exact header>
                    <img src={logo} alt="logo" style={{marginRight: '10px'}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item as={NavLink} to="/activities" name="Activities"/>
                <Menu.Item as={NavLink} to="/errors" name="Errors"/>
                <Menu.Item header>
                    <Button as={NavLink} to="/createActivity" positive content="Create Activity"/>
                </Menu.Item>
                <Menu.Item position="right">
                    <Image src={currentUser?.image || '/assets/user.png'} avatar spaced="right" />
                    <Dropdown pointing="top left" text={currentUser?.displayName} inline>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/profile/${currentUser?.username}`} text="My Profile" icon="user"/>
                            <Dropdown.Item onClick={logout} text="Logout" icon="power"/>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    )
}

export default observer(Navbar)