import { Header } from "semantic-ui-react"
import ActivityListItem from "./ActivityListItem";

import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Fragment } from "react";

const ActivityList = () => {
    const { activityStore } = useStore()
    const { groupedActivities } = activityStore

    return (
        <>
            {groupedActivities.map(([group, activities]) => (
                <Fragment key={group}>
                    <Header sub color="teal">
                        {group}
                    </Header>
                    
                    {activities.map((item, i) => (
                        <ActivityListItem key={item.id} activity={item} />
                    ))}
                </Fragment>
            ))}
        </>
    )
}

export default observer(ActivityList)