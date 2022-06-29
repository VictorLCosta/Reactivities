import { Header, Item, Segment } from "semantic-ui-react"
import ActivityListItem from "./ActivityListItem";
import { Fragment } from "react";

import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

const ActivityList = () => {
    const {activityStore} = useStore()
    const {groupedActivities} = activityStore

    return (
        <>
            {groupedActivities.map(([group, activities]) => (
                <Fragment key={group}>
                    <Header sub color="teal">
                        {group}
                    </Header>
                    <Segment>
                        <Item.Group divided>
                            {activities.map((item, i) => (
                                <ActivityListItem key={i} activity={item}/>
                            ))}
                        </Item.Group>
                    </Segment>
                </Fragment>
            ))}
        </>
    )
}

export default observer(ActivityList)