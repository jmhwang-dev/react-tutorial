import Card from "./Card";

function ProfileCard(props) {
    return (
        <Card title={props.title} backgroundColor="#4ea04e">
            <p>hi</p>
            <p>{props.content}</p>
        </Card>
    );
}

export default ProfileCard