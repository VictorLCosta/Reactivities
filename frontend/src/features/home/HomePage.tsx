import { Link } from "react-router-dom"
import { Container, Header, Segment, Image, Button, Divider } from "semantic-ui-react"
import { useStore } from "../../app/stores/store"
import LoginForm from "../users/LoginForm"
import RegisterForm from "../users/RegisterForm"

const HomePage = () => {
    const {userStore, modalStore} = useStore()

    return (
        <Segment inverted textAlign="center" vertical className="masthead">
            <Container text>
                <Header as="h1" inverted>
                    <Image size="massive" href='/assets/logo.png' alt="logo" style={{marginBottom: 12}}/>
                    Reactivities
                </Header>
                
                {userStore.isLoggedIn ? (
                    <>
                        <Header as="h2" inverted content="Welcome to Reactivities"/>
                        <Button as={Link} to="/activities" content="Go to Activities!" size="huge" inverted/>
                    </>
                ) : (
                    <>
                        <Button onClick={() => modalStore.openModal(<LoginForm/>)} content="Login" size="huge" inverted/>
                        <Button onClick={() => modalStore.openModal(<RegisterForm/>)} content="Register" size="huge" inverted/>
                        <Divider horizontal inverted>Or</Divider>
                        <Button
                            size="huge"
                            inverted
                            color="facebook" 
                            content="Login with Facebook"
                            onClick={userStore.facebookLogin}
                        />
                    </>
                )}
            </Container>
        </Segment>
    )
}

export default HomePage