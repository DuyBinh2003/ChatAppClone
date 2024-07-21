import { Post } from "~/layoutComponents/components";

export default function Content({ posts, loading, lastPostRef }) {
    return (
        <div>
            {posts &&
                posts.map((post, index) => {
                    if (posts.length === index + 1) {
                        return (
                            <div ref={lastPostRef} key={post.id}>
                                <Post data={post} />
                            </div>
                        );
                    } else return <Post key={post.id} data={post} />;
                })}
            {loading && <h1>Loading...</h1>}
        </div>
    );
}
