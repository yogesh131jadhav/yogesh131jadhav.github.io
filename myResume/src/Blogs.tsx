import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BlogContext } from "./BlogContext";

export default function Blogs() {
    const blogs = useContext(BlogContext);
    const [filteredBlogs, setFilteredBlogs] = useState<any>(null);

    useEffect(() => {
        setFilteredBlogs(blogs);
    }, [blogs]);

    function filteredBlogsFn(tag: string) {
        console.log(tag);
        // setFilteredBlogs(blogs?.blogs?.filter);
    }

    return <>
        <div className="row">
            <div className="col-md-9">
                <h2 className="mt-3">Blogs</h2>
                <div className="blogsContainer">
                    {filteredBlogs?.blogs?.length && 
                        <>
                            {filteredBlogs?.blogs?.map((blg: any, index: number) => (
                                <div key={index} className="card mt-4">
                                    <div className="card-body">
                                        <h5 className="card-title">{blg?.title}</h5>
                                        {blg?.shortDesc && <p className="card-text">{blg?.shortDesc}</p>}
                                        <Link to={'/blogdetail/' + blg?.path}>Read more</Link>
                                    </div>
                                </div>
                            ))}
                        </>
                    }
                </div>
            </div>
            <div className="col-md-3 border-start position-relative tags">
                <h2 className="mt-3">Tags</h2>
                <div className="blogsContainer">
                    {filteredBlogs?.tags?.length && 
                        <ul className="mt-3 list-group">
                            {filteredBlogs?.tags?.map((tag: any, index: number) => (
                                <li key={index} onClick={() => filteredBlogsFn(tag)} className="list-group-item">{tag}</li>
                            ))}
                        </ul>
                    }
                </div>
            </div>
        </div>
    </>
}