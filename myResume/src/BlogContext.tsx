import { createContext, useEffect, useState, type ReactNode } from "react";

export const BlogContext = createContext<any>(null);

export function BlogProvider({children}:{children: ReactNode}) {
    const [blogs, setBlogs] = useState([]);
    const [tags, setTags] = useState<any[]>([]);
    const [err, setErr] = useState<any>(null);
    const [loader, setLoader] = useState<boolean>(false);
    useEffect(() => {
        setLoader(true);
        fetch('/blogs.json')
            .then(res => res.json())
            .then((data: any) => {
                setLoader(false);
                console.log(data);
                setBlogs(data?.blogs);
                const tags = [...new Set(data?.blogs?.map((blg: any) => blg.tags))];
                setTags(tags);
            })
            .catch((err: any) => {
                console.log(err);
                setErr(err);
                setLoader(false);
            });
    }, []);
    return <BlogContext.Provider value={{blogs, tags, err, loader}}>{children}</BlogContext.Provider>;
}
