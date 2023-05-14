import { EventColor, getEventGradient } from "@/lib/utilities/event-colors";
import ActivityContainer from "./ActivityContainer";

export type ActivityShape = {
  activityId: number;
  emoji: string;
  color: EventColor;
  name: string;
  from: Date;
  participants: { userId: number; confirmed: boolean }[];
};

interface ActivityProps extends ActivityShape {}

function Activity({ color, emoji }: ActivityProps) {
  const gradient = getEventGradient(color);
  return (
    <div className="w-full">
      <ActivityContainer
        className="flex"
        style={{
          background: gradient,
        }}
      >
        <span className="m-auto">{emoji}</span>
      </ActivityContainer>
      {/* <p className="text-xs text-muted-foreground text-center">in 9 days</p> */}
    </div>
  );
}

export default Activity;