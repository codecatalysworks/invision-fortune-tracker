
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface Comment {
  id: string;
  text: string;
  author: {
    name: string;
    avatar?: string;
    initials: string;
  };
  timestamp: string;
}

interface CommentSectionProps {
  comments: Comment[];
  onAddComment?: (text: string) => void;
  className?: string;
}

export function CommentSection({ comments, onAddComment, className }: CommentSectionProps) {
  const [commentText, setCommentText] = useState("");
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (commentText.trim() && onAddComment) {
      onAddComment(commentText);
      setCommentText("");
    }
  };

  // Format comment date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader>
        <CardTitle>Comments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Comment form */}
        <form onSubmit={handleSubmit} className="space-y-2">
          <Textarea
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="min-h-24"
          />
          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={!commentText.trim()}
            >
              Post Comment
            </Button>
          </div>
        </form>
        
        {/* Comment list */}
        {comments.length === 0 ? (
          <div className="py-4 text-center text-muted-foreground">
            No comments yet
          </div>
        ) : (
          <div className="space-y-4 pt-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <Avatar>
                  <AvatarImage src={comment.author.avatar} />
                  <AvatarFallback>{comment.author.initials}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{comment.author.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(comment.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
