import { useRouter } from 'next/router';
export default function Blog() {
  const router = useRouter();
  return <div>Blog with id - {router.query.id}</div>;
}
