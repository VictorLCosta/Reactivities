import { Item, Segment } from "semantic-ui-react"

import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import ActivityListItem from "./ActivityListItem";

const ActivityList = () => {
    const {activityStore} = useStore()
    const {activitiesByDate} = activityStore

    return (
        <Segment>
            <Item.Group divided>
                {activitiesByDate.map((item, i) => (
                    <ActivityListItem key={i} activity={item}/>
                ))}
            </Item.Group>
        </Segment>
    )
}

export default observer(ActivityList)