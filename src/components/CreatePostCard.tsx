
import { useContext, useState } from 'react';
import { 
  Video as VideoIcon, 
  Image, 
  Smile, 
  X
} from 'lucide-react';
import { useToast } from "../hooks/use-toast";
import AuthContext from '../contexts/AuthContext';

const CreatePostCard = () => {
  const [showPostModal, setShowPostModal] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { user } = useContext(AuthContext);
  const { toast } = useToast();

  const handleOpenModal = () => {
    setShowPostModal(true);
  };

  const handleCloseModal = () => {
    setShowPostModal(false);
    setPostContent('');
    setSelectedImage(null);
  };

  const handleCreatePost = () => {
    if (!postContent.trim() && !selectedImage) {
      toast({
        variant: "destructive",
        title: "Empty post",
        description: "Please add some text or an image to your post.",
      });
      return;
    }

    // In a real app, this would send the post data to an API
    toast({
      title: "Post created",
      description: "Your post has been shared!",
    });
    handleCloseModal();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // In a real app, this would upload the file to a server and get a URL back
    // For now, we'll use a local URL
    const localUrl = URL.createObjectURL(file);
    setSelectedImage(localUrl);
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center">
          <img 
            src={user?.profileImage || "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"} 
            alt="Profile" 
            className="w-10 h-10 rounded-full mr-2 object-cover"
          />
          <button 
            onClick={handleOpenModal}
            className="flex-1 bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2.5 text-left text-gray-500"
          >
            What's on your mind, {user?.name?.split(' ')[0] || 'User'}?
          </button>
        </div>
        
        <div className="border-t border-gray-200 mt-3 pt-3">
          <div className="flex justify-around">
            <button className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 flex-1">
              <VideoIcon className="h-6 w-6 text-red-500 mr-2" />
              <span className="font-medium text-gray-600">Live video</span>
            </button>
            <button 
              onClick={handleOpenModal}
              className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 flex-1"
            >
              <Image className="h-6 w-6 text-green-500 mr-2" />
              <span className="font-medium text-gray-600">Photo/video</span>
            </button>
            <button className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 flex-1">
              <Smile className="h-6 w-6 text-yellow-500 mr-2" />
              <span className="font-medium text-gray-600">Feeling/activity</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Create Post Modal */}
      {showPostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="p-4 border-b border-gray-200 text-center relative">
              <h3 className="text-xl font-bold">Create post</h3>
              <button 
                onClick={handleCloseModal}
                className="absolute top-3 right-4 rounded-full bg-gray-200 p-2"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-4 flex-1 overflow-y-auto">
              <div className="flex items-center mb-4">
                <img 
                  src={user?.profileImage || "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"} 
                  alt="Profile" 
                  className="w-10 h-10 rounded-full mr-2 object-cover"
                />
                <span className="font-semibold">{user?.name || 'User'}</span>
              </div>
              
              <textarea
                placeholder={`What's on your mind, ${user?.name?.split(' ')[0] || 'User'}?`}
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                className="w-full min-h-[150px] p-2 text-lg placeholder-gray-500 focus:outline-none resize-none"
              />
              
              {selectedImage && (
                <div className="relative mt-2 mb-4">
                  <img 
                    src={selectedImage} 
                    alt="Selected" 
                    className="max-h-[300px] w-full object-contain rounded-lg border border-gray-200"
                  />
                  <button 
                    onClick={removeImage}
                    className="absolute top-2 right-2 rounded-full bg-gray-800 bg-opacity-70 p-1"
                  >
                    <X className="h-4 w-4 text-white" />
                  </button>
                </div>
              )}
              
              <div className="bg-white border border-gray-200 rounded-lg p-3 flex items-center justify-between mt-2">
                <span className="font-semibold">Add to your post</span>
                <div className="flex space-x-2">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Image className="h-6 w-6 text-green-500" />
                    <input 
                      id="file-upload" 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload}
                      className="hidden" 
                    />
                  </label>
                  <VideoIcon className="h-6 w-6 text-red-500 cursor-pointer" />
                  <Smile className="h-6 w-6 text-yellow-500 cursor-pointer" />
                </div>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="p-4">
              <button 
                onClick={handleCreatePost}
                className="w-full bg-neplink-blue text-white font-semibold py-2 rounded-lg hover:bg-neplink-dark disabled:opacity-60"
                disabled={!postContent.trim() && !selectedImage}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePostCard;
