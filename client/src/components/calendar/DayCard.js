import { Card, Container, List } from "semantic-ui-react"
import * as dateFns from "date-fns";

export default function DayCard({day,items}) {

    return(
        <Card bo>
            <Card.Content>
                <Card.Header>{dateFns.format(day, "iii, d MMMM")}</Card.Header>
            </Card.Content>
            <Card.Content extra>
            <List verticalAlign='middle' style={{fontSize:"15px", color:"black"}}>
                {
                items.length > 0 ?
                items.map(item => 
                    <List.Item key={item.id}>
                        <List.Icon name='check' size="small"
                        style={{"color": "#1a8fff","paddingTop":"3px","margin-right":"3px"}}/>
                        {item.body}
                    </List.Item>)
                : <Container>No tasks for this day yet</Container>
                }
            </List>
            </Card.Content>
        </Card>
    ) 
}