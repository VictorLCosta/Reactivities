import { Header } from "semantic-ui-react"
import ActivityListItem from "./ActivityListItem";
import { Fragment } from "react";

import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

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
                        <ActivityListItem key={i} activity={item} />
                    ))}
                </Fragment>
            ))}
        </>
    )
}

export default observer(ActivityList)