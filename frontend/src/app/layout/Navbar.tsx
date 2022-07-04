import { observer } from "mobx-react-lite"
import { Button, Container, Menu } from "semantic-ui-react"
import { NavLink } from "react-router-dom"

import logo from '../../../public/assets/logo.png'

const Navbar = () => {
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
            </Container>
        </Menu>
    )
}

export default observer(Navbar)