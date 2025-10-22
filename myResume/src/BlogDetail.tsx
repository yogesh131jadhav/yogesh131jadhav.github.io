import { useContext, useEffect, useState } from "react";
import { BlogContext } from "./BlogContext";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

export default function Home() {
    const { path } = useParams();
    const blogs = useContext(BlogContext);
    const [filteredBlog, setFilteredBlog]: any = useState<any>({});
    const [content, setContent] = useState("");
    useEffect(() => {
        setFilteredBlog(blogs?.blogs?.filter((blg: any) => blg.path == path)?.[0]);
    }, [blogs]);
    useEffect(() => {
        if(filteredBlog?.path) {
            fetch("/blogs/"+filteredBlog?.path+".md")
                .then((res) => {
                    if (!res.ok) throw new Error("Markdown not found");
                    return res.text();
                })
                .then((text) => setContent(text))
                .catch((err) => console.error("Error loading markdown:", err));
        }
    }, [filteredBlog]);
    return <>
        <div className="card mt-4">
            <div className="card-body">
                <Link to="/blogs">Back to Blogs</Link>
                <h2 className="card-title">{filteredBlog?.title}</h2>
            </div>
        </div>
        <div className="card mt-2">
            <div className="card-body">
                <div className="blogContentWrapper">
                    <ReactMarkdown
                        children={content}
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight]}
                    />
                </div>
            </div>
        </div>
    </>;
}
