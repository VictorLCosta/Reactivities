import { Grid } from "semantic-ui-react"
import ActivityList from './ActivityList';
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

import { Activity } from './../../../app/models/activity';

interface Props {
    activities: Activity[],
    selectedActivity: Activity | undefined,
    selectActivity: (id: string) => void,
    cancelSelectActivity: () => void,
    editMode: boolean
    openForm: (id?: string) => void,
    closeForm: () => void
    createOrEdit: (activity: Activity) => void
    delete: (id: string) => void,
    submitting: boolean
}

const ActivityDashboard = ({activities, selectedActivity, 
        selectActivity, cancelSelectActivity, editMode, openForm, closeForm, createOrEdit, delete: deleteActivity, submitting}: Props) => {
    return (
        <Grid>
            <Grid.Column width="10">
                <ActivityList activities={activities} selectActivity={selectActivity} delete={deleteActivity} submitting={submitting}/>
            </Grid.Column>
            <Grid.Column width="6">
                {selectedActivity && !editMode &&
                    <ActivityDetails activity={selectedActivity} cancelSelectActivity={cancelSelectActivity} openForm={openForm} />}
                {editMode && 
                    <ActivityForm closeForm={closeForm} activity={selectedActivity} createOrEdit={createOrEdit} submitting={submitting} />
                }
            </Grid.Column>
        </Grid>
    )
}

export default ActivityDashboard