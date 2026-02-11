import { Star } from "lucide-react";

export const StarRating = ({ rating, maxStars = 5, size = 16, showCount = false, count = 0 }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {/* Full stars */}
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={`full-${i}`}
            size={size}
            className="fill-yellow-400 text-yellow-400"
          />
        ))}
        
        {/* Half star */}
        {hasHalfStar && (
          <div className="relative">
            <Star
              size={size}
              className="text-yellow-400"
            />
            <div className="absolute top-0 left-0 overflow-hidden" style={{ width: '50%' }}>
              <Star
                size={size}
                className="fill-yellow-400 text-yellow-400"
              />
            </div>
          </div>
        )}
        
        {/* Empty stars */}
        {[...Array(emptyStars)].map((_, i) => (
          <Star
            key={`empty-${i}`}
            size={size}
            className="text-gray-300"
          />
        ))}
      </div>
      
      {showCount && (
        <span className="text-sm text-gray-600 ml-1">
          ({count})
        </span>
      )}
    </div>
  );
};