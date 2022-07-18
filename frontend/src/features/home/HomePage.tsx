import { Link } from "react-router-dom"
import { Container, Header, Segment, Image, Button } from "semantic-ui-react"

import logo from '../../../public/assets/logo.png'

const HomePage = () => {
    return (
        <Segment inverted textAlign="center" vertical className="masthead">
            <Container text>
                <Header as="h1" inverted>
                    <Image size="massive" href={logo} alt="logo" style={{marginBottom: 12}}/>
                    Reactivities
                </Header>
                <Header as="h2" inverted content="Welcome to Reactivities"/>
                <Button as={Link} to="/login" size="huge" inverted>
                    Login!
                </Button>
            </Container>
        </Segment>
    )
}

export default HomePage