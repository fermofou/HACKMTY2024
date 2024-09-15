import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { url }from '../../assets/constants/constants'

function GroupHome() {
    const { groupId } = useParams();

    const [eventDetail, setEventDetail] = useState([]);

    useEffect(() => {
        async function fetchEventDetails() {
            try {
                const response = await axios.get(url + `event/${groupId}`);
                setEventDetail(response.data);
            } catch (error) {
                console.log("Error fetching event" + error);
            }
        }

        fetchEventDetails();
    }, []);

    console.log(eventDetail);

    return (
        <>
            <div>
                group home {groupId}
                <ContributionCard/>
            </div>
        </>
    )
}

export default GroupHome;