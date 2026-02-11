import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";


const ExpandToggle = ({ isExpanded, setIsExpanded}) => {
    return(
        <div className="flex justify-center flex-1">
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2"
          >
            {isExpanded ? (
              <>
                Show Less <ChevronUp size={16} />
              </>
            ) : (
              <>
                View All <ChevronDown size={16} />
              </>
            )}
          </Button>
        </div>
    )
}

export default ExpandToggle;