import { IPost } from "@/lib/database/models/post.model";
import Link from "next/link";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import { DeletePostConfirmation } from "./DeletePostConfirmation";
import PostCarousel from "./PostCarousel";

type PostCardProps = {
  post: IPost;
  postCollectionType: string;
  currentExpertId?: string;
};

const PostCard = ({ post, postCollectionType, currentExpertId }: PostCardProps) => {
  const createdAt = new Date(post?.createdAt);

  // Format the date as desired
  const formattedDate = createdAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-gray-200 mt-4 rounded w-4/5 p-4 shadow-md">
      <div className="flex">
        <div className="w-2/3">
          <h1 className="font-semibold">{post?.expert?.fullName}</h1>
          <span className="block text-xs uppercase text-blue-400">
            {formattedDate}
          </span>
        </div>
        <div className="w-1/3">
          <span className="float-right text-xs bg-blue-400 rounded px-2 py-1 text-white">
            {post?.expert?.category}
          </span>
        </div>
      </div>
      <div className="py-4 text-sm">
        {post?.description}
      </div>

      {post?.fileUrls.length > 0 && (
            <PostCarousel data={post?.fileUrls} />
          )}

      {postCollectionType === "My_Editable_Post" && (
        <>
          <hr />
          <div className="mt-4">
            <Link href={`/experts/posts/${post._id}/update`}>
              <Button className="flex gap-1 items-center bg-amber-400">
                <Pencil color="white" /> Update
              </Button>
            </Link>
            <DeletePostConfirmation postId={post._id} />
          </div>
        </>
      )}
    </div>
  );
};

export default PostCard;
