import { useEffect, useState } from "react";
import PostCard from "./PostCard";

export default function PostList({ localPosts, openPost }) {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const limit = 5;

  useEffect(() => {
    setLoading(true);
    setError("");

    fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${limit}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching posts");
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching posts:", error);
        setError("Error fetching posts");
        setLoading(false);
      });
  }, [currentPage]);

  const allPosts =
    currentPage === 1 ? [...localPosts, ...posts] : posts;

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <h2>All Posts</h2>

      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && (
        <>
          <div className="post-list">
            {allPosts.map((post) => (
              <PostCard key={post.id} post={post} openPost={openPost} />
            ))}
          </div>

          <div className="pagination">
            <button onClick={handlePrevious} disabled={currentPage === 1}>
              Previous
            </button>

            <span> Page {currentPage} </span>

            <button onClick={handleNext}>Next</button>
          </div>
        </>
      )}
    </div>
  );
}