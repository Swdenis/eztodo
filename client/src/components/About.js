import React from 'react'
import { Container, Header } from 'semantic-ui-react'

export default function About() {
    return(
        <Container text>
        <Header as='h2'>About EzToDo</Header>
        <p>
        This is a to-app that will make your life eazier!
        </p>
        </Container>
    )
}