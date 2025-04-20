
import { User, Plus } from 'lucide-react';

interface StoryCardProps {
  name?: string;
  image: string;
  isCreate?: boolean;
}

const StoryCard = ({ name, image, isCreate = false }: StoryCardProps) => {
  return (
    <div className="relative min-w-[110px] h-[200px] rounded-lg overflow-hidden shadow group cursor-pointer">
      {/* Story background */}
      <div className="absolute inset-0">
        <img 
          src={image} 
          alt={name || 'Create story'} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-20 transition-all"></div>
      </div>

      {/* Create story overlay */}
      {isCreate ? (
        <>
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-2 inset-x-0 text-white text-center text-sm font-medium px-2">
            Create story
          </div>
          <div className="absolute top-4 inset-x-0 flex justify-center">
            <div className="w-10 h-10 rounded-full bg-neplink-blue flex items-center justify-center border-4 border-white">
              <Plus className="h-5 w-5 text-white" />
            </div>
          </div>
        </>
      ) : (
        <>
          {/* User story overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-2 inset-x-0 text-white text-center text-sm font-medium px-2">
            {name}
          </div>
          <div className="absolute top-4 left-4">
            <div className="w-9 h-9 rounded-full border-4 border-neplink-blue overflow-hidden">
              <img 
                src={image} 
                alt={name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StoryCard;
