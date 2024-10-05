import { posts } from '@/app/lib/placeholder-data';
import Post from '@/app/ui/components/posts/post';

export default function Page() {
  return (
    <>
      <h1>Previous Searches</h1>
      {posts.map((post) => <Post key={post.id} {...post} />)}
    </>)
}