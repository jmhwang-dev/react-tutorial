import Comment from "./Comment";

const comments = [
    {
        name: "jm",
        comment: "hi"
    },
    {
        name:"jm2",
        comment:"hello"
    }
]

function CommentList(props) {
    return (
        <div>
            {comments.map((comment) => {
                return (
                    <Comment name={comment.name} comment={comment.comment} />
                );
            })}
        </div>
    );
}
export default CommentList;