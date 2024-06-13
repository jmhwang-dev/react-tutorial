import styled from "styled-components";
import { useNavigate } from "react-router-dom"
import { Button } from "../ui/Button"
import { PostList} from "../list/PostList"
import { data } from "../../data.json"

const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Container = styled.div`
    width: 100%;
    max-width: 720px;

    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;

function MainPage(props) {
    const {} = props;

    const navigate = useNavigate();

    return (
        <Wrapper>
            <Button title="write post" onClick={()=>{navigate("/post-write");}}  />
            <PostList posts={data} onClickItem={(item) => {navigate(`/post/${item.id}`)}} />
        </Wrapper>
    )
}

export default MainPage;