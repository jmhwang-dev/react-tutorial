function Comment(props) {
    return (
        <div>
            <span>{props.name} </span>
            <span>{props.comment}</span>
        </div>
    );
}
export default Comment;