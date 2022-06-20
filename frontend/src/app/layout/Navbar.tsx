import { Button, Container, Menu } from "semantic-ui-react"

const Navbar = (props: any) => {
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item name="Activities"/>
                <Menu.Item header>
                    <Button onClick={() => props.openForm()} positive content="Create Activity"/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}

export default Navbar