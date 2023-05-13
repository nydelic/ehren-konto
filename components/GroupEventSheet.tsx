import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { GroupEventShape } from "./GroupEvent";
import GroupEventContainer from "./GroupEventContainer";
import GroupEventListItem from "./GroupEventListItem";
import { Separator } from "./ui/separator";
import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import GroupCreateEventSheet from "./GroupCreateEventSheet";

interface GroupEventSheetProps {
  groupName: string;
  leftoverAmount: number;
  activities: GroupEventShape[];
}

function GroupEventSheet({
  groupName,
  leftoverAmount,
  activities,
}: GroupEventSheetProps) {
  const futureEvents: typeof activities = [];
  const pastEvents: typeof activities = [];
  activities.forEach((activity) => {
    if (activity.from > new Date()) {
      futureEvents.push(activity);
    } else {
      pastEvents.push(activity);
    }
  });

  return (
    <Sheet>
      <GroupEventContainer>
        <SheetTrigger className="text-muted-foreground hover:bg-slate-800 rounded-sm flex absolute w-full h-full top-0 left-0">
          <span className="m-auto">
            {leftoverAmount > 0 ? (
              `+${leftoverAmount}`
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </span>
        </SheetTrigger>
      </GroupEventContainer>
      <SheetContent position="bottom" size={"content"}>
        <div className="mx-auto max-w-md mb-8">
          <SheetHeader>
            <SheetTitle>Group activities</SheetTitle>
            <SheetDescription>
              There are {activities.length} activities in this group
            </SheetDescription>
          </SheetHeader>
        </div>
        <div
          className="overflow-y-auto"
          style={{
            maxHeight: "calc(100vh - 15rem)",
          }}
        >
          <div className="mx-auto max-w-md px-6 sm:px-0">
            <div className="mt-8 grid gap-6">
              {futureEvents.map((activity) => (
                <GroupEventListItem
                  key={activity.activityId}
                  activityId={activity.activityId}
                  name={activity.name}
                  emoji={activity.emoji}
                  color={activity.color}
                  from={activity.from}
                  // members={activity.members}
                />
              ))}
              {!!pastEvents.length && !!futureEvents.length && <Separator />}
              {pastEvents.map((activity) => (
                <GroupEventListItem
                  key={activity.activityId}
                  activityId={activity.activityId}
                  name={activity.name}
                  emoji={activity.emoji}
                  color={activity.color}
                  from={activity.from}
                  // members={activity.members}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-md pt-6">
          <GroupCreateEventSheet groupName={groupName} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default GroupEventSheet;